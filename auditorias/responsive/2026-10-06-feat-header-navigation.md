Commit auditado: 0436a943a4ffaf94763c61e60a5ca9eb63dffbea

# Auditoría responsive · `feat/header-navigation` (#10)

Fecha: 2026-10-06. Alcance: portada (`/`), con foco en la navegación nueva: barra lateral
(`rail:` = `min-width: 64rem` y `min-height: 45rem`) abierta y plegada, panel de Servicios,
etiquetas flotantes de la barra plegada, botón «Menú lateral», barra superior y menú a pantalla
completa (`<dialog>`) con el desplegable de Servicios.

## Qué se ha probado

1. `pruebas/routes.ts` frente a `src/app/`: la única página es `src/app/page.tsx` → `/`, y está
   en `ROUTES`. Cobertura completa.
2. `npm run test:responsive` con compilación nueva: **60/60 en verde** (10 perfiles × 2 temas ×
   3 pruebas: sin desplazamiento horizontal, objetivos ≥ 44 × 44 px, `<main>` visible).
3. Revisión visual de las 20 capturas de `auditorias/responsive/capturas/<perfil>/`.
4. Script de Playwright propio (no versionado) sobre el servidor de producción, en los 10 perfiles
   más tres de borde: **1024 × 720** (Chromium y WebKit, el mínimo de `rail:`) y **1280 × 720 @2x**
   (un monitor de 2560 × 1440 con zoom al 200 %, que sí entra en `rail:`). En los perfiles con barra
   lateral, 10 estados por tema: abierta; hover en Servicios; foco de teclado en «Páginas de
   Servicios»; Escape; foco en «Menú lateral»; plegada; hover en 01 y en 10 (etiqueta flotante);
   hover en Servicios plegada; foco en 01 plegada; siguiente tabulación. En los perfiles con barra
   superior: barra, menú abierto, Servicios desplegado, menú desplazado hasta abajo y foco. En cada
   estado se midió desbordamiento, caja de la barra (`scrollHeight`/`clientHeight`), posición del
   botón de tema, del botón de plegado y del panel, objetivos < 44 px, controles fuera de pantalla
   y anillo de foco. ~150 capturas, revisadas las representativas de cada estado y tema.
5. Barrido de alto (720–1000 px, paso 4, ancho 1440) con la barra abierta y plegada, en Chromium
   y WebKit.
6. Orden de tabulación y destino del foco tras cerrar el panel con su X (Chromium).
7. Espaciado de texto WCAG 1.4.12 (letter-spacing 0,12 em, word-spacing 0,16 em) sobre la barra
   abierta en 1366 × 768.

Límite conocido: el WebKit de Playwright en Windows pinta Playfair con peso 400 (capturas de
`desktop-safari`, `tablet-*` y `mobile-*-ios`). No es un fallo de la web; en Chromium sale a 700.
Tampoco tabula a botones ni enlaces (como Safari sin «Acceso total al teclado»), así que el foco
de teclado solo se ha verificado en Chromium. Queda por ver en un Mac real.

## Portada `/`: perfil × tema

| Perfil | Viewport | Navegación | Claro | Oscuro |
| --- | --- | --- | --- | --- |
| large-desktop (Chromium) | 2560 × 1440 | Barra lateral (alta, con texto vertical) | OK | OK |
| desktop (Chromium) | 1366 × 768 | Barra lateral | OK | OK |
| desktop-safari (WebKit) | 1440 × 900 | Barra lateral (alta) | **Bloqueante B1** (plegada) | **Bloqueante B1** (plegada) |
| desktop-zoom-200 (Chromium) | 683 × 384 @2x | Barra superior + diálogo | OK | OK |
| tablet-portrait (WebKit) | 768 × 1024 | Barra superior + diálogo | OK | OK |
| tablet-landscape (WebKit) | 1194 × 834 | Barra lateral | OK | OK |
| mobile-portrait-ios (WebKit) | 393 × 659 | Barra superior compacta + diálogo | OK | OK |
| mobile-landscape-ios (WebKit) | 734 × 343 | Barra superior + diálogo | OK | OK |
| mobile-portrait-android (Chromium) | 412 × 839 | Barra superior compacta + diálogo | OK | OK |
| mobile-landscape-android (Chromium) | 863 × 360 | Barra superior + diálogo | OK | OK |
| extra: 1024 × 720 (Chromium y WebKit) | — | Barra lateral | OK | OK |
| extra: 1280 × 720 @2x (zoom 200 % en 1440p) | — | Barra lateral | OK | OK |

Pruebas automáticas: sin desplazamiento horizontal, objetivos ≥ 44 px y `<main>` presente en
todos los perfiles y temas, también en los estados interactivos medidos con el script.

