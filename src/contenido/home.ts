export type ServiceRowKey = "crear" | "mejorar" | "colaborar";

type ServiceRow = {
  readonly key: ServiceRowKey;
  readonly label: string;
  readonly items: readonly string[];
  /** The one item of the row that takes the accent colour when the opening ends. Its place in
      `items` is chosen so the three accents run in a diagonal: first, middle, last. */
  readonly featured: string;
};

export const HOME = {
  metaTitle: "Irina Ichim Studio · Estudio de desarrollo digital en Barcelona",
  metaDescription:
    "Creamos webs, plataformas, CRM, automatizaciones y agentes de IA a medida, mejoramos proyectos en marcha y colaboramos con empresas, agencias y freelancers.",
  eyebrow: "Estudio de desarrollo digital · Barcelona",
  title: { before: "Buenas ideas merecen", highlight: "un buen desarrollo." },
  lead: "Creamos webs, aplicaciones y soluciones digitales a medida. Damos forma a nuevas ideas, mejoramos proyectos que ya están en marcha y colaboramos con empresas, agencias y freelancers que necesitan apoyo técnico.",
  needsQuestion: "¿En qué podemos ayudarte?",
  needs: [
    { row: "crear", label: "Crear una web o aplicación" },
    { row: "mejorar", label: "Mejorar un proyecto existente" },
    { row: "colaborar", label: "Colaboración técnica" },
  ] satisfies readonly { row: ServiceRowKey; label: string }[],
  cta: { label: "Hablemos de tu proyecto", mailSubject: "Mi proyecto" },
  join: { label: "¿Programas y quieres sumarte al estudio? Escríbenos", mailSubject: "Quiero sumarme al estudio" },
  services: {
    title: "Lo que hacemos",
    rows: [
      {
        key: "crear",
        label: "Creamos",
        items: ["webs a medida", "plataformas online", "CRM y paneles de gestión", "automatizaciones a medida", "asistentes y agentes de IA"],
        featured: "webs a medida",
      },
      {
        key: "mejorar",
        label: "Mejoramos",
        items: ["arquitectura y código", "auditorías técnicas", "velocidad", "seguridad y RGPD", "accesibilidad", "SEO y GEO"],
        featured: "auditorías técnicas",
      },
      {
        key: "colaborar",
        label: "Colaboramos",
        items: ["con agencias", "con pymes y empresas", "con startups", "con freelancers", "liderazgo técnico temporal", "en marca blanca"],
        featured: "en marca blanca",
      },
    ] satisfies readonly ServiceRow[],
    discarded: [
      "plantillas",
      "soluciones genéricas",
      "parches rápidos",
      "código sin probar",
      "sin documentación",
      "datos sin proteger",
      "webs que tardan en cargar",
      "copiar otra web",
    ],
    pauseLabel: "Pausar la animación",
  },
} as const;
