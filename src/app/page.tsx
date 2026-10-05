import { SITE } from "@/contenido/site";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <h1 className="font-display text-display-xl">{SITE.name}</h1>
    </main>
  );
}
