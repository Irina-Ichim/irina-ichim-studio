Commit auditado: d3068ef641d030d5843a9999e7e9dab4a6f584b1

# Auditoría responsive: `feat/brand-assets` → `dev` (segunda ronda)

Fecha: 2026-10-05. Sustituye al informe que aprobó `dd898b9`. Único cambio visual desde
entonces: el logo de la cabecera pasa de `sm:w-64` (256 px) a `sm:w-72` (288 px) en
`src/app/layout.tsx`. Por debajo de `sm` sigue en `w-56` (224 px).

## Cobertura de rutas

`src/app/` tiene una sola página (`src/app/page.tsx` → `/`) y `pruebas/routes.ts` la incluye.
Sin rutas sin cubrir.

## Pruebas automáticas

Capturas antiguas borradas antes de ejecutar. `npm run test:responsive`: **60 de 60 en verde**
(10 perfiles × 2 temas × 3 pruebas: sin desplazamiento horizontal, objetivos de 44 × 44 px,
`<main>` visible con tokens y fuente de marca cargados).

## Medidas del logo (Playwright, `getBoundingClientRect`, servidor de producción)

| Perfil | Viewport (CSS px) | Enlace del logo | Altura de «STUDIO» | Altura de «Irina» | Fin del titular |
| --- | --- | --- | --- | --- | --- |
| large-desktop | 2560 × 1440 | 288 × 91 | 7,8 px | 28,6 px | 303 |
| desktop | 1366 × 768 | 288 × 91 | 7,8 px | 28,6 px | 303 |
| desktop-safari | 1440 × 900 | 288 × 91 | 7,8 px | 28,6 px | 303 |
| desktop-zoom-200 | 683 × 384 | 288 × 91 | 7,8 px | 28,6 px | 293 |
| tablet-portrait | 768 × 1024 | 288 × 91 | 7,8 px | 28,6 px | 296 |
| tablet-landscape | 1194 × 834 | 288 × 91 | 7,8 px | 28,6 px | 303 |
| mobile-portrait-ios | 393 × 659 | 224 × 71 | 6,1 px | 22,2 px | 234 |
| mobile-landscape-ios | 734 × 343 | 288 × 91 | 7,8 px | 28,6 px | 295 |
| mobile-portrait-android | 412 × 839 | 224 × 71 | 6,1 px | 22,2 px | 234 |
| mobile-landscape-android | 863 × 360 | 288 × 91 | 7,8 px | 28,6 px | 298 |

- «STUDIO» pasa de 7,0 a 7,8 px desde `sm` (+12,5 %, proporcional al ancho). En móvil vertical
  no cambia (6,1 px), como era de esperar.
- Enlace: supera 44 × 44 px en todos los perfiles; nombre accesible sin cambios.
- Coste en altura: la cabecera crece 10 px. En móvil horizontal el titular acaba a 295 de 343 px
  (iPhone) y 298 de 360 px (Pixel); con zoom al 200 %, a 293 de 384 px. Logo y titular siguen en
  el primer pantallazo, con 48 px de margen en el caso más justo.

## Página `/`

| Perfil | Claro | Oscuro |
| --- | --- | --- |
| large-desktop (2560 × 1440) | Correcta · sugerencias S1, S3 | Correcta · sugerencias S1, S3 |
| desktop (1366 × 768) | Correcta · sugerencia S1 | Correcta · sugerencia S1 |
| desktop-safari (1440 × 900, WebKit) | Correcta · nota W | Correcta · nota W |
| desktop-zoom-200 (683 × 384) | Correcta | Correcta |
| tablet-portrait (iPad Mini) | Correcta · nota W | Correcta · nota W |
| tablet-landscape (iPad Pro 11) | Correcta · nota W | Correcta · nota W |
| mobile-portrait-ios (iPhone 15) | Correcta · sugerencia S2 · nota W | Correcta · sugerencia S2 · nota W |
| mobile-landscape-ios (iPhone 15) | Correcta · nota W | Correcta · nota W |
| mobile-portrait-android (Pixel 7) | Correcta · sugerencia S2 | Correcta · sugerencia S2 |
| mobile-landscape-android (Pixel 7) | Correcta | Correcta |

Revisadas las 20 capturas. Ninguna tiene texto cortado, solapado ni fuera de su contenedor. El
logo más grande no choca con nada ni empuja el titular fuera de la pantalla. La cabecera no es
fija. Los dos temas conservan el degradado magenta/oro, el sello y la legibilidad de «STUDIO»
(`--ink-muted`).

## Hallazgos

Ninguno bloqueante.

### S1 · «STUDIO» en pantallas de densidad 1 (sugerencia, mejorada en esta ronda)

- **Perfiles**: desktop y large-desktop (DPR 1).
- **Temas**: los dos.
- **Capturas**: `capturas/desktop/inicio-{light,dark}.png`, `capturas/large-desktop/inicio-{light,dark}.png`.
- **Qué pasa**: con 288 px, «STUDIO» mide 7,8 px. En la captura de 1366 px se lee mejor que en
  la ronda anterior, pero sigue algo por debajo de los 8–9 px que proponía. En 2560 px el logo
  sigue viéndose pequeño respecto a la pantalla.
- **Propuesta**: si se quiere cerrar del todo, un paso más desde `lg` (`lg:w-80`, 320 px, que
  daría unos 8,7 px) o la variante del SVG con «STUDIO» de trazo más grueso para tamaños pequeños.
  No hace falta para esta PR.

### S2 · El titular va justo de ancho en móvil vertical (sugerencia, sin cambios)

- **Perfiles**: mobile-portrait-ios, mobile-portrait-android. **Temas**: los dos.
- **Capturas**: `capturas/mobile-portrait-*/inicio-{light,dark}.png`.
- **Qué pasa**: «Irina Ichim Studio» ocupa 361 de 393 px (iPhone 15) en una línea. En móviles de
  320–360 px, que ningún perfil prueba, partirá línea. No viene de este cambio.
- **Propuesta**: añadir un perfil de 320–360 px en `playwright.config.ts` antes de que la portada
  tenga contenido real.

### S3 · Hueco lateral en pantalla grande (sugerencia, sin cambios)

- **Perfil**: large-desktop. **Temas**: los dos.
- **Captura**: `capturas/large-desktop/inicio-{light,dark}.png`.
- **Qué pasa**: cabecera y `<main>` limitados a `max-w-5xl`; en 2560 px quedan unos 780 px vacíos
  a cada lado. Esperable con la portada provisional.
- **Propuesta**: revisarlo cuando llegue el contenido real.

### Nota W · Peso de Playfair en WebKit

En los perfiles WebKit el titular se pinta en peso regular; en Chromium, en 700. Es el límite
conocido del WebKit de Playwright en Windows, no un fallo de la web. Pendiente de verificar en un
dispositivo Apple real. El logo no se ve afectado: sus letras son trazos.

VEREDICTO: APROBADA
