import { Fragment } from "react";
import { HOME } from "@/contenido/home";
import { SITE } from "@/contenido/site";
import { classNames } from "@/utilidades/classNames";
import { cssVars } from "@/utilidades/cssVars";
import { ServicesCard } from "./ServicesCard";
import styles from "./HomeHero.module.css";

const TITLE_ID = "inicio-titular";

/* Until /contacto exists, both invitations open an email to the studio. */
const mailTo = (subject: string) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

const TITLE_WORDS = [
  ...HOME.title.before.split(" ").map((word) => ({ word, highlight: false })),
  ...HOME.title.highlight.split(" ").map((word) => ({ word, highlight: true })),
];

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby={TITLE_ID}>
      <div className={styles.grid}>
        <div className={styles.text}>
          <p className="text-eyebrow text-ink-muted uppercase">{HOME.eyebrow}</p>
          <h1 id={TITLE_ID} className={classNames("font-display text-display-xl", styles.title)}>
            {TITLE_WORDS.map(({ word, highlight }, index) => (
              <Fragment key={`${index}-${word}`}>
                <span
                  className={classNames(styles.word, highlight && "text-highlight", highlight && styles.highlightWord)}
                  style={cssVars({ "--i": String(index) })}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p className={styles.lead}>{HOME.lead}</p>

          <fieldset className={styles.needs}>
            <legend className={styles.needsLegend}>{HOME.needsQuestion}</legend>
            <div className={styles.needsList}>
              {HOME.needs.map((need) => (
                <label key={need.row} className={styles.need}>
                  <input type="radio" name="necesidad" value={need.row} className={styles.needInput} />
                  {need.label}
                </label>
              ))}
            </div>
          </fieldset>

          <a href={mailTo(HOME.cta.mailSubject)} className={styles.cta}>
            {HOME.cta.label}
          </a>
          <p className={styles.join}>
            <a href={mailTo(HOME.join.mailSubject)}>{HOME.join.label} →</a>
          </p>
        </div>

        <ServicesCard />
      </div>
    </section>
  );
}
