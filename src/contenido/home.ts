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
  startHere: { label: "¿No sabes por dónde empezar? Empieza aquí", href: "/empieza-aqui" },
  needs: [
    { row: "crear", label: "Crear una web o aplicación" },
    { row: "mejorar", label: "Mejorar un proyecto existente" },
    { row: "colaborar", label: "Colaboración técnica" },
  ] satisfies readonly { row: ServiceRowKey; label: string }[],
  cta: { label: "Hablemos de tu proyecto", mailSubject: "Mi proyecto", note: "La primera consulta es gratuita." },
  services: {
    title: "Lo que hacemos",
    serviceLinkLabel: "Ver el servicio",
    allLabel: "Ver todos los servicios",
    allHref: "/servicios",
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
  /* The offer speaks as the studio (plural); the reasons and the founder speak as Irina. */
  reasons: {
    title: "Por qué trabajar conmigo",
    items: [
      {
        icon: "clarity",
        title: "Sin tecnicismos",
        text: "No necesitas saber de programación para contarme tu idea. Te explicaré las opciones y cada paso del proyecto de forma clara, para que puedas tomar decisiones con confianza.",
      },
      {
        icon: "durable",
        title: "Hecho para durar",
        text: "Me importa tanto cómo se ve un proyecto como lo que hay detrás. Por eso cuido la calidad del código, la seguridad y la accesibilidad desde el principio.",
      },
      {
        icon: "business",
        title: "Pensado para ti",
        text: "Cada proyecto es diferente. Antes de empezar, quiero entender qué necesitas, qué quieres conseguir y encontrar una solución que tenga sentido para ti.",
      },
    ] satisfies readonly { icon: "clarity" | "durable" | "business"; title: string; text: string }[],
  },
  founder: {
    eyebrow: "Quién está detrás",
    title: "Soy Irina Ichim",
    paragraphs: [
      "Soy desarrolladora de software freelance y trabajo con personas, negocios y empresas que necesitan crear algo nuevo, mejorar lo que ya tienen o encontrar apoyo técnico para sus proyectos.",
      "Me gusta implicarme desde el principio, entender bien qué necesita cada cliente y encontrar la mejor manera de hacerlo realidad. Me encargo personalmente del desarrollo y, cuando un proyecto necesita más manos o conocimientos especializados, cuento con profesionales de confianza con los que llevo tiempo trabajando.",
    ],
    photoAlt: "Irina Ichim, con los brazos cruzados, mira a cámara con media sonrisa y gesto seguro.",
    moreLabel: "Conóceme mejor",
    moreHref: "/sobre-mi",
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
