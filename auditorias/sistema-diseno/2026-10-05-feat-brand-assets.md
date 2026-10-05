Commit auditado: cd11ef2fa69d16372b98a3671f99ceb6d5605cb2

# Auditoría del sistema de diseño: `feat/brand-assets` → `dev` (tercera ronda)

Fecha: 2026-10-05. Alcance: `git diff dev...HEAD` en `src/` y `pruebas/`, con atención a `git diff d3068ef..HEAD -- src pruebas` (la ronda anterior aprobó `d3068ef`). Sin compilar.

## Resumen

| Punto | Resultado |
| --- | --- |
| 1. Valores sueltos | Sin hallazgos. El diff no añade colores, sombras, radios ni valores arbitrarios |
| 2. Duplicación | 1 sugerencia (S3, 2 sitios, no bloquea) |
| 3. Componente existente ignorado | Sin hallazgos (`src/componentes/ui/` aún no existe) |
| 4. Componentes nuevos | `Logo` más simple: solo acepta `className` y el SVG queda siempre decorativo |
| 5. Neumorfismo | No aplica: el logo no es superficie ni control |
| 6. Temas | Correcto en los dos temas; los degradados siguen leyendo los tokens |
| 7. Robustez | Correcto: `Logo.module.css` sigue cubriendo `forced-colors`; no hay movimiento |
| 8. Iconos | Sin hallazgos |

## Cerrados desde la ronda anterior

- **S4 (cerrado).** `src/componentes/estructura/Logo.tsx:26-28` genera los ids con `useId()`, así que dos logos en la misma página ya no comparten `-highlight` ni `-gold`. Quitar `idPrefix` y la variante no decorativa es coherente con YAGNI: el único uso (`src/app/layout.tsx:73`) va dentro de un enlace con `aria-label`, y el SVG con `aria-hidden` evita que el nombre se anuncie dos veces. La prueba `pruebas/brand.spec.ts:61-67` ahora lo vigila. Si algún día el logo aparece fuera de un enlace con nombre, habrá que volver a darle `role="img"` y un nombre.
- **S5 (cerrado).** `pruebas/brand.spec.ts:47` exige que cada token sea un hex de 6 dígitos antes de compararlo con `icon.svg`, con un mensaje que nombra el token. Un token borrado o en otro formato rompe la prueba en lugar de pasar en vacío.
- **`className`.** `Logo.tsx:31` monta la clase con `filter(Boolean).join(" ")` y ya no deja un espacio sobrante cuando no recibe `className`.

## Hallazgos

### S3 (sugerencia, sigue abierta). Contenedor de página repetido

- Archivos: `src/app/layout.tsx:71` (`mx-auto max-w-5xl px-4 py-6`) y `src/app/page.tsx:5` (`mx-auto max-w-5xl px-4 py-16 sm:py-24`).
- Qué pasa: `mx-auto max-w-5xl px-4` sigue en dos sitios. Dejarlo hasta el tercer uso es coherente con la regla del proyecto.
- Propuesta: crear `Container` en `src/componentes/estructura/` cuando llegue el tercer uso (el pie o la primera sección). A partir de ese momento, esta duplicación bloquea.

## Bloqueantes

Ninguno.

VEREDICTO: APROBADA
