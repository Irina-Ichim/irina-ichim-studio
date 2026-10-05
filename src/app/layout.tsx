import type { Metadata, Viewport } from "next";
import { Figtree, Great_Vibes, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Irina Ichim Studio",
    template: "%s · Irina Ichim Studio",
  },
  description: "Irina Ichim Studio: diseño y desarrollo web a medida.",
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
      <body>{children}</body>
    </html>
  );
}
