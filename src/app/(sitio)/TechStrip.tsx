import { OpenAiLogoIcon, PauseIcon, PlayIcon } from "@phosphor-icons/react/ssr";
import { HOME } from "@/contenido/home";
import { classNames } from "@/utilidades/classNames";
import { TECH_LOGO_PATHS } from "./techLogos";
import styles from "./TechStrip.module.css";

const LABEL_ID = "inicio-tecnologias";

function TechLogo({ logo }: { logo: string | undefined }) {
  if (logo === "openai") return <OpenAiLogoIcon weight="fill" aria-hidden className={styles.logo} />;
  const path = logo === undefined ? undefined : TECH_LOGO_PATHS[logo];
  if (path === undefined) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={styles.logo}>
      <path d={path} fill="currentColor" />
    </svg>
  );
}

function StackGroups({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.groups} aria-hidden={hidden || undefined}>
      {HOME.stack.groups.map((group) => (
        <li key={group.area} className={styles.group}>
          <span className={styles.area}>{group.area}</span>
          <ul className={styles.items}>
            {group.items.map((item) => (
              <li key={item.name} className={styles.item}>
                <TechLogo logo={"logo" in item ? item.logo : undefined} />
                {item.name}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/* The track holds the list twice and slides by half its width, so the loop has no seam.
   The copy is hidden from assistive technology: the list is read once. */
export function TechStrip() {
  return (
    <section className={styles.strip} aria-labelledby={LABEL_ID}>
      {/* No visible title, so the band fits on the first screen; screen readers still get it. */}
      <h2 id={LABEL_ID} className="sr-only">
        {HOME.stack.label}
      </h2>
      <div className={styles.inner}>
        <div className={styles.viewport}>
          <div className={styles.track}>
            <StackGroups />
            <StackGroups hidden />
          </div>
        </div>
        <label className={styles.pause}>
          <input type="checkbox" className={styles.pauseInput} />
          <span className="sr-only">{HOME.stack.pauseLabel}</span>
          <PauseIcon weight="duotone" aria-hidden className={classNames("size-5", styles.iconPause)} />
          <PlayIcon weight="duotone" aria-hidden className={classNames("size-5", styles.iconPlay)} />
        </label>
      </div>
    </section>
  );
}
