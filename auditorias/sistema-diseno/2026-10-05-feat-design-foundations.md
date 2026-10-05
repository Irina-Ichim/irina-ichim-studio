Commit auditado: 0223828fe079d99442d0a3c5431608b6080e0bf3

# Sistema de diseño · feat/design-foundations → dev

Fecha: 2026-10-05. Diff revisado: `dev...HEAD` (commits `c58d433`, `743f345` y `0223828`).
Segunda pasada: la anterior (sobre `743f345`) quedó bloqueada por B1.

## Alcance

Esta PR crea el propio sistema de tokens, así que los valores escritos en `src/estilos/` son
la definición de los tokens y se dan por buenos. Los valores aprobados por Irina en la tabla
del design system publicado no se revisan. Lo que se audita es:

- que fuera de `src/estilos/` no haya valores sueltos;
- que la organización de `src/estilos/` sea coherente con lo que describe `src/CLAUDE.md`;
- los puntos 1 a 8 del agente sobre lo que ya existe (no hay todavía `src/componentes/ui/`).

Revisión de código y diff; no se ha ejecutado build ni Playwright en esta pasada.

## Hallazgos bloqueantes

Ninguno.

## Estado de los hallazgos anteriores

### B1. Colores hex sueltos en `themeColor` — resuelto

- `src/app/layout.tsx`, líneas 3 y 37 a 38: ya no hay literales; importa
  `BROWSER_THEME_COLOR` desde `src/estilos/temas/browser-theme-color.ts`.
- El literal sigue duplicado respecto a `--surface` (inevitable: `<meta name="theme-color">`
  no lee `var()`), pero ahora vive dentro de `src/estilos/`, junto a los temas, con un
  comentario que remite a su original.
- `pruebas/theme.spec.ts`, líneas 5 a 12: compara el `content` de cada meta con el valor
  calculado de `--surface` en cada esquema. Es exactamente el circuito propuesto (opción 2).
  Según quien ha hecho el cambio, se verificó forzando el fallo; no lo he reejecutado.
- `src/CLAUDE.md`, línea 32: documenta el archivo y la prueba.

### S1. Sombras por defecto de Tailwind — resuelto

`src/estilos/tailwind-theme.css`, líneas 9 y 10: `--drop-shadow-*` y `--text-shadow-*`
reiniciados. La promesa de `src/CLAUDE.md` (línea 31) ya es cierta.

### S2. La tabla de `src/CLAUDE.md` no describía `tailwind-theme.css` — resuelto

`src/CLAUDE.md`, línea 31: ahora dice que el archivo contiene la escala de radios, tipografía
y sombras, además del mapeo.

### S3. `--shadow-gloss` igual en los dos temas — resuelto

Documentado como intencionado en `src/CLAUDE.md`, línea 31.

## Sugerencias (no bloqueantes, siguen abiertas)

### S4. Tokens sin consumidor todavía

- **Archivos:** `src/estilos/temas/light.css` y `dark.css` (`--icon-magenta-1` a `-3`);
  `src/estilos/tokens.css` (`--gradient-icon-gold`); `src/estilos/utilities.css`
  (`bg-action`, `bg-metal-gold`); las cinco sombras de `tailwind-theme.css`.
- **Qué pasa:** normal en una PR de cimientos. A vigilar: `--icon-magenta-*` no tiene
  degradado en `tokens.css`, a diferencia de `--icon-gold-*`, y `--gradient-icon-gold` no
  tiene utilidad.
- **Propuesta:** en la PR del componente de icono, completar el par para magenta o retirar
  los tokens que no se usen.

### S5. Degradados de relleno sin variante `forced-colors` (vigilar en los componentes)

- **Archivo:** `src/estilos/utilities.css`.
- **Qué pasa:** `text-highlight` trae su variante para `forced-colors: active`; `bg-action` y
  `bg-metal-gold` no. Hoy no bloquea porque nada las usa; bloqueará en el primer componente
  que las use sin un borde visible en ese modo.
- **Pendiente de verificar a mano:** con el modo de contraste alto de Windows activado.

### S6. Nota menor sobre la prueba de `theme-color`

- **Archivo:** `pruebas/theme.spec.ts`, línea 11.
- **Qué pasa:** compara cadenas tal como están escritas. Si alguien reescribe `--surface` en
  otro formato equivalente (`#ECEBE7` lo cubre el `toLowerCase`, pero no `rgb(236 235 231)`
  ni `#eceBe7ff`), la prueba fallará sin que haya desfase real. Es un falso positivo que
  falla hacia el lado seguro, así que basta con saberlo; no hace falta normalizar colores.

## Lo que está bien

- Fuera de `src/estilos/` no hay hex, `rgb()`, `oklch()`, valores arbitrarios de Tailwind ni
  `lucide-react` (búsqueda en todo `src/`).
- `src/app/page.tsx` usa solo tokens (`font-display`, `text-display-xl`, `text-highlight`) y
  utilidades de espaciado sin valores arbitrarios.
- Cada token de color tiene el mismo nombre en los dos temas.
- `globals.css` solo importa, en el orden documentado.
- Foco con anillo sólido y `prefers-reduced-motion` global en `base.css`.
- No hay duplicación de clases ni componentes ignorados (aún no hay componentes).

VEREDICTO: APROBADA
