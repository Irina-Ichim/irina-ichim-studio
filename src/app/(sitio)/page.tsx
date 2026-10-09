import type { Metadata } from "next";
import { MAIN_CONTENT_ID } from "@/componentes/estructura/SiteHeader";
import { HOME } from "@/contenido/home";
import { HomeHero } from "./HomeHero";
import { TechStrip } from "./TechStrip";

export const metadata: Metadata = {
  title: { absolute: HOME.metaTitle },
  description: HOME.metaDescription,
};

export default function Home() {
  return (
    <main id={MAIN_CONTENT_ID}>
      <HomeHero />
      <TechStrip />
    </main>
  );
}
