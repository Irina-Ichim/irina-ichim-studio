Commit auditado: 0063cc74a6707dd50bb220e05809ca8bbcd0fd25

# Auditoría responsive · `feat/theme-switch` (#24)

Fecha: 2026-10-06. Alcance: portada (`/`), con foco en el botón de tema (`IconButton` + `ThemeToggle`)
de la cabecera y en el tema forzado con `data-theme` / `localStorage["theme"]`.

## Qué se ha probado

1. `pruebas/routes.ts` frente a `src/app/`: la única página es `src/app/page.tsx` → `/`, y está
   en `ROUTES`. Cobertura completa.
2. `npm run test:responsive`, con compilación nueva (sin servidor previo en el puerto 3100):
   **60/60 en verde** (10 perfiles × 2 temas × 3 pruebas: sin desplazamiento horizontal, objetivos
   de 44 × 44 px como mínimo, `<main>` visible con los tokens y las fuentes cargados).
3. Revisión visual de las 20 capturas de `auditorias/responsive/capturas/<perfil>/`.
4. Pruebas extra con un script de Playwright (no versionado, en `capturas/forzado/`) sobre el
   servidor de producción, en los 10 perfiles más un móvil de 320 px, con cuatro combinaciones:
   sistema claro sin elección, sistema oscuro sin elección, **sistema claro + `theme=dark`
   guardado** y **sistema oscuro + `theme=light` guardado**. En cada una se midió: tema
   aplicado, `aria-pressed`, tamaño y posición del botón y del logo, hueco entre ambos,
   desbordamiento, icono visible, color del borde, metas `theme-color` y anillo de foco.
5. Parpadeo: carga con todos los `.js` de `/_next/static/` bloqueados (solo actúa el script en
   línea), en Chromium (Pixel 7) y WebKit (iPhone 15), con la elección contraria al sistema.
6. Modo de alto contraste (`forced-colors: active`) en Chromium, en los dos temas.

Fuera del alcance: los cambios sin confirmar que aparecieron en el árbol de trabajo durante la
auditoría (`IconButton.tsx`, `IconButton.module.css`, `eslint.config.mjs`, `src/CLAUDE.md`).
La compilación auditada (`.next/BUILD_ID`, 00:02:31) es anterior a esas ediciones (00:03:5x).
Solo tocan los estados hover y pulsado, y el hover en alto contraste; la geometría
(`size-11`, `shrink-0`) no cambia, así que las mediciones de tamaño y desbordamiento siguen
valiendo. Los nuevos colores de hover y pulsado no se han visto.

## Portada `/`: perfil × tema

| Perfil | Viewport | Claro | Oscuro | Sist. claro + `dark` guardado | Sist. oscuro + `light` guardado |
| --- | --- | --- | --- | --- | --- |
| large-desktop (Chromium) | 2560 × 1440 | OK | OK | OK | OK |
| desktop (Chromium) | 1366 × 768 | OK | OK | OK | OK |
| desktop-safari (WebKit) | 1440 × 900 | OK ¹ | OK ¹ | OK ¹ | OK ¹ |
| desktop-zoom-200 (Chromium) | 683 × 384 @2x | OK | OK | OK | OK |
| tablet-portrait (WebKit) | 768 × 1024 | OK ¹ | OK ¹ | OK ¹ | OK ¹ |
| tablet-landscape (WebKit) | 1194 × 834 | OK ¹ | OK ¹ | OK ¹ | OK ¹ |
| mobile-portrait-ios (WebKit) | 393 × 659 | OK ¹ | OK ¹ | OK ¹ | OK ¹ |
| mobile-landscape-ios (WebKit) | 734 × 343 | OK ¹ ² | OK ¹ ² | OK ¹ ² | OK ¹ ² |
| mobile-portrait-android (Chromium) | 412 × 839 | OK | OK | OK | OK |
| mobile-landscape-android (Chromium) | 863 × 360 | OK ² | OK ² | OK ² | OK ² |
| móvil 320 px (extra, Chromium) | 320 × 640 | OK | OK | OK | OK |

¹ El `h1` se pinta con peso 400 en WebKit. Es el límite conocido del WebKit de Playwright en
Windows con fuentes variables; en Chromium el mismo `h1` sale con peso 700. Queda pendiente
verificarlo en un dispositivo Apple real.
² Ver la sugerencia S2 (cabecera alta en horizontal).

### Medidas del botón de tema (iguales en las cuatro combinaciones de tema)

| Perfil | Botón | Logo (ancho) | Hueco logo → botón | Margen derecho | Alto de la cabecera |
| --- | --- | --- | --- | --- | --- |
| large-desktop | 44 × 44 | 288 | 660 px | 784 px | 139 px |
| desktop | 44 × 44 | 288 | 660 px | 187 px | 139 px |
| desktop-safari | 44 × 44 | 288 | 660 px | 224 px | 139 px |
| desktop-zoom-200 | 44 × 44 | 288 | 319 px | 16 px | 139 px |
| tablet-portrait | 44 × 44 | 288 | 404 px | 16 px | 139 px |
| tablet-landscape | 44 × 44 | 288 | 660 px | 101 px | 139 px |
| mobile-portrait-ios | 44 × 44 | 224 | 93 px | 16 px | 119 px |
| mobile-landscape-ios | 44 × 44 | 288 | 370 px | 16 px | 139 px |
| mobile-portrait-android | 44 × 44 | 224 | 112 px | 16 px | 119 px |
| mobile-landscape-android | 44 × 44 | 288 | 499 px | 16 px | 139 px |
| móvil 320 px | 44 × 44 | 224 | 20 px | 16 px | 119 px |

