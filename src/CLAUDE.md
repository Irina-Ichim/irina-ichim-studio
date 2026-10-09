# Frontend: sistema visual

Instrucciones para todo lo que vive en `src/`. Las generales del proyecto están en el
[`CLAUDE.md`](../CLAUDE.md) de la raíz.

## Estilo: neumorfismo con contraste real

El lenguaje visual del estudio es el neumorfismo: superficies del mismo color que el fondo,
con relieve creado por dos sombras suaves (una clara y una oscura). Es elegante, y también es
un estilo que tiende a perder contraste. Por eso se aplica con esta regla:

- **Superficies** (tarjetas, secciones, contenedores): neumorfismo pleno
- **Elementos interactivos** (botones, enlaces, inputs, controles): además del relieve, llevan
  un borde o un color de acento con contraste de 3:1 como mínimo contra el fondo (criterio
  1.4.11). Una sombra sola no basta para indicar que algo se puede pulsar
- **Estados**: hover, pulsado, foco y deshabilitado se distinguen por algo más que la sombra.
  El foco usa un anillo de color sólido, nunca solo un cambio de relieve
- **Modo de alto contraste** (`forced-colors: active`): las sombras desaparecen, así que los
  controles tienen que seguir siendo reconocibles por su borde

## Tokens

Los estilos globales viven en `src/estilos/`, un archivo por responsabilidad.
`src/app/globals.css` solo los importa, en este orden:

| Archivo | Qué contiene |
| --- | --- |
| `temas/light.css` | Valores de color del tema claro (y `color-scheme`), y la profundidad del relieve (`--relief-depth`, `--relief-rim`) |
| `temas/dark.css` | Los mismos nombres con los valores del tema oscuro, bajo `[data-theme="dark"]`. En oscuro el relieve es un 30 % más profundo y lleva un filo de luz de 1 px, porque sobre negro casi no se veía |
| `temas/themeScript.ts` | El script en línea que fija `data-theme` antes del primer pintado, y las constantes que comparte con `ThemeToggle` |
| `tokens.css` | Tokens derivados que no cambian con el tema: degradados, duraciones, opacidad |
| `tailwindTheme.css` | La escala de Tailwind (`@theme`): radios, tipografía, sombras neumórficas (el brillo `gloss` es igual en los dos temas a propósito) y los colores y fuentes que se exponen, el ancho del menú lateral (`--spacing-rail`) y las variantes propias: `theme-dark:`, `rail:` (cabe el menú lateral), `rail-tall:`, `rail-collapsed:` (menú plegado) y `narrow:` (móviles muy estrechos). Elimina los colores, sombras y tamaños por defecto de Tailwind, así que no se pueden usar valores fuera del sistema |
| `temas/browserThemeColor.ts` | El color de la barra del navegador en móvil. Repite `--surface` porque esa etiqueta no lee variables CSS; `pruebas/theme.spec.ts` falla si dejan de coincidir |
| `utilities.css` | Utilidades propias: `bg-action`, `text-highlight`, `bg-surface-sheen` y las dos recetas de control, `control-raised` y `control-quiet` |
| `base.css` | Estilos de elementos: `body`, foco, movimiento reducido |

- Cada token de color tiene valor en los dos temas, con el mismo nombre
- Un archivo que crece mucho se divide; nunca se mezclan responsabilidades en uno
- Los estilos de un componente van con el componente, no aquí
- En los componentes no se escriben colores ni sombras sueltos: se usa el token. Si falta uno,
  se añade al sistema antes que resolverlo en el componente

## Componente antes que estilo

Antes de escribir estilos, se busca un componente en `src/componentes/ui/` que ya lo resuelva.
Si existe, se usa o se le añade una variante. Si no existe y el patrón va a repetirse, se crea
el componente. Lo que nunca se hace es copiar clases o estilos de un sitio a otro. Lo vigila el
agente `design-system-reviewer`.

La referencia visual del sistema está publicada en
<https://claude.ai/artifact/7HqGq57WbW6yHsQWU53wp1>. En el código, la fuente de verdad son
`src/estilos/` y `src/componentes/ui/`.

## Temas

- Dos temas diseñados: claro (perla y onyx) y oscuro (negro brillante y marfil). Por defecto
  se sigue el del sistema operativo; quien visita puede elegir otro con `ThemeToggle`, y la
  elección se guarda en `localStorage`.
