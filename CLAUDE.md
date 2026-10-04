@AGENTS.md

# Irina Ichim Studio

Web del estudio de Irina Ichim: el escaparate donde empresas, profesionales y freelancers
conocen el trabajo del estudio y lo contactan para encargar una web. La propia web es parte
del portfolio, así que el acabado visual y la accesibilidad cuentan tanto como el contenido.

## Fases

| Fase | Alcance | Estado |
| --- | --- | --- |
| 1 | Frontend: páginas públicas, sistema visual, animaciones. Sin backend ni base de datos | En curso |
| 2 | Backend: contacto, PostgreSQL (probablemente con Prisma), integración con un LLM | Sin empezar |

En la fase 1 no se añaden API routes, Server Actions con efectos, base de datos ni variables
de entorno con secretos. Si una tarea lo pide, conviene señalarlo antes y decidir si adelanta
trabajo de la fase 2.

## Stack

- **Next.js 16.3.8** (App Router, `src/`), React 19, TypeScript
- **Tailwind CSS 4**, con los tokens de diseño definidos en `src/app/globals.css`
- npm como gestor de paquetes. Node 20.9 o superior

Next 16 trae cambios respecto a versiones anteriores. Antes de escribir código que dependa de
una API de Next, consultar la guía correspondiente en `node_modules/next/dist/docs/` (ver
`AGENTS.md`).

## Comandos

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción; tiene que pasar antes de cada commit relevante
npm run lint    # ESLint
```

## Dependencias

Cada dependencia nueva se justifica antes de instalarla: qué resuelve, por qué no basta con lo
que ya hay, licencia y estado de mantenimiento. Versión estable siempre, comprobada en npm
(`npm view <paquete> dist-tags`), nunca canary, beta ni rc.

Decisiones tomadas:

- **Sin librerías de neumorfismo ni de componentes visuales.** Los estilos son propios
- **Sin `lucide-react`**
- **Iconos**: `@phosphor-icons/react` (MIT), peso duotone. Cómo se usan, en `src/CLAUDE.md`
- **Animaciones**: se empieza con transiciones CSS. Motion entra cuando aparezca una animación
  de scroll o de layout que CSS no resuelva bien

Sobre `npm audit`: las vulnerabilidades altas que aparecen al instalar vienen de la cadena de
ESLint (solo desarrollo). El «arreglo» que propone `npm audit fix --force` baja
`eslint-config-next` a la 14, así que no se aplica. Lo que importa es
`npm audit --omit=dev`, que tiene que quedar a cero.

## Accesibilidad

Objetivo: **WCAG 2.1 AAA**. Si en un punto concreto no es viable, se baja a AA y se deja
escrito el motivo junto al código.

- Texto con contraste mínimo de 7:1
- Foco visible en todo elemento interactivo; nunca se elimina el `outline` sin sustituto
- Toda animación respeta `prefers-reduced-motion` (criterio 2.3.3)
- Comprobar cada página con zoom al 200 % y en móvil en horizontal, no solo por ancho
- Alt que diga lo que comunica la imagen; las imágenes decorativas llevan `alt=""`
- Al usar un patrón ARIA, indicar qué queda por verificar con lector de pantalla

Las reglas de estilo y del neumorfismo están en [`src/CLAUDE.md`](src/CLAUDE.md).

## Seguridad y privacidad

- `.env*` está en `.gitignore`. Las variables nuevas se documentan en `.env.example`, sin valores
- Nada de analítica, cookies de terceros ni formularios que recojan datos personales sin
  revisar antes el impacto en RGPD

## Git

- Rama principal: `main`
- Mensajes de commit en inglés, en imperativo y describiendo el porqué cuando no es evidente
