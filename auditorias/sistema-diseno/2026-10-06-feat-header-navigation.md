Commit auditado: 0436a943a4ffaf94763c61e60a5ca9eb63dffbea

# Auditoría del sistema de diseño: `feat/header-navigation` (#10)

Alcance: `git diff dev...feat/header-navigation`, con la búsqueda de duplicados en todo `src/`.
Fuentes de verdad: `src/estilos/`, `src/componentes/ui/` (hoy solo `IconButton`) y `src/CLAUDE.md`.

## Lo que está bien

- No hay hex, `rgb()`, `oklch()`, sombras ni degradados escritos a mano, y tampoco valores arbitrarios de Tailwind (`[...]`). Los colores salen de tokens y las sombras, de `shadow-raised-sm` (con `@apply` en los módulos).
- `RailToggle`, `ThemeToggle` y los dos botones de `MobileMenu` usan `IconButton`.
- Iconos: Phosphor duotone en todos los casos; `TalkLink` (Server Component) importa de `/ssr`. No hay `lucide-react` ni SVG copiados.
- Temas: ninguna regla existe en un solo tema. `--accent-line` cumple el 3:1 contra `--surface` en los dos (claro `#e0007b` sobre `#ecebe7`, unos 3,9:1; oscuro `#d9ae5f` sobre `#121214`, unos 9:1). La decisión de usar `border-accent-line` en vez del anillo de oro de la maqueta está justificada y la doy por buena.
- Movimiento: todas las transiciones nuevas quedan cubiertas por la regla global de `prefers-reduced-motion` de `base.css`.
- `Logo` con la variante `seal` reutiliza `LOGO_SEAL` y su bloque de `forced-colors`. Los tokens `--spacing-rail` y `--spacing-rail-collapsed`, las variantes `rail`, `rail-tall`, `narrow` y `rail-collapsed` y las utilidades `opacity-disabled` y `text-vertical` están en el archivo que les corresponde.

## Bloqueantes

### B1. La receta de control en relieve está copiada en tres sitios (puntos 2 y 7)

- `src/componentes/ui/IconButton.tsx:15`: `rounded-pill border-2 border-accent-line bg-surface … shadow-raised-sm hover:border-ink active:…`
- `src/componentes/estructura/TalkLink.tsx:11-12` (`PILL_CLASSES`): `rounded-pill border-2 border-accent-line bg-surface … shadow-raised-sm`
- `src/componentes/estructura/SiteHeader.tsx:20` (enlace de salto): `rounded-md border-2 border-accent-line bg-surface … shadow-raised-sm`

Es la misma regla del sistema (relieve más un borde de 3:1), y las copias ya se están separando:
- `TalkLink` no tiene estado de pulsado (`active:`).
- Ni `TalkLink` ni el enlace de salto tienen el bloque de `forced-colors` de `IconButton.module.css`. Con alto contraste el hover de «Hablemos» desaparece, porque `hover:border-ink` se fuerza al color del sistema.

**Propuesta:** crear un componente en `ui/`, por ejemplo `ButtonLink` o `PillLink`, que comparta la base con `IconButton` mediante una utilidad `control-raised` en `utilities.css` o una constante exportada desde `ui/`. Tendría variantes `pill`, `compact` y `skip`, y en un solo sitio los estados hover, pulsado, foco y desactivado (`aria-disabled` con `opacity-disabled`) y el bloque de `forced-colors` (`Highlight` en hover y pulsado). `TalkLink` pasaría a ser una envoltura de contenido sobre ese componente.

### B2. Botones escritos a mano existiendo `IconButton` (puntos 3 y 5)

- `src/componentes/estructura/NavLinks.tsx:114` (`.toggle`, el botón con el símbolo de flecha) y `:135` (`.close`, la X del panel)
- Los estilos de esos dos botones están en `src/componentes/estructura/NavLinks.module.css:93-111`

Los estilos repiten la forma de `IconButton` (`2.75rem`, `--radius-pill`) pero sin borde (`border: 0`), así que no hay contorno de 3:1 que indique que se pueden pulsar. Además, no tienen estado de pulsado y el hover solo cambia el color, cosa que se pierde con `forced-colors`.

