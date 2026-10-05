// The theme-color meta tag cannot read CSS variables, so these mirror --surface in
// light.css and dark.css. pruebas/theme.spec.ts fails if they drift apart.
export const BROWSER_THEME_COLOR = {
  light: "#ecebe7",
  dark: "#121214",
} as const;
