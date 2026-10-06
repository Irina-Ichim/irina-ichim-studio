import type { NavigationLink } from "./navigation";

export const FOOTER = {
  eyebrow: "Hablemos",
  headline: { before: "¿Tienes ", highlight: "un proyecto", after: "?" },
  sectionsTitle: "El estudio",
  servicesTitle: "Servicios",
  contactTitle: "Contacto",
  legalTitle: "Información legal",
  backToTop: "Volver arriba",
} as const;

export const LEGAL_LINKS: readonly NavigationLink[] = [
  { href: "/aviso-legal", label: "Aviso legal", available: false },
  { href: "/privacidad", label: "Política de privacidad", available: false },
  { href: "/cookies", label: "Política de cookies", available: false },
];
