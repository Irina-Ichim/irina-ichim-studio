Commit auditado: cd11ef2fa69d16372b98a3671f99ceb6d5605cb2

# Auditoría responsive: `feat/brand-assets` → `dev` (tercera ronda)

Fecha: 2026-10-05. Sustituye al informe que aprobó `d3068ef`. Cambios en `src/` desde entonces:

- `src/componentes/estructura/Logo.tsx`: los ids de los degradados salen de `useId()` en lugar
  de un `idPrefix` fijo. Desaparecen las props `decorative` e `idPrefix`, y el SVG pasa a ser
  siempre `aria-hidden` (el nombre accesible lo pone el enlace que lo rodea).
- `src/app/layout.tsx`: deja de pasar `decorative` al logo. Tamaños sin cambios (`w-56 sm:w-72`).

No hay cambios de tamaño ni de maquetación, así que las medidas del informe anterior siguen
valiendo (enlace del logo de 288 × 91 px desde `sm` y de 224 × 71 px en móvil vertical).

## Cobertura de rutas

`src/app/` tiene una sola página (`src/app/page.tsx` → `/`) y `pruebas/routes.ts` la incluye.
No queda ninguna ruta sin cubrir.

## Pruebas automáticas

Borré las capturas antiguas antes de ejecutar.

- **Primera ejecución**: 59 de 60. Falló `[mobile-portrait-android] / · light › renders styled
  content…` con `Protocol error (Page.captureScreenshot): Unable to capture screenshot` en
  `page.screenshot`. Las comprobaciones previas a la captura (tokens, fuentes, `<main>`) pasaron.
  Es un fallo de Chromium al hacer la captura con muchos trabajadores en paralelo, no de la web.
  El mismo perfil pasó en tema oscuro.
- **Segunda ejecución**, tras volver a borrar las capturas: **60 de 60 en verde** (10 perfiles ×
  2 temas × 3 pruebas: sin desplazamiento horizontal, objetivos de 44 × 44 px y `<main>` visible
  con los tokens y la fuente de marca cargados). Las capturas revisadas son las de esta ejecución.

La instantánea de accesibilidad del fallo muestra el enlace con el nombre «Irina Ichim Studio,
ir al inicio» y el SVG fuera del árbol. Es lo esperado con `aria-hidden`.

## Degradados del logo (`useId`)

Lo comprobé en las 20 capturas, con Chromium y con WebKit:

- **Tema claro**: sello con aro de oro metálico (de claro a oscuro en diagonal). «Ii» e «Ichim»
  con el degradado magenta. «Irina» en tinta e «STUDIO» en `--ink-muted`.
- **Tema oscuro**: aro de oro y «Ii» e «Ichim» con el degradado dorado. «Irina» en marfil e
  «STUDIO» legible.
- En ninguna captura hay relleno negro ni transparente, que es lo que se vería si un
  `url(#…)` no encontrara su degradado. Los ids generados por `useId` funcionan en los dos
  motores.

Para que no haga falta revisarlo a mano: hoy hay un solo logo por página. Si alguna vez se
pintan dos (por ejemplo, en la cabecera y en el pie), `useId` evita que los ids se repitan,
que era el riesgo del `idPrefix` fijo. Ese caso todavía no se puede probar.

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

Revisé las 20 capturas y todas se ven igual que en la ronda anterior. No hay texto cortado,
solapado ni fuera de su contenedor. Logo y titular caben en el primer pantallazo en móvil
horizontal y con zoom al 200 %. La cabecera no es fija.

## Hallazgos

Ninguno bloqueante. Las sugerencias S1 a S3 vienen de las rondas anteriores y no cambian.

### S1 · «STUDIO» en pantallas de densidad 1 (sugerencia)

- **Perfiles**: desktop y large-desktop. **Temas**: los dos.
- **Capturas**: `capturas/desktop/inicio-{light,dark}.png`, `capturas/large-desktop/inicio-{light,dark}.png`.
- **Qué pasa**: con 288 px de ancho, «STUDIO» mide 7,8 px de alto. En 2560 px el logo queda
  pequeño respecto a la pantalla.
- **Propuesta**: un escalón más desde `lg` (`lg:w-80`) o una variante de «STUDIO» con trazo más
  grueso para tamaños pequeños. No hace falta para esta PR.

### S2 · El titular va justo de ancho en móvil vertical (sugerencia)

- **Perfiles**: mobile-portrait-ios y mobile-portrait-android. **Temas**: los dos.
- **Capturas**: `capturas/mobile-portrait-*/inicio-{light,dark}.png`.
- **Qué pasa**: en 393 px, «Irina Ichim Studio» cabe en una línea con poco margen. En pantallas
  de 320 a 360 px, que ningún perfil prueba, partirá línea.
- **Propuesta**: añadir un perfil de 320 a 360 px en `playwright.config.ts`.

### S3 · Hueco lateral en pantalla grande (sugerencia)

- **Perfil**: large-desktop. **Temas**: los dos.
- **Captura**: `capturas/large-desktop/inicio-{light,dark}.png`.
- **Qué pasa**: el contenido está limitado a `max-w-5xl` y en 2560 px quedan unos 780 px vacíos
  a cada lado. Es lo esperable con la portada provisional.
- **Propuesta**: revisarlo cuando llegue el contenido real.

### S4 · Fallo intermitente de captura en Chromium (sugerencia, nueva)

- **Perfil**: mobile-portrait-android. **Tema**: claro. Solo en la primera ejecución.
- **Qué pasa**: `Page.captureScreenshot` falló una vez sin que fallara nada de la página. En
  local `retries` vale 0, así que un fallo así pone la prueba en rojo. En la CI hay un
  reintento.
- **Propuesta**: si vuelve a pasar, limitar `workers` en local o dar un reintento solo a la
  prueba de captura. No toca a esta PR.

### Nota W · Peso de Playfair en WebKit

En los perfiles con WebKit el titular sale en peso regular, y en Chromium en 700. Es un límite
conocido del WebKit de Playwright en Windows y no un fallo de la web. Queda pendiente
comprobarlo en un dispositivo Apple real. Al logo no le afecta, porque sus letras son trazos.

VEREDICTO: APROBADA