Lo que está bien y conviene no romper:

- La condición de alto de `rail:` funciona: en 1024 × 720 y en 1280 × 720 @2x la barra abierta cabe
  entera (botón de tema en 656–700 px). Con zoom al 200 % en portátil y en móvil horizontal se pasa
  a la barra superior, como se pretendía.
- El panel de Servicios no se sale nunca de la pantalla (el más bajo acaba en 792 px con 900 de
  alto) y las etiquetas flotantes de la barra plegada tampoco; ninguna queda cortada.
- La barra superior no es fija: en móvil horizontal ocupa el 27–29 % del alto (98 px de 343–360),
  pero se va al desplazar, así que no roba alto de forma permanente.
- El diálogo se desplaza dentro de sí mismo en horizontal (931 px de contenido en 343–360) y no
  desborda en ancho en ningún perfil.
- El foco es visible (anillo sólido de 3 px, magenta en claro y oro en oscuro) en el botón de
  plegado, en «Páginas de Servicios», en 01 y en la X del panel.
- Los dos temas se comportan igual; no hay texto ilegible ni bordes que desaparezcan.

## Hallazgos

### B1 · Bloqueante · La barra plegada deja el botón de tema fuera de la pantalla entre 896 y ~930 px de alto

- **Perfil:** desktop-safari (1440 × 900), los dos temas. Reproducido también en Chromium.
- **Captura:** `shots/desktop-safari/05-rail-collapsed-{light,dark}.png` del script (solo asoma el
  borde superior del botón, a 887–931 px con 900 de alto).
- **Qué pasa:** a partir de 56rem (896 px) se activa `rail-tall:` y aparece el texto vertical
  «IRINA ICHIM STUDIO». Plegada, `.railTop` suma además `padding-bottom: 3.25rem` y la lista baja a
  867 px. Con el botón de tema (44 px) y el hueco, el contenido mide 931 px y la barra es `fixed`
  sin `overflow`, así que lo que sobra no se puede alcanzar con el ratón ni desplazando. El barrido
  da fallo en **896–928 px** en los dos motores; abierta no falla. Son altos de ventana reales
  (1440 × 900 a pantalla completa, 1920 × 1080 con la barra del navegador, 2560 × 1440 al 150 %).
  El botón sigue en el orden de tabulación, así que con teclado se activa sin verse: contenido
  inaccesible con el ratón y foco fuera de la vista.
- **Propuesta:** que el umbral de `rail-tall:` cubra también la barra plegada (subirlo a ~59rem,
  o quitar el texto vertical cuando está plegada), o recortar el `padding-bottom` de 3.25rem.
  Como red, `overflow-y: auto` en `.rail` para que nunca quede nada inalcanzable. Merece una prueba
  en `navigation.spec.ts` que pliegue la barra en 1440 × 900 y compruebe que el botón de tema está
  en la ventana: el `responsive.spec` actual solo mira la barra abierta.

### I1 · Importante · Al cerrar el panel con su X en la barra plegada, el foco se queda en un botón invisible

- **Perfil:** cualquiera con barra lateral, plegada (comprobado en desktop, Chromium), los dos temas.
- **Captura:** `shots/desktop/10-rail-collapsed-next-tab-light.png` (estado previo: foco en la X).
- **Qué pasa:** plegada, «Páginas de Servicios» tiene `display: none` y el enlace «Servicios» no
  es enfocable (es un `<a>` sin `href` por estar «próximamente»). Al pulsar la X, `dismiss()` intenta
  devolver el foco al botón (oculto) y después al enlace (no enfocable), así que el foco se queda en
  la X, que pasa a `opacity: 0` con el panel por la clase `.dismissed`. El foco existe pero no se ve
  (WCAG 2.4.7). Desde ahí, Tab salta al botón de tema.
- **Propuesta:** si ni el botón ni el enlace pueden recibir el foco, llevarlo al siguiente elemento
  visible (o a la `<nav>` con `tabIndex={-1}`). También se arreglaría si el enlace de sección pudiera
  enfocarse cuando tenga página. No lo he clasificado como bloqueante porque no hay texto cortado ni
  contenido inalcanzable, pero falla un criterio AA: yo lo arreglaría antes de fusionar.

### S1 · Sugerencia · La barra abierta va justa de ancho: sin margen para textos más largos ni para el espaciado de texto

- **Perfil:** barra lateral abierta (desktop, Chromium y WebKit).
- **Captura:** `shots/desktop/03-rail-open-services-keyboard-light.png` y
  `shots/text-spacing-desktop.png`.
