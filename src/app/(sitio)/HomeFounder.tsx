import Image from "next/image";
import { PageLink } from "@/componentes/estructura/PageLink";
import { HOME } from "@/contenido/home";
import { NAVIGATION, type NavigationLink } from "@/contenido/navigation";
import styles from "./HomeFounder.module.css";

const TITLE_ID = "inicio-quien";
const { founder } = HOME;

const MORE_LINK: NavigationLink = NAVIGATION.find((item) => item.href === founder.moreHref) ?? {
  href: founder.moreHref,
  label: founder.moreLabel,
  available: false,
};

export function HomeFounder() {
  return (
    <section className={styles.section} aria-labelledby={TITLE_ID}>
      <div className={styles.photo}>
        <Image
          src="/fotos/irina-portrait.jpg"
          width={1500}
          height={2000}
          sizes="(min-width: 56rem) 26rem, 80vw"
          alt={founder.photoAlt}
        />
      </div>
      <div className={styles.text}>
        <p className="text-eyebrow text-ink-muted uppercase">{founder.eyebrow}</p>
        <h2 id={TITLE_ID} className="font-display text-display-l">
          {founder.title}
        </h2>
        <span className={styles.rule} aria-hidden />
        {founder.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.lead}>
            {paragraph}
          </p>
        ))}
        <PageLink link={MORE_LINK} className={styles.more} availableClassName={styles.available} unavailableClassName={styles.unavailable}>
          {founder.moreLabel} →
        </PageLink>
      </div>
    </section>
  );
}
