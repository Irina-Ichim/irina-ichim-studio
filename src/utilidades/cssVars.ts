import type { CSSProperties } from "react";

type CssVariables = Record<`--${string}`, string>;

/* React's style type has no room for custom properties; this keeps them typed without a cast. */
export function cssVars(values: CssVariables): CSSProperties & CssVariables {
  return values;
}
