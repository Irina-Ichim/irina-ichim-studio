# Auditorías

Informes de los agentes especialistas. Cada uno deja aquí su veredicto antes de que se abra
una PR, y el agente `pr-reviewer` comprueba que estén y que aprueben.

| Carpeta | Agente | Qué revisa |
| --- | --- | --- |
| `responsive/` | `responsive-auditor` | Pantalla grande, escritorio, zoom al 200 %, tablet y móvil en vertical y horizontal, en los dos temas |
| `seo-geo/` | `seo-geo-auditor` | SEO técnico, datos estructurados y que la web se entienda y se cite en buscadores con IA |
| `ortografia/` | `spelling-reviewer` | Ortografía, gramática y estilo del texto visible |
| `sistema-diseno/` | `design-system-reviewer` | Uso de tokens y componentes, sin estilos sueltos ni duplicados |

Los informes se llaman `<AAAA-MM-DD>-<rama>.md`, empiezan con el commit auditado y terminan
con `VEREDICTO: APROBADA` o `VEREDICTO: BLOQUEADA (n hallazgos bloqueantes)`.

Las capturas de pantalla se generan en `responsive/capturas/` y no se suben al repositorio.
