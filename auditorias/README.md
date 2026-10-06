# Auditorías

Informes de los agentes especialistas. No son obligatorios: cada issue sugiere qué auditorías
pasar, y quien las ejecuta deja aquí su veredicto antes de fusionar la rama en `dev`.

| Carpeta | Agente | Qué revisa |
| --- | --- | --- |
| `responsive/` | `responsive-auditor` | Pantalla grande, escritorio, zoom al 200 %, tablet y móvil en vertical y horizontal, en los dos temas |
| `seo-geo/` | `seo-geo-auditor` | SEO técnico, datos estructurados y que la web se entienda y se cite en buscadores con IA |
| `ortografia/` | `spelling-reviewer` | Ortografía, gramática y estilo del texto visible |
| `sistema-diseno/` | `design-system-reviewer` | Uso de tokens y componentes, sin estilos sueltos ni duplicados |

Los informes se llaman `<AAAA-MM-DD>-<rama>.md`, con cada `/` de la rama cambiada por `-`.
Empiezan con el commit auditado y terminan con `VEREDICTO: APROBADA` o
`VEREDICTO: BLOQUEADA (n hallazgos bloqueantes)`.

Las capturas de pantalla se generan en `responsive/capturas/` y no se suben al repositorio.
