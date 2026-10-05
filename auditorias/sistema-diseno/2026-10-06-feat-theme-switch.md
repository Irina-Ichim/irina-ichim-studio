Commit auditado: 0063cc74a6707dd50bb220e05809ca8bbcd0fd25

# Sistema de diseño · feat/theme-switch → dev (#24)

Fecha: 2026-10-06. Diff revisado: `git diff dev...feat/theme-switch` (commits `6ea6136` y
`0063cc7`). Revisión de código y diff; no se ha ejecutado build ni Playwright. Los contrastes
se han calculado a mano con la fórmula de luminancia relativa de WCAG.

## Alcance

- Valores sueltos fuera de `src/estilos/` y valores arbitrarios de Tailwind.
- `src/componentes/ui/IconButton.tsx` frente a las reglas del neumorfismo de `src/CLAUDE.md`:
  borde 3:1, foco sólido, estados distinguibles más allá de la sombra, `forced-colors`.
- `src/componentes/estructura/ThemeToggle.tsx`, la variante `theme-dark:` y el paso de
  `@media (prefers-color-scheme: dark)` a `:root[data-theme="dark"]`.
- Coherencia de `src/CLAUDE.md` con lo implementado.

## Lo que está bien

- Sin valores sueltos: los únicos hex del diff están en `src/estilos/temas/dark.css` (mismos
  valores que en `dev`, solo cambia el selector). Sin `bg-[...]`, `shadow-[...]` ni similares.
  `THEME_SCRIPT` toma los colores de `BROWSER_THEME_COLOR`, no los repite.
- `ThemeToggle` usa `IconButton`; no hay `<button>` escrito a mano.
- Iconos Phosphor `duotone`, `aria-hidden`, desde la entrada principal en un componente de
  cliente (correcto según `src/CLAUDE.md`). Sin `lucide-react` ni SVG copiados.
- Borde de `IconButton` (`border-2 border-accent-line`): 3,95:1 en claro (`#e0007b` sobre
  `#ecebe7`) y muy por encima de 3:1 en oscuro (`#d9ae5f` sobre `#121214`). Cumple 1.4.11.
- Foco: lo da `:focus-visible` de `base.css` (anillo sólido de 3 px con `--focus`). Contraste
  holgado en los dos temas.
- Tamaño `size-11` (44 × 44 px): cumple 2.5.5 (AAA).
- Temas: todos los tokens siguen teniendo valor en claro y oscuro con los mismos nombres; no
  hay reglas de un solo tema en componentes. La variante `theme-dark:` usa `:where()`, así que
  no sube la especificidad.
- Sin movimiento nuevo: no hace falta variante de `prefers-reduced-motion`.
- Duplicación: ninguna combinación de clases nueva aparece en más de un sitio de `src/`.
- `IconButton` como componente: la justificación de tres usos (tema, abrir y cerrar menú en
  #10) es razonable y no lo cubre ningún componente existente (`src/componentes/ui/` estaba
  vacío).

## Hallazgos bloqueantes

### B1. `IconButton` sin variante para `forced-colors: active`

`src/componentes/ui/IconButton.tsx`, línea 13.

El componente lleva sombras (`shadow-raised-sm`, `active:shadow-inset-sm`) y no tiene variante
de alto contraste (punto 7). El borde sobrevive, así que el control sigue siendo reconocible,
pero en ese modo:

- el estado pulsado desaparece por completo, porque solo lo marca la sombra;
- el hover también, porque el navegador fuerza `border-color` al mismo color de sistema en
  reposo y en hover.

Propuesta: `IconButton.module.css` junto al componente (el precedente es
`Logo.module.css`), con un bloque `@media (forced-colors: active)` que use colores de sistema
para los estados, por ejemplo `border-color: Highlight` en `:hover` y `:active`. No se puede
resolver con `forced-colors:border-[Highlight]` porque sería un valor arbitrario (punto 1).
Alternativa si se prefiere no tener CSS module: una `@utility` en `src/estilos/utilities.css`
que agrupe el comportamiento de alto contraste de todos los controles, que es donde va a
repetirse cuando lleguen `Button` e inputs.

## Sugerencias

### S1. Pulsado distinguible solo por la sombra

