export type NavigationLink = {
  readonly href: string;
  readonly label: string;
  readonly available: boolean;
};

export type NavigationItem = NavigationLink & {
  readonly children?: readonly NavigationLink[];
};

export const CONTACT_HREF = "/contacto";

export const NAVIGATION: readonly NavigationItem[] = [
  { href: "/", label: "Inicio", available: true },
  { href: "/empieza-aqui", label: "Empieza aquí", available: false },
  {
    href: "/servicios",
    label: "Servicios",
    available: false,
    children: [
      { href: "/servicios/desarrollo-web", label: "Desarrollo web", available: false },
      { href: "/servicios/producto-mvp", label: "Producto y MVP", available: false },
      { href: "/servicios/arquitectura-backend", label: "Arquitectura backend", available: false },
      { href: "/servicios/frontend-profesional", label: "Frontend profesional", available: false },
      { href: "/servicios/automatizacion-ia", label: "Automatización con IA", available: false },
      { href: "/servicios/consultoria-tecnica", label: "Consultoría técnica", available: false },
    ],
  },
  { href: "/casos", label: "Casos", available: false },
  { href: "/sobre-mi", label: "Sobre mí", available: false },
  { href: "/studio", label: "Studio", available: false },
  { href: "/comunidad", label: "Comunidad", available: false },
  { href: "/criterio", label: "Criterio", available: false },
  { href: "/recursos", label: "Recursos", available: false },
  { href: CONTACT_HREF, label: "Contacto", available: false },
];

export const isContactAvailable = NAVIGATION.some((item) => item.href === CONTACT_HREF && item.available);