- El botón mide exactamente 44 × 44 en todos los perfiles, está centrado en vertical con el logo
  y no desborda (desbordamiento horizontal 0 en todo). El logo conserva siempre su ancho
  (224 o 288 px): el botón no lo empuja ni lo encoge, ni siquiera a 320 px (quedan 20 px de hueco).
- Foco con teclado (Chromium, Tab desde el principio; WebKit, foco tras pulsar una tecla):
  `:focus-visible` activo, anillo sólido de 3 px con 3 px de separación. Claro: `rgb(152, 0, 84)`;
  oscuro: `rgb(227, 191, 122)`. Se ve como doble anillo, separado del borde por la superficie
  (capturas `forzado/focus-*.png` y `forzado/*-focus.png`). En el móvil de 320 px y con zoom al
  200 % el anillo cabe dentro del viewport.
- Alto contraste: el borde pasa a color de sistema (2 px, sólido) y el anillo de foco se mantiene;
  el botón sigue siendo reconocible en los dos temas (`forzado/forced-colors-*.png`).
- Icono: luna en claro y sol en oscuro, según `data-theme` y no según el sistema, también con
  la elección forzada.

### Tema forzado y parpadeo

- Con la elección contraria al sistema, `data-theme`, `--surface` y el fondo del `body` son los
  del tema guardado **antes de que se ejecute React** (prueba con los `.js` bloqueados:
  `rgb(18, 18, 20)` con `dark` guardado y sistema claro; `rgb(236, 235, 231)` al revés, en
  Chromium y WebKit). No hay parpadeo del tema.
- Con la elección guardada aparece `meta#theme-color-override` la primera, con el color del tema
  elegido; sin elección solo están las dos metas por `media`. Correcto.
- Tras pulsar el botón el tema cambia y `aria-pressed` le sigue, en los dos sentidos.

## Hallazgos

### Bloqueantes

Ninguno.

### Sugerencias

**S1. `aria-pressed="false"` en el HTML del servidor mientras el tema activo es el oscuro**
- Perfiles: todos. Tema: oscuro (por el sistema o guardado). Captura: no se ve; es un atributo.
- Qué pasa: `useSyncExternalStore(..., () => false)` hace que el servidor siempre pinte
  `aria-pressed="false"`. Hasta que React hidrata, el botón «Tema oscuro» se anuncia como no
  pulsado aunque el tema oscuro esté activo. Se midió al terminar `load` + `document.fonts.ready`
  y, en varios perfiles (todos los WebKit; en Chromium, large-desktop y desktop con `dark`
  guardado), aún era `false`. Tras la hidratación se corrige solo (comprobado a los 2 s en
  Chromium y WebKit, en las cuatro combinaciones). Lo visual no se ve afectado, porque el icono
  depende del CSS.
- Propuesta: que el script en línea también fije `aria-pressed` en el botón, o que el botón
  se pinte sin `aria-pressed` hasta montar. Es una ventana corta, pero con red lenta y lector
  de pantalla se puede notar. Queda por oír con VoiceOver y TalkBack cómo se anuncia el
  cambio de estado al pulsar.

**S2. La cabecera ocupa el 40 % del alto en móvil horizontal**
- Perfiles: mobile-landscape-ios (734 × 343) y mobile-landscape-android (863 × 360). Temas:
  todos. Capturas: `mobile-landscape-ios/inicio-*.png`, `mobile-landscape-android/inicio-*.png`.
- Qué pasa: el logo pasa a `sm:w-72` por ancho, así que en horizontal la cabecera mide 139 px
  de 343–360. No tapa nada (no es fija) y el `h1` entra en el primer pantallazo, pero cuando la
  portada tenga contenido debajo, este quedará fuera. No es nuevo de esta rama; el botón no lo
  empeora.
- Propuesta: limitar el tamaño del logo y el `py-6` de la cabecera también por alto (por
  ejemplo, con una consulta `max-height`), para que en horizontal se quede en el tamaño del
  móvil vertical.

**S3. Hueco amplio entre logo y botón en pantalla grande**
- Perfiles: large-desktop, desktop, tablet-landscape. Captura: `large-desktop/inicio-*.png`.
- Qué pasa: con `max-w-5xl` el botón queda a 660 px del logo, solo en el extremo derecho. Es
  coherente con la columna del `h1` y no es un fallo. Cuando llegue la navegación, el hueco se
  llenará.
- Propuesta: ninguna por ahora. Revisarlo cuando la cabecera tenga navegación.

**S4. Anillo de foco del tema oscuro muy parecido al borde del botón**
- Perfiles: todos. Tema: oscuro. Captura: `forzado/focus-webkit-iphone-sys-light-saved-dark.png`.
- Qué pasa: el anillo (`rgb(227, 191, 122)`) y el borde (`rgb(217, 174, 95)`) son dos dorados
  casi iguales. El foco se distingue porque aparece un segundo anillo separado, y el cambio
  frente a la superficie oscura tiene contraste de sobra, así que cumple. Aun así, a simple
  vista se lee más como «borde doble» que como «foco».
- Propuesta: valorarlo en `design-system-reviewer`; no es una cuestión de maquetación.

## Pendiente de verificar fuera de Playwright

- Peso del `h1` (Playfair Display 700) en Safari de macOS y iOS reales.
- En iPhone horizontal real, que el botón no quede bajo la muesca (Playwright no simula las
  zonas seguras; sin `viewport-fit=cover`, Safari debería dejar el margen él solo).
- Con VoiceOver y TalkBack: que se anuncie «Tema oscuro, botón conmutador, pulsado/no pulsado»
  y que el cambio se anuncie al pulsar.
- Los estados hover y pulsado de los cambios sin confirmar de `IconButton`.

VEREDICTO: APROBADA
