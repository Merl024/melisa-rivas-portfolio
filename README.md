# Melisa Rivas — Portafolio

Portafolio profesional de **Melisa Rivas**, estudiante de Ingeniería de Software y Negocios Digitales en la ESEN (El Salvador) y desarrolladora Full Stack orientada a **backend y QA**.

🔗 **Sitio en vivo:** https://merl024.github.io/portfolio/

## Concepto: un bug tracker

El sitio imita un tablero de seguimiento de issues, al estilo de Jira o Linear, pero limpio y fácil de leer. Cada parte del perfil usa el lenguaje del tracker:

| Sección | En el tracker |
| --- | --- |
| Perfil | Ticket principal `MEL-001` con estado, prioridad, etiquetas y asignada |
| Sobre mí | *Description* del ticket |
| Habilidades | *Components* (`COMP-01`, `COMP-02`…) |
| Proyectos | Tablero kanban con tickets `MEL-101`… y ficha técnica en un panel lateral |
| Trayectoria | *Activity log* |
| Certificaciones | *Attachments* |
| Forma de trabajo | *Workflow*: Open → In Progress → In Testing → Done |
| Contacto | Botón *Create issue* |

## Stack

- **HTML5** semántico
- **CSS3** con variables (modo claro y oscuro), Grid y Flexbox
- **JavaScript** puro (ES2020), sin frameworks ni dependencias
- Fuentes de Google Fonts: Fraunces (títulos), Inter (texto) y JetBrains Mono (IDs y metadatos)
- Publicado en **GitHub Pages**

## Funcionalidades

- **Contenido separado del código:** todo el texto vive en `js/data.js`, y `main.js` genera las secciones a partir de él.
- **Tablero de proyectos** con filtros por etiqueta (Backend, Full Stack, QA, Frontend) y un panel lateral con la ficha técnica completa. El panel se cierra con Escape, con el botón ✕ o con clic fuera, y devuelve el foco a la tarjeta que lo abrió.
- **Modo claro y oscuro:** respeta la preferencia del sistema y recuerda la elección del usuario.
- **Métricas automáticas:** el número de proyectos, pasantías y certificaciones del hero se calcula a partir de los datos.
- **Responsive:** el kanban se ve en columnas en escritorio y apilado en móvil.
- **Accesibilidad:**
  - HTML semántico y enlace "Saltar al contenido".
  - Foco visible y navegación completa con teclado.
  - `aria-pressed` en los filtros, `aria-live` para anunciar resultados y textos alternativos en las imágenes.
  - Contraste AA en ambos modos.
  - Respeta la opción del sistema de reducir movimiento.
- **SEO:** título, meta descripción, Open Graph, URL canónica y datos estructurados (JSON-LD).

## Estructura de carpetas

```
portfolio/
├── index.html          # Estructura semántica de la página y panel lateral (<dialog>)
├── css/
│   └── styles.css      # Variables de diseño, temas, componentes y responsive
├── js/
│   ├── data.js         # Todo el contenido editable del portafolio
│   └── main.js         # Render de secciones, tema, pestañas, filtros, panel y contacto
├── assets/
│   ├── favicon-64.png      # Favicon y apple-touch-icon (logo MR)
│   ├── apple-touch-icon.png
│   └── img/            # Fotos (WebP) y logo MR (PNG)
└── README.md
```

## Cómo correrlo localmente

No necesita instalación ni build.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Merl024/portfolio.git
   cd portfolio
   ```

2. Abre `index.html` en el navegador. También puedes usar un servidor local, que es lo más parecido a GitHub Pages:

   ```bash
   npx serve .
   ```

   o, con Python:

   ```bash
   python -m http.server 5500
   ```

   y visita `http://localhost:5500` (con `npx serve`, la URL que muestre la terminal). Con VS Code también funciona la extensión **Live Server**.

## Cómo actualizar el contenido

Solo hay que editar `js/data.js`. Al inicio del archivo hay una guía rápida:

- **Nuevo proyecto:** copia un objeto de `projects`, usa el siguiente ID (`MEL-106`…) y elige su columna (`column`) y sus etiquetas (`tags`).
- **Nueva experiencia:** agrégala al inicio de `activity`. Con `type: "internship"` cuenta en la métrica de pasantías.
- **Nueva certificación:** agrégala a `certifications`. Si incluyes `url`, el adjunto se vuelve un enlace.
- **CV en PDF:** guárdalo en `assets/` y escribe su ruta en `profile.cv` para mostrar el botón "Descargar CV".

## Publicación en GitHub Pages

1. Sube los archivos a la rama `main` del repositorio `portfolio`.
2. En GitHub: **Settings → Pages → Build and deployment**, elige *Deploy from a branch*, rama `main` y carpeta `/ (root)`.
3. El sitio queda en `https://merl024.github.io/portfolio/`.

Todas las rutas son relativas, así que el sitio funciona igual en local y dentro de la subcarpeta `/portfolio/`.

## Contacto

- Correo: rivasmelisa2024@gmail.com
- LinkedIn: [linkedin.com/in/melisa-rivas-](https://www.linkedin.com/in/melisa-rivas-/)
- GitHub: [Merl024](https://github.com/Merl024) · [RivasMel2024](https://github.com/RivasMel2024)
