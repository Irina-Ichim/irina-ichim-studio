# Portada (`/`)

Estado: **borrador, pendiente de validar por Irina**. Issue: #8.

## Para qué sirve

Es lo primero que ve casi todo el mundo. Tiene que conseguir que cualquier persona que llega
sin conocer a Irina entienda en pocos segundos qué hace y si es para ella, confíe y encuentre
cómo dar el siguiente paso. También es el mapa de la web: **cada sección presenta una página
del menú y termina con el enlace a ella.**

## Quién la lee

Profesionales y pequeños negocios, personas con una idea, pymes y empresas, startups, agencias
y quien ya tiene un proyecto que mejorar. Ninguna debe sentir que la web no es para su caso.

## Reglas comunes a todas las secciones

- Cada sección termina en su línea dorada y la siguiente empieza justo debajo (`src/CLAUDE.md`)
- Cada sección termina con su enlace «… →» (`MoreLink`) a su página del menú. Si la página aún
  no existe, el enlace se ve en color de enlace pero no lleva a ningún sitio y se anuncia como
  «próximamente»
- Voz: el estudio en plural para la oferta; Irina en primera persona para lo personal
- Sin datos inventados: si falta contenido real, la sección no se publica
- Los fondos alternan: base, superficie perla (`surface-pearl`), base…
- Los textos viven en `src/contenido/home.ts`

## Secciones

| # | Sección | Página del menú | Enlace al final | Estado |
| --- | --- | --- | --- | --- |
| 1 | Primera pantalla | Empieza aquí y Servicios | «¿No sabes por dónde empezar? Empieza aquí →» y «Ver todos los servicios →» | Hecha |
| 2 | Por qué trabajar conmigo y Soy Irina Ichim | Sobre mí | «Conóceme mejor →» | Hecha |
| 3 | Proyectos | Casos | «Ver todos los proyectos →» | Siguiente |
| 4 | Testimonios | Casos | — | Cuando haya testimonios reales con permiso |
| 5 | Equipo | Studio | «Conoce al equipo →» | Pendiente |
| 6 | Comunidad | Comunidad | «Conoce FemCoders Club →» | Pendiente |
| — | Criterio y Recursos | Criterio, Recursos | — | Solo cuando tengan contenido |
| — | Cierre | Contacto | «Hablemos» (pie) | Hecha, en el pie |

### 1. Primera pantalla

- **Función:** decir qué se hace, para quién, y dar el primer paso
- **Contenido:** etiqueta «Estudio de desarrollo digital · Barcelona», titular «Buenas ideas
  merecen un buen desarrollo.», subtítulo, «¿En qué podemos ayudarte?» con tres botones (Crear,
  Mejorar, Colaborar) que resaltan su fila en la tarjeta, «Empieza aquí →», «Hablemos de tu
  proyecto» con «La primera consulta es gratuita.» y la tarjeta animada «Lo que hacemos»;
  debajo, la franja de tecnologías y la línea dorada
- **Sin enlaces sueltos:** el enlace para programadores salió de aquí (se movió a Equipo y
  Comunidad)
- **Criterios:** cabe en una pantalla de ordenador con el menú plegado o abierto; la apertura
  dura unos diez segundos, tiene pausa y no existe con movimiento reducido

### 2. Por qué trabajar conmigo y Soy Irina Ichim

- **Función:** poner cara a quien hará el trabajo y dar razones para confiar
- **Contenido:** tres tarjetas (Sin tecnicismos, Hecho para durar, Pensado para ti) y la
  presentación de Irina en dos párrafos, con su foto; superficie perla
- **Criterios:** sin fechas, cargos ni listas de tecnologías; la foto es la definitiva antes de
  publicar en `main`

### 3. Proyectos

- **Función:** demostrar experiencia real
- **Contenido:** dos o tres proyectos (June, tu.mtch, FemCoders Club). Cada uno: necesidad,
  qué se hizo, papel de Irina (sola o con equipo) y resultado demostrable si lo hay
- **Criterios:** nada inventado; nombres y capturas solo con permiso; no atribuir a Irina sola
  lo que hizo un equipo
- **Falta de Irina:** de cada proyecto, la necesidad, su papel, resultados y permisos

### 4. Testimonios

- **Función:** que hablen otros
- **Contenido:** citas breves con nombre, cargo y empresa
- **Criterios:** solo testimonios reales con permiso escrito; sin ellos, la sección no aparece

### 5. Equipo

- **Función:** mostrar que, cuando el proyecto lo pide, hay un equipo de confianza
- **Contenido:** cómo se forman los equipos y colaboradores reales que acepten aparecer
- **Criterios:** no presentarlos como plantilla fija ni sugerir departamentos
- **Lleva también** la invitación para programadores que quieran sumarse («¿Programas y
  quieres sumarte al estudio? Escríbenos»), que salió de la primera pantalla

### 6. Comunidad

- **Función:** mostrar liderazgo e implicación con FemCoders Club
- **Contenido:** breve, con su enlace
- **Criterios:** cifras solo si son reales y actuales

## Pendiente de decidir

- Si «Studio» del menú pasa a llamarse «Equipo»
- Orden definitivo de las secciones 5 y 6
- Dónde va la invitación para programadores: en Equipo, en Comunidad o en las dos
