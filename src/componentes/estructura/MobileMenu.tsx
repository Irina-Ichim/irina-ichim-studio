"use client";

import { useRef } from "react";
import Link from "next/link";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { IconButton } from "@/componentes/ui/IconButton";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import { SITE } from "@/contenido/site";
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
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-surface p-5 text-ink"
      >
        <div className="mx-auto flex max-w-md flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label={SITE.homeLinkLabel} onClick={close} className="inline-block rounded-md">
              <Logo className="w-40" />
            </Link>
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
