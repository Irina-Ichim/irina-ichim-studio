import type { Icon } from "@phosphor-icons/react";
import { ChatsCircleIcon, ShieldCheckIcon, TargetIcon } from "@phosphor-icons/react/ssr";
import { HOME } from "@/contenido/home";
import styles from "./HomeReasons.module.css";

const TITLE_ID = "inicio-por-que";

const ICONS: Readonly<Record<(typeof HOME.reasons.items)[number]["icon"], Icon>> = {
  clarity: ChatsCircleIcon,
  durable: ShieldCheckIcon,
  business: TargetIcon,
};

export function HomeReasons() {
  return (
    <section className={styles.section} aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="text-eyebrow text-ink-muted uppercase">
        {HOME.reasons.title}
      </h2>
      <ul className={styles.list}>
        {HOME.reasons.items.map((reason) => {
          const ReasonIcon = ICONS[reason.icon];
          return (
            <li key={reason.title} className={styles.reason}>
              <span className={styles.pill}>
                <ReasonIcon weight="duotone" aria-hidden className="size-6" />
              </span>
              <h3 className="font-display">{reason.title}</h3>
              <p>{reason.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
