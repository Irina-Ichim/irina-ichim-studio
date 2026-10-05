import { LOGO_PATHS, LOGO_SEAL, LOGO_VIEW_BOX } from "./logoPaths";
import { SITE } from "@/contenido/site";
import styles from "./Logo.module.css";

type LogoProps = {
  className?: string;
  decorative?: boolean;
  idPrefix?: string;
};

const HIGHLIGHT_STOPS = [
  { offset: 0, token: "--highlight-1" },
  { offset: 0.35, token: "--highlight-2" },
  { offset: 0.6, token: "--highlight-3" },
  { offset: 0.8, token: "--highlight-4" },
  { offset: 1, token: "--highlight-5" },
] as const;

const METAL_GOLD_STOPS = [
  { offset: 0, token: "--metal-gold-1" },
  { offset: 0.28, token: "--metal-gold-2" },
  { offset: 0.5, token: "--metal-gold-3" },
  { offset: 0.72, token: "--metal-gold-4" },
  { offset: 1, token: "--metal-gold-5" },
] as const;

export function Logo({ className, decorative = false, idPrefix = "logo" }: LogoProps) {
  const highlightId = `${idPrefix}-highlight`;
  const goldId = `${idPrefix}-gold`;
  const accessibility = decorative ? { "aria-hidden": true } : { role: "img", "aria-label": SITE.name };

  return (
    <svg viewBox={LOGO_VIEW_BOX} className={`${styles.logo} ${className ?? ""}`} {...accessibility}>
      <defs>
        <linearGradient id={highlightId} x1="0" y1="0" x2="1" y2="0">
          {HIGHLIGHT_STOPS.map(({ offset, token }) => (
            <stop key={token} offset={offset} style={{ stopColor: `var(${token})` }} />
          ))}
        </linearGradient>
        <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
          {METAL_GOLD_STOPS.map(({ offset, token }) => (
            <stop key={token} offset={offset} style={{ stopColor: `var(${token})` }} />
          ))}
        </linearGradient>
      </defs>
      <circle
        className={`${styles.seal} fill-surface`}
        cx={LOGO_SEAL.cx}
        cy={LOGO_SEAL.cy}
        r={LOGO_SEAL.r}
        stroke={`url(#${goldId})`}
        strokeWidth={LOGO_SEAL.strokeWidth}
      />
      <path className={styles.ink} d={LOGO_PATHS.initials} fill={`url(#${highlightId})`} />
      <path className={`${styles.ink} fill-ink`} d={LOGO_PATHS.firstName} />
      <path className={styles.ink} d={LOGO_PATHS.lastName} fill={`url(#${highlightId})`} />
      <path className={`${styles.ink} fill-ink-muted`} d={LOGO_PATHS.studio} />
    </svg>
  );
}
