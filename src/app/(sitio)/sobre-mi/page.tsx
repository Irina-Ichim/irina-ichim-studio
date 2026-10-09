import type { Metadata } from "next";
import { MAIN_CONTENT_ID } from "@/componentes/estructura/SiteHeader";
import { ABOUT_ME } from "@/contenido/aboutMe";
import styles from "./page.module.css";

/* In preparation: linked from the menu and the home page, but hidden from search engines until
   the page has its full content. */
export const metadata: Metadata = {
  title: ABOUT_ME.metaTitle,
  description: ABOUT_ME.metaDescription,
  robots: { index: false, follow: true },
};

export default function AboutMePage() {
  return (
    <main id={MAIN_CONTENT_ID} className={styles.page}>
      <h1 className="font-display text-display-xl">{ABOUT_ME.title}</h1>
      {ABOUT_ME.paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles.lead}>
          {paragraph}
        </p>
      ))}
    </main>
  );
}
