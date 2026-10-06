import { useId } from "react";
import { LOGO_PATHS, LOGO_SEAL, LOGO_VIEW_BOX } from "./logoPaths";
import { classNames } from "@/utilidades/classNames";
import styles from "./Logo.module.css";

type LogoProps = {
  variant?: "full" | "seal";
  className?: string;
};

const SEAL_EDGE = LOGO_SEAL.r + LOGO_SEAL.strokeWidth / 2;
const SEAL_VIEW_BOX = `${LOGO_SEAL.cx - SEAL_EDGE} ${LOGO_SEAL.cy - SEAL_EDGE} ${SEAL_EDGE * 2} ${SEAL_EDGE * 2}`;

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

export function Logo({ variant = "full", className }: LogoProps) {
  const id = useId();
  const highlightId = `${id}-highlight`;
  const goldId = `${id}-gold`;

  return (
    <svg viewBox={variant === "seal" ? SEAL_VIEW_BOX : LOGO_VIEW_BOX} className={classNames(styles.logo, className)} aria-hidden>
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
      {variant === "full" && (
        <>
          <path className={`${styles.ink} fill-ink`} d={LOGO_PATHS.firstName} />
          <path className={styles.ink} d={LOGO_PATHS.lastName} fill={`url(#${highlightId})`} />
          <path className={`${styles.ink} fill-ink-muted`} d={LOGO_PATHS.studio} />
        </>
      )}
    </svg>
  );
}
