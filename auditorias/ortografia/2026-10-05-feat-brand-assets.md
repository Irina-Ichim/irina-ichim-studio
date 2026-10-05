Commit auditado: cd11ef2fa69d16372b98a3671f99ceb6d5605cb2

# Ortografía y estilo: `feat/brand-assets` frente a `dev` (tercera ronda)

## Alcance

- Diff completo frente a `dev`, con atención a lo cambiado desde la ronda anterior (`d3068ef..cd11ef2`): `CLAUDE.md`, `pruebas/brand.spec.ts`, `src/app/layout.tsx` y `src/componentes/estructura/Logo.tsx`.
- Texto visible: no cambia. `Logo.tsx` deja de usar `SITE.name` como `aria-label` del SVG, que ahora queda siempre oculto con `aria-hidden`. El nombre accesible del enlace sigue siendo `SITE.homeLinkLabel` («Irina Ichim Studio, ir al inicio»), aprobado en rondas anteriores y sin cambios. En `layout.tsx` solo desaparece la propiedad `decorative`.
- Los mensajes de las aserciones y los nombres de los tests de `brand.spec.ts` son código interno en inglés: ningún visitante los ve, así que no entran.

## Sugerencias anteriores

Se ha aplicado la única sugerencia pendiente: en `CLAUDE.md:236` ahora pone «si los tokens cambian, se regeneran todos los iconos». Queda claro y está bien redactado.

## Hallazgos

Ninguno.

## Veredicto

No cambia ningún texto visible desde la ronda anterior y no hay hallazgos bloqueantes ni sugerencias nuevas.

VEREDICTO: APROBADA
