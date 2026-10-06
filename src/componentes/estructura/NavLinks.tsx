"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent, type Ref } from "react";
import { CaretDownIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
import { IconButton } from "@/componentes/ui/IconButton";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import { NAVIGATION, type NavigationItem, type NavigationLink } from "@/contenido/navigation";
import { classNames } from "@/utilidades/classNames";
import { PageLink } from "./PageLink";
import styles from "./NavLinks.module.css";

type Variant = "rail" | "sheet";

type NavLinksProps = {
  variant: Variant;
  onNavigate?: () => void;
};

export function NavLinks({ variant, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ol className={classNames(styles.list, variant === "rail" ? styles.rail : styles.sheet)}>
      {NAVIGATION.map((item, index) => {
        const number = String(index + 1).padStart(2, "0");
        if (item.children) {
          return (
            <SectionWithPages
              key={item.href}
              item={item}
              pages={item.children}
              number={number}
              variant={variant}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          );
        }
        return (
          <li key={item.href} className={styles.item}>
            <NavEntry link={item} number={number} isCurrent={item.href === pathname} onNavigate={onNavigate} className={styles.topEntry} />
          </li>
        );
      })}
    </ol>
  );
}

type SectionWithPagesProps = {
  item: NavigationItem;
  pages: readonly NavigationLink[];
  number: string;
  variant: Variant;
  pathname: string;
  onNavigate?: () => void;
};

// In the rail the pages open in a side panel: on hover, on keyboard focus or with the caret
// button. Leaving it with the mouse closes it, and so do the X, Escape and a click outside.
// "dismissed" keeps it closed after the X even while the pointer or focus is still inside.
function SectionWithPages({ item, pages, number, variant, pathname, onNavigate }: SectionWithPagesProps) {
  const isRail = variant === "rail";
  const [isOpen, setIsOpen] = useState(!isRail && pages.some((page) => page.href === pathname));
  const [isDismissed, setIsDismissed] = useState(false);
  const panelId = useId();
  const itemRef = useRef<HTMLLIElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isRail || !isOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !itemRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [isRail, isOpen]);

  // Focus goes back to whatever opened the panel and is still visible: the caret in the open
  // rail, the section link in the collapsed one or, while that section has no page yet, the
  // list item itself, so it never stays on the hidden X.
  const dismiss = () => {
    setIsOpen(false);
    setIsDismissed(true);
    const toggle = toggleRef.current;
    const link = linkRef.current;
    if (toggle && getComputedStyle(toggle).display !== "none") toggle.focus();
    else if (link?.hasAttribute("href")) link.focus();
    else itemRef.current?.focus();
  };

  const railHandlers = isRail
    ? {
        onMouseLeave: () => {
          setIsOpen(false);
          setIsDismissed(false);
        },
        onKeyDown: (event: KeyboardEvent<HTMLLIElement>) => {
          if (event.key === "Escape") dismiss();
        },
        onFocus: (event: FocusEvent<HTMLLIElement>) => {
          const panel = document.getElementById(panelId);
          if (panel?.contains(event.target) && !closeRef.current?.contains(event.target)) setIsDismissed(false);
        },
        onBlur: (event: FocusEvent<HTMLLIElement>) => {
          if (!itemRef.current?.contains(event.relatedTarget)) {
            setIsOpen(false);
            setIsDismissed(false);
          }
        },
      }
    : {};

  return (
    <li ref={itemRef} tabIndex={isRail ? -1 : undefined} className={classNames(styles.item, isDismissed && styles.dismissed)} {...railHandlers}>
      <div className={styles.row}>
        <NavEntry ref={linkRef} link={item} number={number} isCurrent={item.href === pathname} onNavigate={onNavigate} className={styles.parentEntry} />
        <IconButton
          ref={toggleRef}
          variant="quiet"
          label={UI_LABELS.pagesOf(item.label)}
          className={classNames("aria-expanded:text-link", styles.toggle)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => {
            setIsOpen((open) => !open);
            setIsDismissed(false);
          }}
        >
          {isRail ? <CaretRightIcon weight="duotone" aria-hidden className="size-5" /> : <CaretDownIcon weight="duotone" aria-hidden className={classNames("size-5", isOpen && "rotate-180")} />}
        </IconButton>
      </div>
      <div id={panelId} className={classNames(styles.panel, isOpen && styles.open)}>
        {isRail && (
          <div className={styles.panelHead}>
            <p aria-hidden className={styles.panelTitle}>
              {item.label}
            </p>
            <IconButton ref={closeRef} variant="quiet" label={UI_LABELS.closePagesOf(item.label)} onClick={dismiss}>
              <XIcon weight="duotone" aria-hidden className="size-5" />
            </IconButton>
          </div>
        )}
        <ul className={styles.pages}>
          {pages.map((page) => (
            <li key={page.href}>
              <NavEntry link={page} isCurrent={page.href === pathname} onNavigate={onNavigate} className={styles.pageEntry} />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

type NavEntryProps = {
  link: NavigationLink;
  number?: string;
  isCurrent: boolean;
  onNavigate?: () => void;
  className?: string;
  ref?: Ref<HTMLAnchorElement>;
};

function NavEntry({ link, number, isCurrent, onNavigate, className, ref }: NavEntryProps) {
  return (
    <PageLink
      ref={ref}
      link={link}
      isCurrent={isCurrent}
      onNavigate={onNavigate}
      className={classNames(styles.entry, className)}
      availableClassName={styles.available}
      unavailableClassName={styles.unavailable}
    >
      {number && (
        <span aria-hidden className={styles.number}>
          {number}
        </span>
      )}
      <span className={styles.label}>{link.label}</span>
    </PageLink>
  );
}