**Propuesta:** añadir a `IconButton` una variante `quiet` (sin relieve, para usarla dentro de listas y paneles) que conserve el tamaño, el foco y los estados de hover y pulsado, y que en hover o pulsado muestre un borde `accent-line` o un fondo `shadow-inset-sm`, más su regla de `forced-colors`. Si el diseño necesita que el botón se lea sin borde en reposo, hay que dejarlo escrito junto al código: el texto «Páginas de…» y el icono sí tienen 7:1, pero el criterio 1.4.11 pide que se identifique el control.

### B3. Valores sueltos fuera de la escala (punto 1)

`src/componentes/estructura/NavLinks.module.css`:
- `:75`, `border-radius: 2px`: radio que no es un token. Usar `--radius-pill` (una raya de 2px redondeada queda igual) o añadir `--radius-xs`.
- `:87`, `font-size: 0.625rem` (10px, el «próximamente»): está fuera de la escala `--text-*`, que `tailwindTheme.css` vacía a propósito. Además, 10px combinados con `opacity-disabled` hacen difícil leerlo, aunque WCAG exime a los controles inactivos. Usar `text-eyebrow` o, si hace falta un tamaño menor, añadir un token `--text-caption` al sistema.
- `:210`, `font-size: 0.9rem`: lo mismo. Usar `--text-small` (0.9375rem) o `--text-label`.
- `:35-37` y `:193-194`: `letter-spacing: 0.1em` y `font-weight: 600` recomponen a mano `--text-eyebrow`, que ya trae `0.08em` y 600. La misma receta aparece en `.entry` y en `.panelTitle`. Usar `@apply text-eyebrow uppercase` y, si el tracking de 0.1em es intencionado, cambiar el token.
- `SiteHeader.module.css:44`, `letter-spacing: 0.32em`: tracking propio del texto vertical. Si es deliberado, llevarlo al token o a la utilidad `text-vertical`.
- Pesos `800`, `700` y `500` (`:64`, `:88`, `:124`, `:135`): ninguno forma parte de la escala tipográfica, que solo define pesos dentro de cada token `--text-*--font-weight`. Hay que decidir si entran como tokens o si se usa el de la escala.

### B4. Degradado sin variante de `forced-colors` (punto 7)

`src/componentes/estructura/NavLinks.module.css:67-77`: el guion de oro de la página actual (`.entry[aria-current="page"]::before`, con `background-image: var(--gradient-metal-gold)`) no tiene regla de alto contraste. Con `forced-colors` desaparece el degradado. La etiqueta sigue marcada con `Highlight`, así que no se pierde información, pero el marcador sí. **Propuesta:** dentro del bloque de `:277`, añadir `.entry[aria-current="page"]::before { forced-color-adjust: none; background: Highlight; }`, o usar `@apply bg-metal-gold` y dar a esa utilidad su propia regla de `forced-colors`, igual que `text-highlight`. Así quedarían cubiertas también `SiteHeader.module.css:22` y cualquier uso futuro.

Por verificar a mano: en `SiteHeader.module.css:94`, `background: CanvasText` sobre `::after` sin `forced-color-adjust: none` puede acabar sustituido por `Canvas` en Chromium. No lo puedo afirmar sin probarlo en Windows con alto contraste.

### B5. El enlace del logo a la portada aparece en tres sitios (punto 2)

- `src/componentes/estructura/SiteHeader.tsx:27`
- `src/componentes/estructura/SiteHeader.tsx:49`
- `src/componentes/estructura/MobileMenu.tsx:31`

Las tres copias combinan `Link href="/"`, `aria-label={SITE.homeLinkLabel}`, `rounded-md` para la forma del foco y `<Logo>`, y ya divergen entre sí (dos llevan `inline-block` y una no). **Propuesta:** crear un `HomeLink` en `estructura/` con las props `variant` (la del logo) y `onClick`.

## Sugerencias

