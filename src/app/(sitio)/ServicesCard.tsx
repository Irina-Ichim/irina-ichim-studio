import { PauseIcon, PlayIcon } from "@phosphor-icons/react/ssr";
import { Logo } from "@/componentes/estructura/Logo";
import { PageLink } from "@/componentes/estructura/PageLink";
import { HOME } from "@/contenido/home";
import { NAVIGATION, type NavigationLink } from "@/contenido/navigation";
import { classNames } from "@/utilidades/classNames";
import { cssVars } from "@/utilidades/cssVars";
import styles from "./ServicesCard.module.css";

const ms = (value: number) => `${Math.round(value)}ms`;

/* Where each discarded phrase floats (as % of the card area), how near it looks and how it drifts. */
const NOISE_LAYOUT = [
  { x: 4, y: 3, depth: "near", dx: 6, dy: -9, drift: 4600 },
  { x: 40, y: 0, depth: "mid", dx: -5, dy: -8, drift: 5200 },
  { x: 12, y: 30, depth: "far", dx: 7, dy: -6, drift: 5800 },
  { x: 52, y: 24, depth: "near", dx: -8, dy: -10, drift: 4400 },
  { x: 26, y: 50, depth: "mid", dx: 5, dy: -7, drift: 5000 },
  { x: 58, y: 56, depth: "far", dx: -6, dy: -8, drift: 5600 },
  { x: 6, y: 76, depth: "near", dx: 8, dy: -9, drift: 4800 },
  { x: 50, y: 86, depth: "mid", dx: -7, dy: -6, drift: 5400 },
] as const;

/* Order in which the phrases are struck, so it does not read top to bottom. */
const STRIKE_RANK = [1, 3, 5, 0, 7, 2, 4, 6] as const;

const NOISE_IN_STAGGER = 140;
const STRIKE_START = 1500;
const STRIKE_GAP = 360;
const SINK_AFTER_STRIKE = 600;
const NOISE_SINK = 800;
const ROW_GAP = 380;
const ITEM_GAP = 110;
const SURFACE = 1000;
const GLINT = 2200;

const { services } = HOME;

const PAGES: readonly NavigationLink[] = NAVIGATION.flatMap((item) => [item, ...(item.children ?? [])]);

/* A page the menu does not list yet is treated as not available, like any other PageLink. */
const pageFor = (href: string): NavigationLink =>
  PAGES.find((page) => page.href === href) ?? { href, label: services.serviceLinkLabel, available: false };
const lastSink = STRIKE_START + (NOISE_LAYOUT.length - 1) * STRIKE_GAP + SINK_AFTER_STRIKE + NOISE_SINK;
const surfaceStart = lastSink - 1100;
const itemStart = (row: number, item: number) => surfaceStart + row * ROW_GAP + item * ITEM_GAP;
const lastSurfaced = Math.max(...services.rows.map((row, index) => itemStart(index, row.items.length - 1) + SURFACE));
const sealAt = lastSurfaced - 200;
const glintAt = sealAt + 900;

const TIMELINE = cssVars({
  "--card-relief": ms(lastSink - 1500),
  "--seal": ms(sealAt),
  "--seal-relief": ms(sealAt + 500),
  "--glint-at": ms(glintAt),
  "--end": ms(glintAt + GLINT + 100),
});

export function ServicesCard() {
  return (
    <div className={styles.stage} style={TIMELINE}>
      <div className={styles.card}>
        <h2 className={classNames("font-display text-heading text-highlight", styles.reveal)} style={cssVars({ "--delay": ms(surfaceStart - 200) })}>
          {services.title}
        </h2>
        <dl className={styles.rows}>
          {services.rows.map((row, rowIndex) => (
            <div key={row.key} className={styles.row} data-row={row.key}>
              <dt className={styles.rowLabel} style={cssVars({ "--delay": ms(surfaceStart - 110 + rowIndex * 90) })}>
                {row.label}
              </dt>
              <dd className={styles.itemsCell}>
                <ul className={styles.items}>
                  {row.items.map((item, itemIndex) => {
                    const start = itemStart(rowIndex, itemIndex);
                    return (
                      <li key={item} className={classNames(styles.chip, item === row.featured && styles.featured)} style={cssVars({ "--delay": ms(start), "--relief-delay": ms(start + SURFACE * 0.6) })}>
                        {item}
                      </li>
                    );
                  })}
                </ul>
                <span className={styles.serviceSlot} data-service-link>
                  <PageLink
                    link={pageFor(row.serviceHref)}
                    className={styles.serviceLink}
                    availableClassName={styles.serviceAvailable}
                    unavailableClassName={styles.serviceUnavailable}
                  >
                    {services.serviceLinkLabel} →
                  </PageLink>
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <span className={styles.glintWrap} aria-hidden>
          <span className={styles.glint} />
        </span>
        <span className={styles.seal} aria-hidden>
          <Logo variant="seal" className={styles.sealLogo} />
        </span>
      </div>

      {services.discarded.map((phrase, index) => {
        const layout = NOISE_LAYOUT[index];
        const rank = STRIKE_RANK[index];
        if (!layout || rank === undefined) return null;
        const strikeAt = STRIKE_START + rank * STRIKE_GAP;
        return (
          <span
            key={phrase}
            aria-hidden
            className={classNames(styles.noise, styles[layout.depth])}
            style={cssVars({
              "--x": `${layout.x}%`,
              "--y": `${layout.y}%`,
              "--dx": `${layout.dx}px`,
              "--dy": `${layout.dy}px`,
              "--drift": ms(layout.drift),
              "--in": ms(index * NOISE_IN_STAGGER),
              "--strike": ms(strikeAt),
              "--out": ms(strikeAt + SINK_AFTER_STRIKE),
            })}
          >
            <span className={styles.noiseText}>
              {phrase}
              <span className={styles.strike} />
            </span>
          </span>
        );
      })}

      <label className={styles.pause}>
        <input type="checkbox" className={styles.pauseInput} />
        <span className="sr-only">{services.pauseLabel}</span>
        <PauseIcon weight="duotone" aria-hidden className={classNames("size-5", styles.iconPause)} />
        <PlayIcon weight="duotone" aria-hidden className={classNames("size-5", styles.iconPlay)} />
      </label>
    </div>
  );
}
