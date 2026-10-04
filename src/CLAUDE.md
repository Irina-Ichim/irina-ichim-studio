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

- Colores, sombras, radios y duraciones se definen como custom properties en
  `src/app/globals.css` y se exponen a Tailwind con `@theme`
- Cada token tiene valor para tema claro y oscuro
- En los componentes no se escriben colores ni sombras sueltos: se usa el token. Si falta uno,
  se añade al sistema antes que resolverlo en el componente

## Componente antes que estilo

Antes de escribir estilos, se busca un componente en `src/componentes/ui/` que ya lo resuelva.
Si existe, se usa o se le añade una variante. Si no existe y el patrón va a repetirse, se crea
el componente. Lo que nunca se hace es copiar clases o estilos de un sitio a otro. Lo vigila el
agente `design-system-reviewer`.

La referencia visual del sistema está publicada en
<https://claude.ai/artifact/7HqGq57WbW6yHsQWU53wp1>. En el código, la fuente de verdad son
`src/app/globals.css` y `src/componentes/ui/`.

## Temas

- Dos temas diseñados: claro (perla y onyx) y oscuro (negro brillante y marfil). Por defecto
  se sigue el del sistema operativo.
- La web declara que soporta los dos (`color-scheme: light dark`), para que Chrome en Android
  y Samsung Internet no apliquen su modo oscuro forzado e inviertan los colores.
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
- Se animan `transform` y `opacity`; el resto, solo con un motivo

## Componentes

- Server Components por defecto. `"use client"` solo cuando hace falta interacción o estado,
  y lo más abajo posible en el árbol
- HTML semántico antes que ARIA: `<button>` para acciones, `<a>` para navegar
- Dónde vive cada componente y cómo se nombra está en el `CLAUDE.md` de la raíz