- El tema activo lo marca siempre `data-theme` en `<html>`, que pone el script en línea de
  `temas/themeScript.ts`. En CSS y en las clases, lo que cambia con el tema usa la variante
  `theme-dark:`, nunca `@media (prefers-color-scheme)`; esa consulta solo la usan las metas de
  `theme-color` y el script, que leen el sistema. Sin JavaScript se ve el tema claro (deuda
  aceptada).
- La etiqueta `<meta name="color-scheme">` declara los dos temas (`light dark`), para que Chrome
  en Android y Samsung Internet no apliquen su modo oscuro forzado e inviertan los colores. La
  propiedad CSS `color-scheme` sí sigue al tema activo, para que controles nativos y barras de
  desplazamiento cuadren con él.
- Ninguna regla de color existe en un solo tema: todo token tiene valor claro y oscuro.

## Iconos

Phosphor en peso `duotone`, con el color del token de acento.

- **En Server Components** se importan desde `@phosphor-icons/react/ssr`. La entrada principal
  usa contexto de React y obliga a `"use client"`
- **Pastilla neumórfica**: es el rasgo propio del estudio. El icono va dentro de un círculo,
  hundido en tarjetas y superficies, y en relieve o relleno de acento en los controles
- **Sin pastilla** dentro de texto corrido, listas y enlaces en línea: ahí el icono va suelto
- Decorativos con `aria-hidden="true"`. Si el icono es lo único que tiene un botón, el botón
  lleva `aria-label`

## Animaciones

- Toda animación tiene versión reducida o nula con `prefers-reduced-motion: reduce`
- No se anima `box-shadow` directamente, porque obliga a repintar en cada frame. Para el efecto
  de pulsado, se anima la `opacity` de un pseudo-elemento que lleva la sombra
- Se animan `transform` y `opacity`; el resto, solo con un motivo escrito junto al código (el
  ancho del menú lateral es una excepción así)
- Una sola duración y curva para los cambios de estado: `--default-transition-duration` y
  `--default-transition-timing-function` de `tailwindTheme.css`, las que usan las clases
  `transition-*`. Para lo breve (aparecer una etiqueta) está `--duration-fast` o `--duration-base`
- Nada se anima al cargar la página. El menú lateral solo anima a partir de la primera pulsación
  de su botón, que marca `data-rail-animate` en `<html>` (variante `rail-animate:`)
- **Excepción: la apertura de la portada** (`app/(sitio)/ServicesCard`). Se ve una vez al cargar:
  las malas prácticas flotan, se tachan y se hunden, y después «Lo que hacemos» aparece en
  relieve, se posa el sello y cruza un destello. Reglas que la hacen admisible:
  - Solo CSS, sin JavaScript: el render del servidor ya es el estado final y la animación
    empieza en el primer fotograma, sin parpadeo al hidratar
  - Dura unos diez segundos, así que lleva un control de pausa visible mientras dura
    (criterio 2.2.2) que desaparece al terminar
  - Con `prefers-reduced-motion: reduce` no hay animación, ni frases, ni control
  - Además de `transform` y `opacity`, anima `filter: blur` en la entrada de las palabras,
    `color` en el acento final (las etiquetas y una palabra por fila pasan al color de enlace
    cuando cruza el destello), ambos una vez y sobre pocos elementos, y `visibility` al
    final, para que las frases hundidas salgan también del árbol de accesibilidad
  - `pruebas/accessibility.spec.ts` espera a que terminen las animaciones antes de pasar axe

## Componentes

- Todo control interactivo usa una de las dos recetas de `utilities.css`, que ya traen sus estados
  (hover, pulsado y alto contraste): `control-raised` (en relieve, con borde de acento de 3:1) o
  `control-quiet` (solo icono, dentro de una superficie que ya lo enmarca). `IconButton` las
  ofrece como variantes `raised` y `quiet`
- En los `.module.css`, las utilidades del sistema se reutilizan con `@reference` y `@apply`, y
  los estados del menú plegado con `@variant rail-collapsed`, en vez de copiar valores
- Todo enlace a una página propia pasa por `PageLink` (`componentes/estructura/`): si la página
  aún no existe (`available: false` en `contenido/`), se pinta atenuada, sin `href` y anunciada
  como «próximamente», así ningún enlace lleva a un 404
- El menú lateral marca que está plegado con `data-rail` en `<html>`, igual que el tema: lo pone
  un script en línea (`componentes/estructura/railState.ts`) antes del primer pintado

- Server Components por defecto. `"use client"` solo cuando hace falta interacción o estado,
  y lo más abajo posible en el árbol
- HTML semántico antes que ARIA: `<button>` para acciones, `<a>` para navegar
- Dónde vive cada componente y cómo se nombra está en el `CLAUDE.md` de la raíz
