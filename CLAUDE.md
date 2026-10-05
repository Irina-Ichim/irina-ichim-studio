@AGENTS.md

# Irina Ichim Studio

Web de **Irina Ichim Studio** (`irina-ichim.com`), de tipo agencia: existe para que empresas,
profesionales y freelancers encuentren a Irina, vean su trabajo y la contacten o reserven una
cita. La propia web es parte del portfolio, así que el acabado visual, la calidad del código,
la accesibilidad y el posicionamiento cuentan tanto como el contenido.

La marca no se presenta como «agencia de IA»: ni «IA» ni «AI» en el nombre ni en el lema. La
IA aparece donde aporta (formulario inteligente, agenda) como herramienta, no como identidad.

## Fases

| Fase | Alcance | Estado |
| --- | --- | --- |
| 1 | Frontend: páginas públicas, sistema visual, animaciones, interfaz del formulario de contacto y de la agenda | En curso |
| 2 | Backend: contacto, PostgreSQL (probablemente con Prisma), integración con un LLM | Sin empezar |

En la fase 1 no se añaden API routes, Server Actions con efectos, base de datos ni variables
de entorno con secretos. Si una tarea lo pide, conviene señalarlo antes y decidir si adelanta
trabajo de la fase 2.

## Stack

- **Next.js 16.3.8** (App Router, `src/`), React 19, TypeScript en modo estricto
- **Tailwind CSS 4**, con los tokens de diseño en `src/estilos/` (ver `src/CLAUDE.md`)
- npm como gestor de paquetes. Node 22 (`.nvmrc`)
- Despliegue previsto en **Railway**: `main` es producción y `dev`, el entorno de verificación

Next 16 trae cambios respecto a versiones anteriores. Antes de escribir código que dependa de
una API de Next, consultar la guía correspondiente en `node_modules/next/dist/docs/` (ver
`AGENTS.md`).

## Comandos

```bash
npm run dev        # servidor de desarrollo
npm run lint       # ESLint, sin tolerar avisos
npm run typecheck  # TypeScript
npm run check      # lint + typecheck + build: lo mismo que ejecuta la CI
npm run test:e2e   # Playwright: responsive y accesibilidad en todos los perfiles
npm run test:responsive
npm run test:a11y  # axe con las reglas WCAG hasta AAA, en tema claro y oscuro
```

Cada página nueva se añade a `pruebas/routes.ts`; si no, ninguna prueba la cubre.

## Flujo de trabajo

El trabajo se organiza en issues dentro del Project de GitHub. Cada issue tiene:

- **Título con área y número correlativo por área:** `[Frontend 0.1] Logo y favicon`,
  `[Backend 0.1] Envío del formulario`, `[DevOps 0.1] Despliegue en Railway`
- **Etiquetas:** área (`frontend`, `backend`, `devops`), tipo (`feature`, `bug`, `mejora`,
  `documentación`), prioridad (`prioridad: alta`, `media`, `baja`) y fase (`fase 1`, `fase 2`).
  Se crean etiquetas nuevas cuando hagan falta
- **Agentes y auditorías sugeridas** para esa tarea, según la plantilla de issue

| Rama | Para qué |
| --- | --- |
| `main` | Producción. Solo recibe una PR desde `dev`, cuando Irina lo decide |
| `dev` | Verificación. Recibe por PR las ramas de trabajo |
| `feat/…`, `fix/…`, `chore/…`, `docs/…` | Trabajo. Una por issue, siempre desde `dev` actualizada |

