import type { Metadata } from "next";
import { Logo } from "@/componentes/estructura/Logo";
import { ThemeToggle } from "@/componentes/estructura/ThemeToggle";
import { COMING_SOON } from "@/contenido/comingSoon";
import { SITE } from "@/contenido/site";

export const metadata: Metadata = {
  title: COMING_SOON.title,
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <main id="contenido" className="relative grid min-h-dvh place-items-center px-4 py-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="grid max-w-2xl justify-items-center gap-8 text-center">
        <div>
          <Logo className="w-64 sm:w-80" />
          <p className="sr-only">{SITE.name}</p>
        </div>
        <div className="grid gap-3">
          <p className="text-eyebrow text-link uppercase">{COMING_SOON.eyebrow}</p>
          <h1 className="font-display text-display-l text-balance">{COMING_SOON.headline}</h1>
        </div>
        <p className="grid gap-4 text-body-l text-ink-muted">
          {COMING_SOON.invitation}
          <a
            href={`mailto:${SITE.email}`}
            className="control-raised inline-flex min-h-11 items-center justify-self-center rounded-pill px-6 text-label text-ink"
          >
            {SITE.email}
          </a>
        </p>
      </div>
    </main>
  );
}
