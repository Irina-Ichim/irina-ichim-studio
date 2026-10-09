export type ServiceRowKey = "crear" | "mejorar" | "colaborar";

/** `logo` names a mark in app/(sitio)/techLogos.ts, or "openai"; without it only the name shows. */
type Tech = { readonly name: string; readonly logo?: string };

type TechGroup = { readonly area: string; readonly items: readonly Tech[] };

type ServiceRow = {
  readonly key: ServiceRowKey;
  readonly label: string;
  readonly items: readonly string[];
  /** The one item of the row that takes the accent colour when the opening ends. Its place in
      `items` is chosen so the three accents run in a diagonal: first, middle, last. */
  readonly featured: string;
  /** Page shown as «Ver el servicio» when the matching need is chosen. */
  readonly serviceHref: string;
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
  cta: { label: "Hablemos de tu proyecto", mailSubject: "Mi proyecto", note: "La primera consulta es gratuita." },
  join: { label: "¿Programas y quieres sumarte al estudio? Escríbenos", mailSubject: "Quiero sumarme al estudio" },
  services: {
    title: "Lo que hacemos",
    serviceLinkLabel: "Ver el servicio",
    rows: [
      {
        key: "crear",
        label: "Creamos",
        items: ["webs a medida", "plataformas online", "CRM y paneles de gestión", "automatizaciones a medida", "asistentes y agentes de IA"],
        featured: "webs a medida",
        serviceHref: "/servicios/desarrollo-web",
      },
      {
        key: "mejorar",
        label: "Mejoramos",
        items: ["arquitectura y código", "auditorías técnicas", "velocidad", "seguridad y RGPD", "accesibilidad", "SEO y GEO"],
        featured: "auditorías técnicas",
        serviceHref: "/servicios",
      },
      {
        key: "colaborar",
        label: "Colaboramos",
        items: ["con agencias", "con pymes y empresas", "con startups", "con freelancers", "liderazgo técnico temporal", "en marca blanca"],
        featured: "en marca blanca",
        serviceHref: "/servicios/consultoria-tecnica",
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
  stack: {
    label: "Con lo que trabajamos, de la idea a producción",
    pauseLabel: "Pausar el movimiento de las tecnologías",
    groups: [
      {
        area: "Backend",
        items: [
          { name: "Java", logo: "java" },
          { name: "Spring Boot", logo: "springboot" },
          { name: "Node.js", logo: "nodejs" },
          { name: "NestJS", logo: "nestjs" },
          { name: "Python", logo: "python" },
        ],
      },
      {
        area: "Frontend",
        items: [
          { name: "Next.js", logo: "nextjs" },
          { name: "React", logo: "react" },
          { name: "TypeScript", logo: "typescript" },
          { name: "JavaScript", logo: "javascript" },
          { name: "Svelte", logo: "svelte" },
          { name: "Tailwind CSS", logo: "tailwindcss" },
        ],
      },
      {
        area: "Datos",
        items: [
          { name: "PostgreSQL", logo: "postgresql" },
          { name: "MySQL", logo: "mysql" },
          { name: "MongoDB", logo: "mongodb" },
          { name: "SQL Server" },
          { name: "Prisma", logo: "prisma" },
          { name: "Redis", logo: "redis" },
        ],
      },
      {
        area: "DevOps y nube",
        items: [
          { name: "Docker", logo: "docker" },
          { name: "Kubernetes", logo: "kubernetes" },
          { name: "Terraform", logo: "terraform" },
          { name: "Azure" },
          { name: "Google Cloud", logo: "googlecloud" },
          { name: "Cloudflare", logo: "cloudflare" },
          { name: "Vercel", logo: "vercel" },
          { name: "Railway", logo: "railway" },
          { name: "DigitalOcean", logo: "digitalocean" },
        ],
      },
      {
        area: "Calidad",
        items: [
          { name: "Vitest", logo: "vitest" },
          { name: "Jest", logo: "jest" },
          { name: "JUnit", logo: "junit" },
          { name: "Playwright" },
        ],
      },
      {
        area: "IA y automatización",
        items: [
          { name: "Claude Code", logo: "claude" },
          { name: "Codex", logo: "openai" },
          { name: "Gemini", logo: "gemini" },
          { name: "n8n", logo: "n8n" },
          { name: "Make", logo: "make" },
          { name: "TensorFlow", logo: "tensorflow" },
        ],
      },
    ] satisfies readonly TechGroup[],
  },
} as const;
