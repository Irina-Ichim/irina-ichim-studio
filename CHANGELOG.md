# Changelog

Los cambios de la web de Irina Ichim Studio, con el formato de
[Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/). Cada entrada cita su issue.
Lo que ya está en `dev` y todavía no ha pasado a producción (`main`) va en «Sin publicar».

## [Sin publicar]

### Añadido

- Pie de página: «¿Tienes un proyecto?» con «Hablemos», el nombre del estudio a todo lo ancho,
  enlaces a las secciones y a los servicios, Contacto, enlaces a las páginas legales (aviso
  legal, privacidad y cookies, aún en preparación) y botón para volver arriba (#11)
- Navegación: menú lateral con el logo, las 10 secciones del mapa del sitio y las 6 páginas de
  Servicios en un panel lateral, que se pliega a números y recuerda el estado; barra superior
  con «Hablemos» y menú a pantalla completa en pantallas pequeñas, y enlace para saltar al
  contenido. Las secciones sin página aún se muestran atenuadas y se anuncian como
  «próximamente» (#10)
- Selector de tema claro y oscuro: por defecto sigue al sistema, recuerda la elección y la
  aplica antes de pintar la página, sin parpadeo (#24)
- Favicon en tema claro y archivos del logo sueltos para usar fuera de la web (#23)
- Logo en trazos, favicons, iconos de app, manifiesto web e imagen para redes sociales
- Tokens de diseño, fuentes de la marca (Playfair Display, Figtree y Great Vibes) y temas claro
  y oscuro protegidos contra el modo oscuro forzado de los navegadores (#3)
- Pruebas de Playwright de responsive y de accesibilidad WCAG AAA en los dos temas, agentes
  especialistas e informes de auditoría en `auditorias/` (#2)
- Estándares del proyecto, CI (lint, tipos, build y pruebas) y control de ramas antes de abrir
  una PR (#1)
- Proyecto base con Next.js 16, React 19, TypeScript estricto y Tailwind CSS 4

### Cambiado

- El menú lateral aprovecha mejor el alto: nombres más grandes, separación que crece con la
  pantalla y más aire alrededor del botón de plegar
- Plegar y desplegar el menú lateral es ahora una transición suave: la barra, su botón y el
  contenido se mueven a la vez, los nombres se desvanecen y el logo y el sello se funden (#30)
- Las ramas de trabajo vuelven a llegar a `dev` por PR. Antes de cada PR se actualizan la
  documentación, este changelog y `NOW.md`, y los agentes se pasan solo si Irina lo decide (#27)
- Flujo de trabajo organizado por issues en el Project de GitHub (#7)