1. `git switch dev && git pull`, y la rama nueva desde ahí
2. Commits con Conventional Commits, en inglés, que citan la issue: `feat: add services section (#12)`
3. Al subir la rama, la CI ejecuta lint, tipos, build y las pruebas de Playwright
4. Con la CI en verde, Claude **sugiere** qué agentes encajan con lo que ha cambiado y por qué
   (ver [Agentes](#agentes)). **Irina decide** cuáles se pasan; si dice que no, no se pasa
   ninguno. Nunca se lanzan sin su OK
5. **Antes de abrir la PR se actualiza la documentación:** la de cualquier `CLAUDE.md` o guía
   afectada por el cambio, una entrada en `CHANGELOG.md` y `NOW.md`
6. PR hacia `dev`, que cita la issue (`Closes #12`). Aunque el proyecto sea de una persona, la
   PR deja constancia de qué cambió y por qué
7. Con el OK de Irina, la PR se fusiona (merge commit, no squash) y la issue se cierra

La PR de `dev` → `main` es el paso a producción: se prepara solo cuando Irina lo pide, con la
plantilla `.github/pull_request_template.md`, y al publicarse la sección «Sin publicar» del
changelog pasa a llevar versión y fecha. Nunca se hace push directo a `main`.

El hook `.claude/hooks/require-review.mjs` impide abrir una PR sin rama destino, hacia una rama
que no sea `main` o `dev`, o hacia `main` desde otra rama que no sea `dev`.

### `CHANGELOG.md` y `NOW.md`

- **`CHANGELOG.md`** cuenta lo que cambia para quien visita la web o trabaja en ella, en el
  formato de [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/): secciones Añadido,
  Cambiado, Corregido y Eliminado, con la issue de cada entrada. Lo que está en `dev` y aún no
  en `main` vive en «Sin publicar»
- **`NOW.md`** dice dónde está el proyecto ahora: qué está en curso, qué espera una decisión de
  Irina y qué es lo siguiente. Se reescribe, no se acumula: el historial ya está en el
  changelog y en git

## Agentes

Viven en `.claude/agents/`. Ninguno corrige código: auditan, dejan un informe en `auditorias/`
y deciden. **No son obligatorios:** antes de cada PR, Claude sugiere cuáles encajan con lo que
ha cambiado y el motivo, e Irina decide si se pasan. Sirve de guía:

| Agente | Útil cuando la tarea… |
| --- | --- |
| `responsive-auditor` | cambia lo que se ve: maquetación, componentes, páginas |
| `design-system-reviewer` | crea o cambia componentes o estilos |
| `spelling-reviewer` | añade o cambia textos visibles, `alt`, `aria-label` o metadatos |
| `seo-geo-auditor` | crea páginas o cambia metadatos o contenido |
| `pr-reviewer` | es grande o delicada y merece una revisión final completa |

Una corrección hecha después de una auditoría no obliga a repetirla: basta con que la revise
quien hace la revisión final, si la hay. Quien escribe el cambio no valida su propio trabajo.

`responsive-auditor` y `seo-geo-auditor` compilan la web, así que se lanzan uno detrás de otro
y nunca a la vez: comparten la carpeta `.next` y una compilación pisaría a la otra.
`spelling-reviewer` y `design-system-reviewer` pueden ir en paralelo con cualquiera.

## Estructura de carpetas

En la raíz, además de la configuración:

```text
auditorias/   Informes de los agentes especialistas
pruebas/      Pruebas de Playwright (responsive y accesibilidad) y la lista de rutas
src/          La aplicación
CHANGELOG.md  Qué ha cambiado, por issue
NOW.md        Dónde está el proyecto ahora
```

Un `CLAUDE.md` por carpeta solo cuando esa carpeta tiene reglas propias que no caben en el de
la raíz (hoy, `src/CLAUDE.md` para el sistema visual). Nunca se repite en uno lo que ya dice
otro.

Las carpetas propias van en **español**. Las que fijan las herramientas conservan su nombre:
`app`, `public`, `node_modules`, `.github`, `.claude`, y archivos como `page.tsx` o
`layout.tsx`.

```text
src/
├── app/                 Rutas. Cada carpeta de ruta es la URL, así que va en español
│   ├── layout.tsx
│   ├── page.tsx
│   └── servicios/page.tsx       → /servicios
├── componentes/
│   ├── ui/              Piezas base del sistema neumórfico: Button, Card, IconPill
│   ├── estructura/      Cabecera, pie y navegación comunes a todas las páginas
│   └── secciones/       Bloques de una página: Hero, ServicesGrid
├── contenido/           Textos y datos reales del estudio, tipados
├── estilos/             Temas, tokens, mapeo a Tailwind, utilidades y base (ver src/CLAUDE.md)
├── hooks/               Hooks de React propios (se mantiene el término de React)
├── utilidades/          Funciones puras, sin React
├── tipos/               Tipos compartidos entre carpetas
└── servidor/            Fase 2: dominio, casos de uso y acceso a datos
```

- Una carpeta se crea cuando llega su primer archivo, no antes
- Un componente que solo usa una página vive junto a ella. Pasa a `componentes/` cuando lo
  usan tres sitios
- `servidor/` nunca importa de `componentes/` ni de `app/`. La dependencia va al revés

## Convenciones de nombres

| Qué | Idioma | Formato | Ejemplo |
| --- | --- | --- | --- |
| Carpetas propias y rutas | Español | kebab-case | `sobre-mi/`, `componentes/` |
| Componentes | Inglés | PascalCase | `ServiceCard.tsx` |
| Resto de archivos | Inglés | camelCase | `formatDate.ts` |
| Variables, funciones, tipos | Inglés | camelCase / PascalCase | `services`, `type Service` |
| Constantes globales | Inglés | UPPER_SNAKE_CASE | `MAX_PROJECTS` |
| Textos visibles para el público | Español | — | `"Hablemos de tu web"` |

Los textos visibles viven en `src/contenido/`, no repartidos por los componentes.

La tabla rige dentro de `src/`. Fuera de ahí (`.claude/`, `.github/`, archivos de
configuración) se sigue la convención de cada herramienta, que suele ser kebab-case.

## Reglas de código

**Principios.** SOLID, DRY (sobre conocimiento duplicado, no sobre texto parecido), KISS y
YAGNI. Una abstracción necesita tres usos reales. El código que no se usa se borra.

**Prohibido**, y lo comprueban ESLint, TypeScript o el agente:

- `console.*`, `debugger` y `alert`
- Datos falsos o de relleno: lorem ipsum, nombres, cifras o testimonios inventados, imágenes de
  placeholder. Si falta contenido real, se pide a Irina; no se inventa
- `any`, `as unknown as`, `@ts-ignore`, `@ts-expect-error` y aserciones `!`
- Código comentado y TODO sin issue enlazado
- Promesas sin `await` ni manejo (`no-floating-promises`)

**TypeScript.** Además de `strict`, están activos `noUncheckedIndexedAccess`,
`noImplicitReturns`, `noImplicitOverride` y `noFallthroughCasesInSwitch`. Los `switch` sobre
uniones tienen que ser exhaustivos. Los imports de tipos usan `import type`. Para datos
externos se valida en el borde y se trabaja con tipos ya estrechados, nunca con casts.

**Comentarios.** Solo cuando explican un porqué que el código no puede expresar: una
restricción externa, un bug de una librería, una decisión no evidente. No se comenta lo que
el código ya dice, ni se dejan bloques largos de explicación. Si hace falta un comentario
para entender qué hace algo, se renombra o se reestructura.

## Dependencias

Cada dependencia nueva se justifica antes de instalarla: qué resuelve, por qué no basta con lo
que ya hay, licencia y estado de mantenimiento. Versión estable siempre, comprobada en npm
(`npm view <paquete> dist-tags`), nunca canary, beta ni rc. Las de producción, con la versión
fijada.

Decisiones tomadas:

- **Sin librerías de neumorfismo ni de componentes visuales.** Los estilos son propios
- **Sin `lucide-react`**
- **Iconos**: `@phosphor-icons/react` (MIT), peso duotone. Cómo se usan, en `src/CLAUDE.md`
- **Pruebas**: `@playwright/test` (Apache-2.0) con Chromium y WebKit, y `@axe-core/playwright`
  (MPL-2.0, solo en desarrollo; no se distribuye con la web)
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

## Imágenes y medios

Cada imagen llega comprimida y en el formato que da el menor peso sin perder calidad:

| Qué | Formato | Cómo |
| --- | --- | --- |
| Fotos y capturas | AVIF o WebP | Siempre con `next/image`, que las sirve en AVIF o WebP según el navegador (`next.config.ts`) y al tamaño de cada pantalla. El original entra ya comprimido, a 2560 px como máximo en el lado largo |
| Logo, iconos e ilustraciones | SVG | Vectorial: más ligero y nítido que cualquier formato de mapa de bits. Dentro de la web, el logo adapta sus colores al tema |
| Animaciones | Vídeo MP4 o WebM (o WebP animado si la animación es muy corta) | Nunca GIF: pesa hasta diez veces más y `next/image` no lo optimiza. El vídeo va con `autoplay muted loop playsinline` y se pausa con `prefers-reduced-motion` |
| Favicon e iconos de móvil | ICO, SVG y PNG | Son los formatos que exigen los navegadores y los sistemas; WebP no sirve como icono de iPhone |
| Imagen para redes (Open Graph) | PNG o JPG | Algunas redes no muestran WebP en la vista previa |

- Toda imagen lleva `width` y `height` (o `fill` con un contenedor de proporción fija) para que no haya saltos al cargar.
- La imagen principal de cada página lleva `fetchPriority="high"` (o `preload` si hace falta precargarla); las demás se cargan de forma diferida. `priority` está obsoleto desde Next 16.
- `alt` según la regla de accesibilidad: lo que comunica la imagen, o `alt=""` si es decorativa.

La marca vive en `src/componentes/estructura/Logo.tsx` (el logo, con los colores del tema), `src/app/icon.svg`,
`favicon.ico` y `apple-icon.png` (Next los enlaza solos), `public/iconos/` (manifiesto) y
`public/marca/opengraph.png`. Se generan a partir de los archivos originales de las fuentes, con las letras convertidas en trazos.

Los iconos y la imagen para redes se ven fuera de la web (pestañas, pantalla de inicio del
móvil, vistas previas en redes), donde no hay variables CSS, así que llevan los colores escritos:

- `icon.svg` trae los dos temas y cambia con `prefers-color-scheme` (Chrome, Edge y Firefox).
- `favicon.ico` (lo usa Safari), `apple-icon.png`, los iconos del manifiesto y la imagen para
  redes no pueden adaptarse y van en el tema oscuro.
- `public/marca/logo-light.*` (para fondos claros) y `logo-dark.*` (para fondos oscuros), en
  SVG y PNG transparente, son para usar fuera de la web: documentos, presentaciones, correo.

`pruebas/brand.spec.ts` falla si `icon.svg` deja de coincidir con los tokens de cualquiera de
los dos temas; si los tokens cambian, se regeneran todos los recursos de marca.

## Seguridad y privacidad

- Ninguna contraseña, clave de API, token ni dato sensible en el código ni en el repositorio,
  tampoco en pruebas o ejemplos. Siempre en variables de entorno
- `.env*` está en `.gitignore`. Las variables nuevas se documentan en `.env.example`, sin valores
- Nada de analítica, cookies de terceros ni formularios que recojan datos personales sin
  revisar antes el impacto en RGPD
