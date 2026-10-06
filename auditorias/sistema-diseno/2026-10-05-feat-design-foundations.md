Commit auditado: df16d16367c46ac7f8842c78ee4043c3901666e9

# Sistema de diseño · feat/design-foundations → dev

Fecha: 2026-10-05. Diff revisado: `dev...HEAD` (commits `c58d433`, `743f345`, `0223828`,
`6d51d76` y `df16d16`).
Tercera pasada: la segunda aprobó `0223828`. Desde entonces solo hay un commit de informes
(`6d51d76`, fuera de `src/`) y un renombrado a camelCase (`df16d16`) pedido por pr-reviewer.

## Alcance

Esta PR crea el propio sistema de tokens, así que los valores escritos en `src/estilos/` son
la definición de los tokens y se dan por buenos. Lo que se audita es:

- que fuera de `src/estilos/` no haya valores sueltos;
- que la organización de `src/estilos/` sea coherente con lo que describe `src/CLAUDE.md`;
- los puntos 1 a 8 del agente sobre lo que ya existe (no hay todavía `src/componentes/ui/`).

En esta pasada, además: que el renombrado no deje referencias al nombre antiguo.
Revisión de código y diff; no se ha ejecutado build ni Playwright.

## Hallazgos bloqueantes

Ninguno.

## Cambio desde la pasada anterior: renombrado a camelCase

`git diff -M 0223828..HEAD -- src`:

- `src/estilos/tailwind-theme.css` → `src/estilos/tailwindTheme.css` (similitud 100 %, sin
  cambios de contenido).
- `src/estilos/temas/browser-theme-color.ts` → `src/estilos/temas/browserThemeColor.ts`
  (similitud 100 %, sin cambios de contenido).
- `src/app/globals.css`, línea 6: importa `../estilos/tailwindTheme.css`. El orden de
  importación no cambia.
- `src/app/layout.tsx`, línea 3: importa desde `@/estilos/temas/browserThemeColor`. El
  consumo en las líneas 37 y 38 no cambia.
- `src/CLAUDE.md`, líneas 31 y 32: la tabla usa los nombres nuevos; el texto es el mismo.

**Referencias al nombre antiguo:** `git grep` de `tailwind-theme` y `browser-theme-color` en
todo el repositorio sin contar `auditorias/` no devuelve nada (código, pruebas, configuración
ni documentación). Dentro de `auditorias/` quedan menciones en informes históricos, que
describen el estado del commit que auditaron y no se tocan. Las de este informe se han
actualizado más abajo.

## Estado de los hallazgos anteriores

### B1. Colores hex sueltos en `themeColor` — resuelto, sigue resuelto

`src/app/layout.tsx`, líneas 3, 37 y 38: sin literales; usa `BROWSER_THEME_COLOR` desde
`src/estilos/temas/browserThemeColor.ts`. `pruebas/theme.spec.ts` no cambia desde `0223828`
y no importa el archivo renombrado (compara el meta con `--surface` en el navegador), así que
el renombrado no le afecta.

### S1. Sombras por defecto de Tailwind — resuelto, sigue resuelto

`src/estilos/tailwindTheme.css`, líneas 9 y 10: `--drop-shadow-*` y `--text-shadow-*`
reiniciados.

### S2 y S3 — resueltos, siguen resueltos

`src/CLAUDE.md`, línea 31: la descripción de `tailwindTheme.css` mantiene la escala y la nota
sobre `--shadow-gloss` igual en los dos temas.

## Sugerencias (no bloqueantes, siguen abiertas)

### S4. Tokens sin consumidor todavía

- **Archivos:** `src/estilos/temas/light.css` y `dark.css` (`--icon-magenta-1` a `-3`);
  `src/estilos/tokens.css` (`--gradient-icon-gold`); `src/estilos/utilities.css`
  (`bg-action`, `bg-metal-gold`); las cinco sombras de `tailwindTheme.css`.
- **Propuesta:** en la PR del componente de icono, completar el par degradado/utilidad para
  magenta o retirar los tokens que no se usen.

### S5. Degradados de relleno sin variante `forced-colors` (vigilar en los componentes)

- **Archivo:** `src/estilos/utilities.css`.
- **Qué pasa:** `bg-action` y `bg-metal-gold` no traen variante para `forced-colors: active`.
  Bloqueará en el primer componente que las use sin un borde visible en ese modo.
- **Pendiente de verificar a mano:** con el modo de contraste alto de Windows activado.

### S6. Nota menor sobre la prueba de `theme-color`

- **Archivo:** `pruebas/theme.spec.ts`, línea 11.
- **Qué pasa:** compara cadenas; un `--surface` reescrito en otro formato equivalente daría un
  falso positivo que falla hacia el lado seguro. Basta con saberlo.

### S7 (nueva, menor). Mención desactualizada en otro informe

- **Archivo:** `auditorias/seo-geo/2026-10-05-feat-design-foundations.md`, línea 20.
- **Qué pasa:** cita `src/estilos/temas/browser-theme-color.ts`. Es un informe con su propio
  commit auditado, así que es histórico y correcto para ese commit; solo importa si esa
  auditoría se repite sobre `df16d16`. No lo toco (fuera de `auditorias/sistema-diseno/`).

## Lo que está bien

- Fuera de `src/estilos/` no hay hex, `rgb()`, `oklch()`, valores arbitrarios de Tailwind ni
  `lucide-react` (búsqueda en todo `src/` sobre `df16d16`).
- Los dos archivos renombrados conservan el contenido íntegro; ningún otro archivo de `src/`
  cambia desde `0223828`.
- `globals.css` solo importa, en el orden documentado.
- Foco con anillo sólido y `prefers-reduced-motion` global en `base.css`.
- No hay duplicación de clases ni componentes ignorados (aún no hay componentes).

VEREDICTO: APROBADA
