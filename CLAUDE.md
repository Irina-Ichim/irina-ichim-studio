@AGENTS.md

# Irina Ichim Studio

Web del estudio de Irina Ichim: el escaparate donde empresas, profesionales y freelancers
conocen el trabajo del estudio y lo contactan para encargar una web. La propia web es parte
del portfolio, así que el acabado visual, la calidad del código y la accesibilidad cuentan
tanto como el contenido.

## Fases

| Fase | Alcance | Estado |
| --- | --- | --- |
| 1 | Frontend: páginas públicas, sistema visual, animaciones. Sin backend ni base de datos | En curso |
| 2 | Backend: contacto, PostgreSQL (probablemente con Prisma), integración con un LLM | Sin empezar |

En la fase 1 no se añaden API routes, Server Actions con efectos, base de datos ni variables
de entorno con secretos. Si una tarea lo pide, conviene señalarlo antes y decidir si adelanta
trabajo de la fase 2.

## Stack

- **Next.js 16.3.8** (App Router, `src/`), React 19, TypeScript en modo estricto
- **Tailwind CSS 4**, con los tokens de diseño definidos en `src/app/globals.css`
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
```

## Flujo de trabajo con Git

| Rama | Para qué |
| --- | --- |
| `main` | Producción. Solo recibe PRs desde `dev`, y solo cuando Irina lo decide |
| `dev` | Verificación. Recibe las PRs de las ramas de trabajo |
| `feat/…`, `fix/…`, `chore/…`, `docs/…` | Trabajo. Se crean siempre desde `dev` actualizada |

1. `git switch dev && git pull`, y la rama nueva desde ahí
2. Commits con Conventional Commits, en inglés: `feat: add services section`
3. `npm run check` en verde
4. Lanzar el agente **`pr-reviewer`**. Si bloquea, se corrige y se vuelve a lanzar
5. `gh pr create --base dev`, con la plantilla de `.github/pull_request_template.md`

Nunca se hace push directo a `main` ni a `dev`. La subida de `dev` a `main` es decisión de
Irina: se prepara la PR, pero no se abre por iniciativa propia.

**Qué lo hace cumplir.** El hook `.claude/hooks/require-review.mjs` bloquea `gh pr create`
sin `--base`, hacia una rama que no sea `dev` o `main`, hacia `main` desde otra rama que no
sea `dev`, o sin la aprobación del agente para el commit actual. La CI
(`.github/workflows/ci.yml`) ejecuta lint, tipos y build en cada PR. La aprobación del agente
solo la escribe el agente: quien hace el cambio no valida su propio trabajo.

El hook solo actúa dentro de Claude Code. La garantía real frente a pushes directos y PRs sin
CI en verde es la protección de ramas de GitHub. El hook también puede leer un `--base` que
aparezca dentro del texto de `--body`: en ese caso bloquea de más, nunca de menos.

## Estructura de carpetas

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
- **`typescript-eslint`** (MIT): ya llegaba con `eslint-config-next`. Se declara de forma
  directa porque `eslint.config.mjs` lo importa para las reglas que necesitan tipos
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
