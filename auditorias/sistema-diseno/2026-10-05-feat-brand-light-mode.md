Commit auditado: 7b6a26a3e41deac1611b1bb03440570cb81df297

# Auditoría del sistema de diseño: feat/brand-light-mode (#23)

Rama destino: `dev`. Alcance: `src/app/icon.svg`, `public/marca/logo-{light,dark}.{svg,png}`,
`pruebas/brand.spec.ts` y la sección «Imágenes y medios» de `CLAUDE.md`. Sin compilar.

## Coincidencia con los tokens

| Recurso | Fondo | Highlight 1–5 | Metal gold 1–5 | Ink / ink-muted | Resultado |
| --- | --- | --- | --- | --- | --- |
| `icon.svg`, tema claro | `#ecebe7` = `--surface` | coinciden con `light.css` en orden y offsets | coinciden | — | Correcto |
| `icon.svg`, tema oscuro (`@media (prefers-color-scheme:dark)`) | `#121214` = `--surface` | coinciden con `dark.css` | coinciden | — | Correcto |
| `logo-light.svg` | transparente | coinciden con `light.css` | coinciden | `#353839` / `#404344` = `--ink` / `--ink-muted` | Correcto |
| `logo-dark.svg` | transparente | coinciden con `dark.css` | coinciden | `#f1ece1` / `#c9c3b6` = `--ink` / `--ink-muted` | Correcto |

Los offsets de los degradados (0 / 0.35 / 0.6 / 0.8 / 1 y 0 / 0.28 / 0.5 / 0.72 / 1) y su
dirección coinciden con `Logo.tsx`. La geometría de los dos logos (`viewBox`, sello y los cuatro
trazados) es idéntica a `src/componentes/estructura/logoPaths.ts`, y cada trazado lleva el
mismo relleno que en el componente. Los PNG son RGBA de 1600 × 507 (transparentes, misma
proporción que el `viewBox`); sus colores no se pueden comprobar sin rasterizar.

## Hallazgos

### 1. Hex escritos fuera de `src/estilos/`: excepción justificada (no bloqueante)

- `src/app/icon.svg:1`, `public/marca/logo-light.svg:1`, `public/marca/logo-dark.svg:1`.
- Son recursos que se ven fuera de la web (pestaña, documentos, correo), donde no hay variables
  CSS. La excepción está documentada en `CLAUDE.md` («Imágenes y medios») y `icon.svg` la
  protege `pruebas/brand.spec.ts`. No cuenta como valor suelto del punto 1.

### 2. La prueba de marca no cubre los logos nuevos (sugerencia)

- `pruebas/brand.spec.ts:37-52`: solo compara `icon.svg`. `logo-light.svg` y `logo-dark.svg`
  pueden desincronizarse de `light.css` / `dark.css` sin que falle nada, aunque `CLAUDE.md:246`
  dice que al cambiar los tokens «se regeneran todos los recursos de marca».
- Propuesta: añadir al mismo bucle por tema la lectura de `/marca/logo-<tema>.svg` y comprobar
  que contiene `--highlight-*`, `--metal-gold-*`, `--ink` y `--ink-muted` de ese tema.

### 3. La lista de tokens de la prueba omite `--highlight-4` y `--metal-gold-5` (sugerencia)

- `pruebas/brand.spec.ts:43`: hoy pasan de rebote porque valen lo mismo que `--highlight-2` /
  `--highlight-5` y `--metal-gold-1` (claro) o `--metal-gold-1` (oscuro). Si cambian, la prueba
  no lo detecta.
- Propuesta: incluir los diez tokens de degradado. La prueba solo comprueba presencia, no a qué
  bloque pertenece cada valor; hoy basta porque ningún valor se comparte entre temas.

### 4. Cuatro copias de los degradados de marca sin generador en el repositorio (sugerencia)

- Los mismos stops viven en `Logo.tsx` (con tokens), `icon.svg` y los dos logos (escritos a
  mano). No hay script de generación en el repo, así que «regenerar» depende de un proceso fuera
  de él. No es duplicación de clases ni de estilos de componente (punto 2), por eso no bloquea.
- Propuesta: un script en desarrollo que lea `temas/*.css` y `logoPaths.ts` y escriba los SVG;
  o, como mínimo, la ampliación de la prueba del hallazgo 2.

### 5. Sello sin relleno en los logos exportados (observación)

- `public/marca/logo-*.svg:1`: el `<circle>` lleva `fill="none"`; en la web lleva
  `fill-surface`. Es coherente con un PNG/SVG transparente para colocar sobre otros fondos; se
  deja anotado por si se quiere una variante con el fondo del tema.

## Puntos sin incidencias

- Componentes ui ignorados, componentes nuevos, neumorfismo, iconos Phosphor: no aplican (no hay
  cambios en `src/componentes/` ni en estilos).
- Temas: `icon.svg` trae los dos temas; los logos cubren claro y oscuro por separado.
- `forced-colors` / `prefers-reduced-motion`: no aplican a recursos que se pintan fuera del DOM
  de la página y sin movimiento. `Logo.module.css` ya tiene su variante `forced-colors`.

VEREDICTO: APROBADA
