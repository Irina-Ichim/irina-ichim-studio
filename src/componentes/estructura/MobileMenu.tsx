"use client";

import { useRef } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { IconButton } from "@/componentes/ui/IconButton";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import { HomeLink } from "./HomeLink";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <IconButton ref={openRef} label={UI_LABELS.openMenu} aria-haspopup="dialog" onClick={() => dialogRef.current?.showModal()}>
        <ListIcon weight="duotone" aria-hidden className="size-6" />
      </IconButton>
      <dialog
        ref={dialogRef}
        aria-label={UI_LABELS.menu}
        onClose={() => openRef.current?.focus()}
        className="bg-surface-sheen m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 px-5 pb-8 text-ink"
      >
        <div className="mx-auto flex max-w-md flex-col gap-8">
          <div className="bg-surface-sheen sticky top-0 z-10 flex items-center justify-between gap-4 pt-5 pb-2">
            <HomeLink onClick={close}>
              <Logo className="w-40" />
            </HomeLink>
            <IconButton label={UI_LABELS.closeMenu} onClick={close}>
              <XIcon weight="duotone" aria-hidden className="size-6" />
            </IconButton>
          </div>
          <nav aria-label={UI_LABELS.mainNavigation}>
            <NavLinks variant="sheet" onNavigate={close} />
          </nav>
          <ThemeToggle />
        </div>
      </dialog>
    </>
  );
}
