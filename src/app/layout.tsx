import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Figtree, Great_Vibes, Playfair_Display } from "next/font/google";
import { Logo } from "@/componentes/estructura/Logo";
import { SITE } from "@/contenido/site";
import { BROWSER_THEME_COLOR } from "@/estilos/temas/browserThemeColor";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const SOCIAL_IMAGE = {
  url: "/marca/opengraph.png",
  width: 1200,
  height: 630,
  alt: SITE.socialImageAlt,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [SOCIAL_IMAGE],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BROWSER_THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: BROWSER_THEME_COLOR.dark },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${playfair.variable} ${figtree.variable} ${greatVibes.variable}`}>
      <body>
        <header className="mx-auto max-w-5xl px-4 py-6">
          <Link href="/" aria-label={SITE.homeLinkLabel} className="inline-block rounded-md">
            <Logo className="w-56 sm:w-72" />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
