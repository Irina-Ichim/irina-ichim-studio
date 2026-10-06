import type { MetadataRoute } from "next";
import { SITE } from "@/contenido/site";
import { BROWSER_THEME_COLOR } from "@/estilos/temas/browserThemeColor";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    lang: "es",
    start_url: "/",
    display: "browser",
    background_color: BROWSER_THEME_COLOR.dark,
    theme_color: BROWSER_THEME_COLOR.dark,
    icons: [
      { src: "/iconos/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/iconos/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/iconos/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