`src/componentes/ui/IconButton.tsx`, línea 13: `active:shadow-inset-sm` es el único cambio
al pulsar. `src/CLAUDE.md` pide que hover, pulsado, foco y desactivado se distingan por algo
más que la sombra. Propuesta con tokens existentes: `active:border-ink` (o
`active:text-ink`) además del hundido.

### S2. Hover casi imperceptible en tema oscuro

Misma línea: `hover:border-link` pasa de `--accent-line` a `--link`. En claro la diferencia
es de 1,8:1 (`#e0007b` → `#980054`), visible. En oscuro es de 1,18:1 (`#d9ae5f` →
`#e3bf7a`): en la práctica no se ve. Propuesta: `hover:border-ink` (marfil sobre oro en
oscuro, onyx sobre magenta en claro), o un token nuevo `--accent-line-hover` con valor en los
dos temas si se quiere conservar el tono de acento.

### S3. Sin estado desactivado

`IconButton` acepta `disabled` (hereda las props de `<button>`) pero no tiene estilo para él,
y `--opacity-disabled` ya existe en `tokens.css`. Ninguno de los tres usos previstos lo
necesita, así que por YAGNI es aceptable dejarlo fuera, pero entonces conviene no exponer
`disabled` en el tipo (`Omit<..., "aria-label" | "disabled">`) para que nadie lo use sin
estilo. Si se mantiene, `disabled:opacity-(--opacity-disabled) disabled:cursor-not-allowed`
y quitar el hover y el pulsado en ese estado.

### S4. `className` libre en `IconButton`

`src/componentes/ui/IconButton.tsx`, línea 7: aceptar `className` permite pisar borde, color
o sombra desde fuera y es la puerta a variantes sueltas. Con tres usos idénticos no hace
falta. Propuesta: quitarlo o limitarlo a maquetación, y cuando surja una necesidad real,
añadir una prop `variant`.

### S5. `color-scheme: light` puede reactivar el oscurecimiento forzado de Chrome en Android

`src/estilos/temas/light.css`, líneas 43 a 45. Con `data-theme="light"` la raíz pasa a
declarar solo `light`. Si quien visita tiene el sistema en oscuro y elige el tema claro, la
página deja de anunciar que soporta oscuro, que es justo lo que `src/CLAUDE.md` dice que se
evita para que Chrome Android y Samsung Internet no inviertan los colores. Propuesta:
`color-scheme: only light`, que según la especificación prohíbe al navegador el oscurecimiento
forzado sin dejar los controles nativos en oscuro. Por verificar en un Android real con
«oscurecer sitios web» activado; no tengo certeza del soporte de `only` en Samsung Internet.

## Coherencia de `src/CLAUDE.md`

### D1. La línea sobre `color-scheme: light dark` ya no es cierta del todo

`src/CLAUDE.md`, sección «Temas», cuarta viñeta (línea 62 aprox.): dice que la web declara
`color-scheme: light dark`, pero ahora eso solo vale antes del script o sin JavaScript; con
`data-theme` se declara un único esquema. Conviene reescribirla junto con S5.

### D2. La variante `theme-dark:` no figura en la tabla de tokens

`src/CLAUDE.md`, fila de `tailwindTheme.css` (línea 32): describe la escala `@theme` pero no
la `@custom-variant theme-dark` que ahora vive en ese archivo. Se menciona en «Temas», pero
quien busque dónde está definida mira la tabla. Propuesta: añadir «y la variante
`theme-dark:`» a esa fila.

### D3. Matiz en «nunca `@media (prefers-color-scheme)`»

`src/CLAUDE.md`, sección «Temas», segunda viñeta. La regla es correcta para estilos, pero
`src/app/layout.tsx` (metas `theme-color`, líneas 64 y 65) y `themeScript.ts` siguen usando
la consulta, y con razón. Propuesta: precisar «en CSS y clases» para que nadie lo lea como
error en una revisión futura.

### D4. `themeScript.ts` en `src/estilos/`

No es un problema de diseño, solo de ubicación: el archivo contiene comportamiento (clave de
almacenamiento, script) además de estilos. Hay precedente con `browserThemeColor.ts` y la
tabla ya lo documenta, así que se acepta; se anota por si `estilos/` acaba acumulando lógica.

VEREDICTO: BLOQUEADA (1 hallazgos bloqueantes)
