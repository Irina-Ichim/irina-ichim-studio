import Link from "next/link";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import { SITE } from "@/contenido/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { RailToggle } from "./RailToggle";
import { TalkLink } from "./TalkLink";
import { classNames } from "@/utilidades/classNames";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

export const MAIN_CONTENT_ID = "contenido";

export function SiteHeader() {
  return (
    <>
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="fixed top-4 left-4 z-50 inline-flex min-h-11 -translate-y-24 items-center rounded-md border-2 border-accent-line bg-surface px-4 text-label shadow-raised-sm focus:translate-y-0"
      >
        {UI_LABELS.skipToContent}
      </a>
      <header>
        <div className={classNames("hidden rail:flex", styles.rail)}>
          <div className={styles.railTop}>
            <Link href="/" aria-label={SITE.homeLinkLabel} className="rounded-md">
              <Logo className={styles.fullLogo} />
              <Logo variant="seal" className={styles.seal} />
            </Link>
            <p aria-hidden className={classNames("text-vertical hidden text-eyebrow text-ink-muted uppercase rail-tall:block", styles.vertical)}>
              {SITE.name}
            </p>
          </div>
          <nav aria-label={UI_LABELS.mainNavigation}>
            <NavLinks variant="rail" />
          </nav>
          <div className={styles.railBottom}>
            <ThemeToggle />
          </div>
        </div>
        <div className={classNames("hidden rail:block", styles.collapse)}>
          <RailToggle />
        </div>
        <div className="hidden justify-end px-10 pt-7 rail:flex">
          <TalkLink />
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-4 rail:hidden">
          <Link href="/" aria-label={SITE.homeLinkLabel} className="inline-block rounded-md">
            <Logo className="w-40 sm:w-52" />
          </Link>
          <div className="flex items-center gap-3">
            <TalkLink compact />
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
