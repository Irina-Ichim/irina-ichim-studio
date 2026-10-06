# Dónde estamos

Última actualización: 6 de octubre de 2026.

## Objetivo

En los próximos tres meses, que lleguen personas que no conocen a Irina y quieren encargarle un
trabajo, suficientes para cerrar dos o tres proyectos. La web es el sitio que convierte a esas
visitas; el resto es instrumental.

## Fase

Fase 1, frontend. Nada publicado todavía en producción.

## En curso

- **Próximamente** (#33, rama `feat/coming-soon`): página y interruptor `COMING_SOON`, más
  `noindex` en `dev`
- **Despliegue** (#19): Railway listo con `production` y `dev`
  (`web-dev-61c4.up.railway.app`). Falta pasar el DNS de `irina-ichim.com` a Cloudflare, porque
  Arsys no permite el `CNAME` en la raíz que pide Railway, y hacer la primera publicación de
  `dev` a `main` con `COMING_SOON=true`

## Esperando una decisión de Irina

- Los enlaces reales de LinkedIn, GitHub y FemCoders Club para el pie
- Los datos del aviso legal: nombre o razón social, NIF y domicilio
- «Studio» o «Estudio» como nombre de la sección del equipo
- Los textos reales de la portada (#8) y de al menos uno o dos servicios

## Lo siguiente

1. Páginas del mapa del sitio en preparación (#25): 9 secciones, las 6 páginas de Servicios y
   las 3 legales, con `noindex` hasta tener contenido
2. Cloudflare y primera publicación en `irina-ichim.com` (#19)
3. Contenido real de la portada (#8)

## Por comprobar a mano

- Alto contraste de Windows en los controles y en la barra lateral
- VoiceOver y TalkBack: tema, menú lateral, panel de Servicios y menú a pantalla completa
- Safari en un iPhone real: la muesca en horizontal, el bloqueo del scroll con el menú abierto
- Chrome en un Android real con el sistema en oscuro y la web en claro
