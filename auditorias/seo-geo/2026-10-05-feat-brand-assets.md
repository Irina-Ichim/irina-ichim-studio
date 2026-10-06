Commit auditado: d3068ef641d030d5843a9999e7e9dab4a6f584b1

# Auditoría SEO y GEO: `feat/brand-assets` → `dev`

Fecha: 2026-10-05. HTML analizado con `npm run build` y `npm run start -- -p 3200`, para cada
ruta de `pruebas/routes.ts` (hoy solo `/`) y además la 404.

## Qué se ha comprobado de lo que introduce la PR

| Elemento | Resultado servido |
| --- | --- |
| `metadataBase` | `https://irina-ichim.com`; `og:image` y `twitter:image` salen absolutas |
| Imagen social | `/marca/opengraph.png`, 200, PNG de 1200 × 630 reales (leídas de la cabecera del archivo) |
| Alternativa de la imagen | `og:image:alt` y `twitter:image:alt`; describen lo que se ve (sello dorado «Ii», nombre, fondo negro) |
| Open Graph | `og:title`, `og:description`, `og:site_name`, `og:locale` (`es_ES`), `og:type` |
| Twitter Card | `summary_large_image` con título, descripción e imagen |
| Iconos | `favicon.ico` (48 × 48), `icon.svg`, `apple-icon.png` (180 × 180): todos 200 y con el tipo correcto |
| Manifiesto | `/manifest.webmanifest`, 200, `application/manifest+json`; iconos de 192 y 512 resuelven |
| Coherencia de marca | Nombre y descripción salen de `src/contenido/site.ts` en `<title>`, metadatos, manifiesto y `<h1>`: idénticos |
| Logo de la cabecera | Enlace a `/` con nombre accesible «Irina Ichim Studio, ir al inicio» y SVG `aria-hidden`: texto de enlace descriptivo |
| `lang`, `<h1>` | `lang="es"`; un único `<h1>` sin saltos de jerarquía |

Respecto a `dev`, el título y la descripción son los mismos, y no se empeora nada.

## Hallazgos por página (de mayor a menor impacto)

### `/`

1. **Sin `og:url` ni `<link rel="canonical">`.** Ahora que existe `metadataBase`, es una línea
   (`alternates: { canonical: "/" }` y `openGraph.url`). Importa porque, sin canónica, las
   variantes con parámetros (`?utm=…`, `?ref=…`) que generan los enlaces compartidos pueden
   indexarse por separado, y algunas redes agrupan mal las comparticiones sin `og:url`. No es
   regresión: en `dev` tampoco había. Propuesta: añadirlo en esta PR o en la siguiente.
2. **El `openGraph` y el `twitter` del layout fijan título y descripción de la marca.** En Next,
   el `openGraph` de una página reemplaza entero al del layout, no se fusiona. Cuando lleguen
   páginas nuevas, si definen `title` pero no `openGraph`, compartirán vista previa con la
   portada; y si definen `openGraph` sin `images`, perderán la imagen. Importa porque un enlace
   a «Servicios» compartido en LinkedIn diría solo «Irina Ichim Studio». Propuesta: un helper en
   `src/contenido/` o `src/utilidades/` que componga los metadatos por página reutilizando
   `SOCIAL_IMAGE` (cuando haya tres páginas que lo usen), y que esta auditoría lo compruebe.
3. **Título y descripción siguen sin decir qué se ofrece ni para quién** (ya señalado en la
   ronda anterior). Ahora pesan más, porque se repiten en la tarjeta social: «Irina Ichim
   Studio: diseño y desarrollo web a medida.» (54 caracteres) deja más de 100 sin usar.
   Propuesta: con el contenido de la portada, título de hasta 60 caracteres con servicio y
   marca, y descripción con público y una afirmación verificable (por ejemplo, WCAG 2.1 AAA).
4. **La imagen social solo muestra el logo.** Es correcta y está bien descrita, pero no dice qué
   hace el estudio. Propuesta (no urgente): cuando haya lema definitivo, una línea con el
   servicio en la propia imagen, con contraste suficiente.
5. **Icono `maskable` reutiliza el de `any`.** El aro dorado llega casi al borde (radio de unos
   228 px sobre 256), fuera de la zona segura del 80 %, así que Android lo recortará en
   lanzadores circulares. No afecta a SEO; se anota por coherencia de marca. Propuesta: un
   `icon-maskable-512.png` con el sello reducido al 80 %.

### 404 (fuera de `pruebas/routes.ts`)

6. **Sigue siendo la de Next, en inglés y con dos `<title>`** («Irina Ichim Studio» y «404: This
   page could not be found.»). Con `noindex`, bien. Igual que en `dev`: no empeora. Propuesta:
   `src/app/not-found.tsx` en español con enlace a la portada.

## Pendientes para próximas PRs (prioridad de mayor a menor)

1. **Contenido real de la portada** que responda en sus primeras líneas quién es Irina, qué
   hace, para quién y dónde, con título y descripción propios (hallazgo 3).
2. **`src/app/robots.ts` y `src/app/sitemap.ts`**: `/robots.txt` y `/sitemap.xml` siguen en 404.
   Ya pueden usar `SITE.url`.
3. **Canónica y `og:url`** (hallazgo 1), si no entran en esta PR.
4. **JSON-LD**: `ProfessionalService` u `Organization` (con `logo` apuntando a un recurso ya
   servido, por ejemplo `/iconos/icon-512.png`), `Person` enlazada y `WebSite` en portada, solo
   con datos visibles.
5. **Metadatos por página sin perder la imagen social** (hallazgo 2).
6. **`llms.txt`** en la raíz (hoy 404).
7. **404 propia en español** (hallazgo 6).
8. **Señales de experiencia y autoría**: proyectos y testimonios reales y autorizados.
9. **Icono `maskable` propio** (hallazgo 5).

## Bloqueantes

Ninguno. Lo que introduce la PR (metadatos, imagen social, iconos, manifiesto) se sirve
correcto, con dimensiones reales de 1200 × 630, URLs absolutas y texto alternativo; no hay
JSON-LD, sitemap ni robots que puedan estar mal, ni contenido inventado; y nada empeora
respecto a `dev`.

VEREDICTO: APROBADA
