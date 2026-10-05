Commit auditado: df16d16367c46ac7f8842c78ee4043c3901666e9

# Auditoría responsive: feat/design-foundations → dev

- Fecha: 2026-10-05 (tercera ronda; sustituye al informe del commit `0223828`, que se aprobó)
- Alcance: el único cambio en `src/` desde `0223828` es un renombrado sin cambios de contenido (`git diff 0223828..HEAD -- src`): `tailwind-theme.css` → `tailwindTheme.css` y `temas/browser-theme-color.ts` → `temas/browserThemeColor.ts` (similitud del 100 %), más las dos referencias en `src/app/globals.css` y `src/app/layout.tsx` y la tabla de `src/CLAUDE.md`. No quedan referencias a los nombres antiguos fuera de `auditorias/` (búsqueda sin `node_modules` ni `.next`).
- Cobertura de rutas: `src/app/` solo tiene `page.tsx` (`/`), y `pruebas/routes.ts` incluye `["/"]`. No falta ninguna página.
- Condiciones: ningún otro agente compilaba. El puerto 3100 no tenía ningún proceso a la escucha (solo conexiones `TIME_WAIT` de ejecuciones anteriores), así que Playwright hizo build y `next start` desde cero. Antes de ejecutar se borró `auditorias/responsive/capturas/`.
- `npm run test:responsive`: **60/60 en verde** (1,7 min), a la primera. Que el build pase confirma que los dos `import` renombrados resuelven.
- Capturas revisadas: las 20 nuevas (10 perfiles × 2 temas), una a una.

## Comparación con la ronda anterior

Las 20 capturas coinciden con lo descrito en la ronda de `0223828`: misma posición y tamaño del titular, mismos fondos (perla en claro y negro con degradado en oscuro) y el mismo degradado de acento en «Studio» (magenta en claro, dorado en oscuro). La prueba de capturas, que falla si `--surface` está vacío o si el `body` no pide Figtree, pasa en todos los perfiles, así que `tailwindTheme.css` se sigue cargando. No hay cambio visual.

## Página `/` (inicio)

| Perfil | Tema | Sin scroll horizontal | Objetivos ≥ 44 px | `<main>` y estilos | Revisión visual |
| --- | --- | --- | --- | --- | --- |
| large-desktop (2560×1440) | claro | OK | OK (no hay) | OK | OK. Hueco grande a la derecha (S1) |
| large-desktop (2560×1440) | oscuro | OK | OK (no hay) | OK | OK. Hueco grande a la derecha (S1) |
| desktop (1366×768) | claro | OK | OK (no hay) | OK | OK |
| desktop (1366×768) | oscuro | OK | OK (no hay) | OK | OK |
| desktop-safari (1440×900) | claro | OK | OK (no hay) | OK | OK. Peso regular (límite de WebKit) |
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

No hay texto cortado, solapado ni fuera de su contenedor en ningún perfil ni tema. Con una sola línea de texto, la longitud de línea en pantalla grande no aplica.

## Hallazgos

Ninguno bloqueante.

### Límite conocido: peso de Playfair Display en WebKit

En todos los perfiles WebKit (desktop-safari, tablet-*, mobile-*-ios), «Irina Ichim» se pinta en regular, mientras que en Chromium sale en negrita. Es el límite conocido del WebKit de Playwright en Windows con fuentes variables, no un fallo de la web. Sigue pendiente verificarlo en un dispositivo Apple real.

## Sugerencias (no bloqueantes)

Siguen abiertas las mismas que en la ronda anterior. Este commit no cambia ninguna.

- **S1. Composición en pantalla grande.** Con `max-w-5xl` y el texto alineado a la izquierda, a 2560 px el titular queda en el tercio central-izquierdo con mucho hueco a la derecha. Conviene decidirlo cuando llegue el hero real.
- **S2. Altura en móvil vertical.** `min-h-dvh` con el contenido centrado deja solo el titular en el primer pantallazo. Cuando haya contenido, el lema y la llamada a la acción tendrán que entrar ahí.
- **S3. La prueba de objetivos táctiles todavía no mide nada.** Empezará a medir con la cabecera y la navegación.
- **S4. `theme.spec.ts` no entra en `npm run test:responsive`.** Es la prueba que vigila `browserThemeColor.ts`, justo uno de los archivos renombrados. Esta auditoría no la ha ejecutado. El build confirma que el `import` resuelve, pero que el valor siga coincidiendo con `--surface` lo cubre `npm run test:e2e`, que conviene ejecutar antes del PR.
- **S5. La comprobación de Figtree mira el CSS, no la fuente descargada.** `document.fonts.check()` lo cubriría si algún día interesa distinguirlo.

VEREDICTO: APROBADA
