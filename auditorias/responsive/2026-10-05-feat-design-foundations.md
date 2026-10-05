Commit auditado: 0223828fe079d99442d0a3c5431608b6080e0bf3

# Auditoría responsive: feat/design-foundations → dev

- Fecha: 2026-10-05 (segunda ronda; sustituye al informe del commit `743f345`)
- Alcance: tokens de diseño en `src/estilos/`, fuentes con `next/font`, sincronía de `theme-color` con `--surface` y portada mínima (`/`) con el `h1` «Irina Ichim Studio».
- Cobertura de rutas: `src/app/` solo tiene `page.tsx` (`/`), y `pruebas/routes.ts` incluye `["/"]`. No falta ninguna página.
- Condiciones: única ejecución de build en la máquina (ningún otro agente compilando). El puerto 3100 estaba libre, así que Playwright hizo build y `next start` desde cero, sin reutilizar un servidor previo. Las capturas antiguas se borraron antes de ejecutar.
- `npm run test:responsive`: **60/60 en verde** (1,7 min), a la primera.
- Capturas revisadas: las 20 de `auditorias/responsive/capturas/` (10 perfiles × 2 temas), una a una.

## Comprobación de la ronda anterior (H1)

La prueba de capturas ahora espera a `document.fonts.ready` y falla si `--surface` está vacío o si la fuente del `body` no incluye Figtree. Una página sin hoja de estilos ya no puede pasar en verde. En esta ejecución, las dos capturas de `desktop-safari` salen con estilos completos (fondo perla y negro con degradado, Playfair Display, «Studio» con acento). **H1 queda cerrado**: el fallo no se ha reproducido sin builds concurrentes, y si vuelve a ocurrir, la prueba lo marcará en rojo.

## Página `/` (inicio)

| Perfil | Tema | Sin scroll horizontal | Objetivos ≥ 44 px | `<main>` y estilos | Revisión visual |
| --- | --- | --- | --- | --- | --- |
| large-desktop (2560×1440) | claro | OK | OK (no hay) | OK | OK. Hueco grande a la derecha (S1) |
| large-desktop (2560×1440) | oscuro | OK | OK (no hay) | OK | OK. Hueco grande a la derecha (S1) |
| desktop (1366×768) | claro | OK | OK (no hay) | OK | OK |
| desktop (1366×768) | oscuro | OK | OK (no hay) | OK | OK |
| desktop-safari (1440×900) | claro | OK | OK (no hay) | OK | OK. Con estilos. Peso regular (límite de WebKit) |
| desktop-safari (1440×900) | oscuro | OK | OK (no hay) | OK | OK. Peso regular (límite de WebKit) |
| desktop-zoom-200 (683×384 @2x) | claro | OK | OK (no hay) | OK | OK. Titular en una línea, sin cortes |
| desktop-zoom-200 (683×384 @2x) | oscuro | OK | OK (no hay) | OK | OK |
| tablet-portrait (iPad Mini) | claro | OK | OK (no hay) | OK | OK. Peso regular (límite de WebKit) |
| tablet-portrait (iPad Mini) | oscuro | OK | OK (no hay) | OK | OK. Peso regular (límite de WebKit) |
| tablet-landscape (iPad Pro 11) | claro | OK | OK (no hay) | OK | OK. Peso regular (límite de WebKit) |
| tablet-landscape (iPad Pro 11) | oscuro | OK | OK (no hay) | OK | OK. Peso regular (límite de WebKit) |
| mobile-portrait-ios (iPhone 15) | claro | OK | OK (no hay) | OK | OK. Peso regular (límite de WebKit) |
| mobile-portrait-ios (iPhone 15) | oscuro | OK | OK (no hay) | OK | OK. Peso regular (límite de WebKit) |
| mobile-landscape-ios (iPhone 15) | claro | OK | OK (no hay) | OK | OK. El titular ocupa algo más de la mitad del ancho, no toda la pantalla |
| mobile-landscape-ios (iPhone 15) | oscuro | OK | OK (no hay) | OK | OK |
| mobile-portrait-android (Pixel 7) | claro | OK | OK (no hay) | OK | OK. Titular en una línea con margen a la derecha |
| mobile-portrait-android (Pixel 7) | oscuro | OK | OK (no hay) | OK | OK |
| mobile-landscape-android (Pixel 7) | claro | OK | OK (no hay) | OK | OK |
| mobile-landscape-android (Pixel 7) | oscuro | OK | OK (no hay) | OK | OK |

«OK (no hay)»: la página no tiene elementos interactivos, así que la prueba de 44 × 44 px pasa sin medir nada (ver S3).

En los dos temas, el titular se lee bien sobre el fondo: onyx sobre perla, marfil sobre negro con degradado suave, y el degradado de acento de «Studio» (magenta en claro, dorado en oscuro). No hay sombras residuales en el texto tras quitar las sombras por defecto de Tailwind. No hay texto cortado, solapado ni fuera de su contenedor en ningún perfil. Con una sola línea de texto, la longitud de línea en pantalla grande no aplica.

## Hallazgos

Ninguno bloqueante.

### Límite conocido: peso de Playfair Display en WebKit

En todos los perfiles WebKit (desktop-safari, tablet-*, mobile-*-ios), «Irina Ichim» se pinta en regular, mientras que en Chromium sale en negrita. Es el límite conocido del WebKit de Playwright en Windows con fuentes variables, no un fallo de la web. Sigue pendiente verificarlo en un dispositivo Apple real.

## Sugerencias (no bloqueantes)

- **S1. Composición en pantalla grande.** Sin cambios respecto a la ronda anterior: con `max-w-5xl` y el texto alineado a la izquierda, a 2560 px el titular queda en el tercio central-izquierdo con mucho hueco a la derecha. Conviene decidirlo cuando llegue el hero real.
- **S2. Altura en móvil vertical.** `min-h-dvh` con el contenido centrado deja solo el titular en el primer pantallazo. Cuando haya contenido, el lema y la llamada a la acción tendrán que entrar ahí.
- **S3. La prueba de objetivos táctiles todavía no mide nada.** Empezará a medir con la cabecera y la navegación.
- **S4. `theme.spec.ts` no entra en `npm run test:responsive`.** El script filtra por «responsive», y en `playwright.config.ts` la prueba de tema solo está asignada al perfil `desktop`. Esta auditoría no la ha ejecutado; la cubre `npm run test:e2e`. Si se quiere que la sincronía de `theme-color` se vigile también en WebKit y móvil, habría que añadir `THEME` a esos perfiles.
- **S5. La comprobación de Figtree mira el CSS, no la fuente descargada.** `getComputedStyle(body).fontFamily` confirma que el CSS pide Figtree, y eso basta para detectar una página sin estilos (el caso de H1). No garantiza que el archivo de fuente se haya descargado. Si algún día interesa distinguirlo, `document.fonts.check()` con el nombre de familia que genera `next/font` lo cubriría.

VEREDICTO: APROBADA
