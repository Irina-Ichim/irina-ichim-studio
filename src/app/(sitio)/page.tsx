import type { Metadata } from "next";
import { MAIN_CONTENT_ID } from "@/componentes/estructura/SiteHeader";
import { HOME } from "@/contenido/home";
import { HomeFounder } from "./HomeFounder";
import { HomeHero } from "./HomeHero";
import { HomeReasons } from "./HomeReasons";
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
      <div className="surface-pearl py-[clamp(3.5rem,7vw,6rem)]">
        <HomeReasons />
        <HomeFounder />
      </div>
    </main>
  );
}
