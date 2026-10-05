Commit auditado: d3068ef641d030d5843a9999e7e9dab4a6f584b1

# Auditoría del sistema de diseño: `feat/brand-assets` → `dev` (segunda ronda)

Fecha: 2026-10-05. Alcance: `git diff dev...HEAD` en `src/`, `pruebas/brand.spec.ts` y la sección «Imágenes y medios» de `CLAUDE.md`, con atención a los cambios desde `dd898b9` (ronda anterior, aprobada). Sin compilar.

## Resumen

| Punto | Resultado |
| --- | --- |
| 1. Valores sueltos | Sin hallazgos. `w-72` es de la escala de Tailwind. Los hex de los iconos de marca siguen siendo una excepción justificada, ahora documentada y vigilada por una prueba |
| 2. Duplicación | 1 sugerencia (S3, 2 sitios, no bloquea) |
| 3. Componente existente ignorado | Sin hallazgos (`src/componentes/ui/` aún no existe) |
| 4. Componentes nuevos | `Logo` correcto en `estructura/`; 1 sugerencia (S4) |
| 5. Neumorfismo | No aplica: el logo no es superficie ni control |
| 6. Temas | Correcto en los dos temas |
| 7. Robustez | Correcto: `Logo.module.css` cubre `forced-colors`; no hay movimiento |
| 8. Iconos | Sin hallazgos |

## Cerrados desde la ronda anterior

- **S1 (cerrado).** `CLAUDE.md` matiza que el logo adapta sus colores al tema solo dentro de la web y explica por qué los iconos y la imagen para redes llevan fijos los valores de `temas/dark.css`, qué tokens repiten y que se regeneran si cambian.
- **S2 (cerrado, con un matiz en S5).** `pruebas/brand.spec.ts:21-33` lee los tokens del tema oscuro en el navegador y comprueba que cada valor aparece en `icon.svg`. Omitir `--highlight-4` y `--metal-gold-5` es correcto: sus valores son los mismos que `--highlight-2` y `--metal-gold-1`.

## Hallazgos

### S3 (sugerencia, sigue abierta). Contenedor de página repetido

- Archivos: `src/app/layout.tsx:71` (`mx-auto max-w-5xl px-4 py-6`) y `src/app/page.tsx:5` (`mx-auto max-w-5xl px-4 py-16 sm:py-24`).
- Qué pasa: `mx-auto max-w-5xl px-4` aparece en dos sitios. Dejarlo para el tercer uso es coherente con la regla del proyecto.
- Propuesta: crear `Container` en `src/componentes/estructura/` cuando llegue el tercer uso (el pie o la primera sección). A partir de ese momento, esta duplicación bloquea.

### S4 (sugerencia, sigue abierta). IDs de degradado repetidos si hay dos logos en la misma página

- Archivo: `src/componentes/estructura/Logo.tsx:27`.
- Qué pasa: hoy solo hay un `<Logo>` (`src/app/layout.tsx:73`), así que no hay ningún fallo real y sigue siendo una sugerencia. Ser un Server Component no impide arreglarlo: `useId` es uno de los hooks que React 19 permite en Server Components, porque no usa estado ni efectos (conviene confirmarlo en la documentación de React antes de aplicarlo).
- Propuesta: cambiar el valor por defecto de `idPrefix` por `useId()` cuando entre el segundo logo (por ejemplo, en el pie). Si no, el segundo repetiría `logo-highlight` y `logo-gold`, el HTML dejaría de ser válido y tomaría los degradados del primero.

### S5 (sugerencia, nueva). La prueba de los iconos pasa sin comprobar nada si un token desaparece

- Archivo: `pruebas/brand.spec.ts:25-29`.
- Qué pasa: si se renombra o se borra un token, `getPropertyValue` devuelve `""`, y `toContain("")` se cumple siempre. La prueba seguiría en verde justo con el cambio de paleta que debe detectar.
- Propuesta: comprobar antes que cada valor no está vacío, por ejemplo, que cada `value` cumpla `/^#[0-9a-f]{6}$/` con un mensaje que nombre el token que falta. Esto además sirve de aviso si la paleta definitiva pasa a `oklch()`, porque `icon.svg` necesitaría otro formato de comparación.

## Bloqueantes

Ninguno.

VEREDICTO: APROBADA
