Commit auditado: 0436a943a4ffaf94763c61e60a5ca9eb63dffbea

# Ortografía y estilo: `feat/header-navigation` (#10)

Diff revisado: `dev...feat/header-navigation`. Textos visibles y accesibles nuevos en
`src/contenido/navigation.ts`, `src/contenido/interfaceLabels.ts` y los componentes de
`src/componentes/estructura/` (`SiteHeader`, `MobileMenu`, `NavLinks`, `RailToggle`, `TalkLink`).
Los componentes no tienen cadenas propias: todo sale de `src/contenido/`, salvo el separador
`", "` para lectores de pantalla antes de «próximamente», que es correcto.

## Hallazgos bloqueantes

Ninguno. Tildes correctas («Menú», «Empieza aquí», «Sobre mí», «Automatización», «Consultoría»,
«Páginas», «próximamente»), tuteo coherente («Empieza aquí», «Hablemos») y ninguna mayúscula
inglesa en cada palabra. El `text-transform: uppercase` de CSS conserva las tildes («SOBRE MÍ»).

## Sugerencias (no bloqueantes)

| Archivo y línea | Texto actual | Texto propuesto | Norma aplicada |
| --- | --- | --- | --- |
| `src/contenido/interfaceLabels.ts:12` | `Cerrar ${section}` → «Cerrar Servicios» | «Cerrar páginas de ${section}» → «Cerrar páginas de Servicios» | Claridad: «Cerrar Servicios» se entiende como cerrar la sección, no el panel. Además queda en paralelo con el botón que lo abre («Páginas de Servicios») |
| `src/contenido/navigation.ts:31` | «Studio» | «Estudio», o mantener «Studio» si es deliberadamente parte de la marca (Irina Ichim Studio) | Extranjerismo no adaptado con equivalente natural. Decisión de Irina |
| `src/contenido/navigation.ts:23` | «Arquitectura backend» | Se acepta tal cual en un menú para público técnico. Alternativa: «Arquitectura de servidor» | Extranjerismo crudo (Fundéu). En texto corrido iría en cursiva; en un menú la cursiva no procede |
| `src/contenido/navigation.ts:24` | «Frontend profesional» | Igual que el anterior. Alternativa: «Interfaces profesionales» | Extranjerismo crudo |
| `src/contenido/navigation.ts:22` | «Producto y MVP» | Se acepta. Si se quiere en castellano: «Producto mínimo viable» | Sigla inglesa (sin cursiva, como toda sigla). Conviene desarrollarla en la página de destino la primera vez que aparezca |

## Observaciones

- «Abrir menú», «Cerrar menú», «Saltar al contenido» y «Menú lateral» usan infinitivo como
  nombre de la acción en botones y enlaces. Es el uso de los rótulos y avisos, que la norma
  admite, y no un infinitivo por imperativo dirigido a la persona. Además es coherente en toda
  la interfaz. No se cambia.
- `aria-label="Principal"` en `<nav>`: el lector lo anuncia como «Principal, navegación».
  Correcto.
- `pagesOf` y `close` interpolan el nombre de la sección con su mayúscula inicial («Páginas de
  Servicios»). Se admite porque es el nombre de una sección de la web. Hoy solo Servicios
  tiene subpáginas; si alguna vez las tiene «Sobre mí», quedaría «Páginas de Sobre mí», que
  convendría revisar.

VEREDICTO: APROBADA
