export const ROUTES: readonly string[] = ["/", "/proximamente"];

export const COLOR_SCHEMES = ["light", "dark"] as const;

export function routeSlug(route: string): string {
  return route === "/" ? "inicio" : route.replace(/^\//, "").replace(/\//g, "-");
}