- **Qué pasa:** «SERVICIOS próximamente» acaba en 225,6 px y el botón de la flecha empieza en
  229,6: el anillo de foco (3 px + 3 de separación) tapa la última letra. Con el espaciado de WCAG
  1.4.12, «EMPIEZA AQUÍ próximamente» llega a 262 px de 264 (toca la línea dorada) y la flecha de
  Servicios queda encima de la línea. Hoy no se corta nada, pero `.label` lleva `white-space: nowrap`,
  así que el siguiente texto un poco más largo se saldrá de la barra.
- **Propuesta:** ganar margen (ensanchar `--spacing-rail` ~1rem o reducir el `gap` entre número y
  nombre) y dejar que «próximamente» pase a la línea siguiente si no cabe, en vez de `nowrap`.

### S2 · Sugerencia · En el menú a pantalla completa, la X no acompaña al desplazamiento en móvil horizontal

- **Perfil:** mobile-landscape-ios y mobile-landscape-android, desktop-zoom-200, los dos temas.
- **Captura:** `shots/mobile-landscape-ios/04-sheet-services-bottom-light.png`.
- **Qué pasa:** con Servicios desplegado, el diálogo mide 931 px en 343–360 de alto. Al bajar, la
  cabecera con la X se va con el resto, y en táctil no hay Escape: para cerrar hay que volver arriba.
- **Propuesta:** cabecera del diálogo `sticky` con el fondo de superficie. En horizontal, además,
  el logo de 160 px y el `gap-8` podrían reducirse con una variante por alto.

### S3 · Sugerencia · La raya de la página actual se corta en el borde izquierdo del menú en móvil

- **Perfil:** mobile-portrait-ios y mobile-portrait-android, los dos temas.
- **Captura:** `shots/mobile-portrait-android/03-sheet-services-light.png`.
- **Qué pasa:** el marcador dorado de «01 INICIO» va a `left: -1.5rem` y el diálogo tiene 20 px de
  padding, así que empieza en −4 px y se corta contra el borde. En la barra lateral pasa lo mismo,
  pero ahí apoya en el borde y no se nota.
- **Propuesta:** en `.sheet`, `left: -1.25rem` o 4 px más de padding a la izquierda.

### S4 · Sugerencia · «Hablemos» en móvil vertical es solo una flecha en un círculo

- **Perfil:** mobile-portrait-ios y mobile-portrait-android.
- **Captura:** `capturas/mobile-portrait-*/inicio-*.png`.
- **Qué pasa:** con `narrow:` el texto pasa a `sr-only` y queda un círculo con una flecha junto a la
  hamburguesa. Para un lector de pantalla está bien nombrado, pero a la vista no se entiende qué hace.
  Hoy, además, está deshabilitado («próximamente»). No es un fallo de maquetación; lo dejo para
  decidir.
- **Propuesta:** a partir de ~360 px cabe «Hablemos» si el logo baja a `w-36`. Si no, un icono de
  conversación comunica más que la flecha.

### S5 · Sugerencia · Orden de foco del botón de plegado

- **Perfil:** barra lateral, Chromium.
- **Qué pasa:** el orden es Saltar → logo → 01 → Páginas de Servicios → (X del panel) → Tema →
  **Menú lateral**. El botón de plegado se ve arriba, entre el logo y la lista, pero es el último en
  recibir el foco (en el DOM va después de la barra). No incumple 2.4.3 de forma clara, pero
  sorprende.
- **Propuesta:** colocarlo en el DOM justo después del logo y mantener la posición con CSS.

### S6 · Sugerencia · El panel de Servicios tapa el titular mientras está abierto

- **Perfil:** desktop y 1024 × 720, los dos temas.
- **Captura:** `shots/desktop/02-rail-open-services-hover-dark.png`.
- **Qué pasa:** el panel abierto (top 214 px) tapa la mitad inferior del `<h1>`. Es lo normal en un
  panel flotante y se cierra al salir con el ratón, así que no es grave. Con el hero real conviene
  volver a mirarlo: si hay un CTA a esa altura, puede quedar debajo mientras se exploran los servicios.

## Por verificar en dispositivo real

- Safari en macOS con «Acceso total al teclado»: foco en la flecha de Servicios, en la X del panel
  y en el botón de plegado (el WebKit de Playwright no tabula a botones).
- Peso de Playfair en Safari (límite conocido del WebKit de Windows).
- iOS real: bloqueo de desplazamiento del fondo con el diálogo abierto (`html:has(dialog[open])`) y
  la altura `h-dvh` al aparecer y desaparecer la barra de Safari.

VEREDICTO: BLOQUEADA (1 hallazgo bloqueante)