- **S1. Panel flotante y etiqueta del menu contraído duplicados.** `NavLinks.module.css:143-157` y `:213-227` comparten `shadow-raised-sm`, el borde `accent-line`, el fondo `surface`, `z-index: 5`, `opacity: 0`, `pointer-events: none` y la transición de opacidad. Hoy son dos sitios. Conviene una clase base `.floating` en el módulo antes de que aparezca un tercero; si aparece, debería ser un `Popover` o `Tooltip` en `ui/`.
- **S2. Medidas acopladas sin token.** `SiteHeader.module.css:57` y `:94` usan `1.375rem`, que es la mitad de `size-11` de `IconButton`. En `NavLinks.module.css`, `calc(100% + 2.4rem)` y el puente de `2.6rem` (`:149`, `:167`), y luego `1.75rem` en el menú contraído, tienen que coincidir a mano. Propuesta: un token `--spacing-control` (2.75rem) del que dependan `IconButton`, `.toggle` y el `left` del botón, y una variable local `--panel-gap` que compartan el panel y su puente.
- **S3. `z-index` sin escala.** Los valores 5, 10, 11 y 50 están repartidos por tres archivos. Propuesta: tokens `--z-rail`, `--z-popover` y `--z-skip` en `tokens.css`.
- **S4. Se animan propiedades de layout.** `SiteHeader.module.css:11-13` y `:58` transicionan `width`, `padding` y `left`. `src/CLAUDE.md` pide `transform` y `opacity` salvo que haya un motivo, y no hay ningún comentario que lo dé. Además, el `pl-rail` del `body` cambia sin transición, así que el contenido salta mientras el menú se anima. O se documenta el motivo, o se quita la transición.
- **S5. `:global([data-rail="collapsed"])` repetido unas 15 veces en dos módulos.** Ya existe la variante `rail-collapsed`, y con `@reference` se puede escribir `@variant rail-collapsed { … }`. La cadena `data-rail` vive además en `railState.ts`, `tailwindTheme.css` y en los dos módulos, y si cambia en uno de ellos el menú se rompe sin avisar.
- **S6. `bg-metal-gold` ya existe.** `NavLinks.module.css:76` y `SiteHeader.module.css:22` usan `background-image: var(--gradient-metal-gold)` en vez de `@apply bg-metal-gold`. Esto enlaza con B4.
- **S7. El patrón de «enlace no disponible» aparece dos veces.** Es un `<a role="link" aria-disabled>` sin `href`, con `ink-muted` y `opacity-disabled`, en `NavLinks.tsx:183-186` y `TalkLink.tsx:20-25`. Con B1 resuelto, el estado desactivado debería ser una prop del componente de `ui/`.
- **S8. Ya existe `classNames`, pero `Logo.tsx:31` e `IconButton.tsx:13-19` siguen usando `[…].filter(Boolean).join(" ")`.** Conviene usar la utilidad en los dos.
- **S9. El fondo del menú móvil no coincide con el del lateral.** `MobileMenu.tsx:27` usa `bg-surface`, mientras que el `body` y el menú lateral usan `var(--surface-sheen), var(--surface)`. En oscuro se nota la diferencia. Propuesta: una utilidad `bg-surface-sheen` en `utilities.css`, usada en los tres sitios.
- **S10. Regla redundante.** `NavLinks.module.css:262` (`.sheet .pageEntry { letter-spacing: 0.01em }`) repite el mismo valor que `.pageEntry` (`:127`). Se puede borrar.
- **S11. Falta un hover para alto contraste en los enlaces de navegación.** `.available:hover` (`NavLinks.module.css:53`) solo cambia el color, que en `forced-colors` se fuerza a `LinkText`. Propuesta: `text-decoration: underline` en hover dentro del bloque de `forced-colors`.

## Recuento

5 bloqueantes (B1 a B5) y 11 sugerencias. B1 y B2 se resuelven juntos: una base común en `ui/` para los controles en relieve y una variante `quiet` de `IconButton`. B3 y B4 son cambios de pocas líneas. B5 es un componente pequeño en `estructura/`.

VEREDICTO: BLOQUEADA (5 hallazgos bloqueantes)
