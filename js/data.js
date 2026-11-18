window.PORTFOLIO = {

  profile: {
    id: "MEL-001",
    name: "Melisa Rivas",
    fullName: "Melisa Eugenia Rivas Linares",
    tags: ["Backend", "QA", "Designer UI", "Frontend"],
    summary:
      "Estudiante de Ingeniería de Software y Negocios Digitales en la ESEN, con experiencia en QA y desarrollo gracias a pasantías y proyectos académicos. Me apasiona construir software confiable y centrado en el usuario.",
    location: "San Salvador, El Salvador",
    languages: "Español (nativo) · Inglés (profesional)",
    graduation: "2028",
    photo: {
      src: "assets/img/melisa-retrato.webp",
      alt: "Retrato de Melisa Rivas sonriendo, con lentes y camisa negra.",
      position: "48% 30%",
      width: 1600,
      height: 1139,
    },
    cv: "",
  },

  about: {
    paragraphs: [
      "Descubrí mi interés por QA cuando me tocó escribir documentación de sistemas y manuales de usuario. Para hacerlo bien, tuve que leer el backlog del producto y entender cómo vivía el sistema el usuario. Ahí aprendí a pensar como él y a anticipar los problemas que podría encontrar.",
      "Hoy combino el desarrollo de software con QA, y me aseguro de que lo que construyo funcione bien antes de que llegue al usuario.",
    ],
    photo: {
      src: "assets/img/melisa-esen.webp",
      alt: "Melisa Rivas sonriendo en el campus de la ESEN, junto a un muro terracota y un jardín.",
      caption: "ESEN · Campus",
      width: 960,
      height: 1280,
    },
  },

  skills: [
    {
      group: "Backend",
      items: ["Node.js", "Express", "APIs REST", "JWT", "Passport", "Python", "Patrón MVC"],
    },
    {
      group: "Bases de datos",
      items: ["MongoDB", "Mongoose", "PostgreSQL", "Firebase", "Modelado relacional y normalización"],
    },
    {
      group: "Frontend",
      items: [
        "JavaScript",
        "React",
        "Vite",
        "Astro",
        "Tailwind CSS",
        "Zustand",
        "HTML",
        "CSS",
      ],
    },
    {
      group: "Móvil",
      items: ["Flutter"],
    },
    {
      group: "Testing y QA",
      items: [
        "Diseño de casos de prueba",
        "Pruebas manuales",
        "Reporte de defectos",
        "Validación de UI contra diseños en Figma",
        "Mocha",
        "Chai",
        "Supertest",
        "Documentación con Swagger",
      ],
    },
    {
      group: "Herramientas",
      items: ["Git", "GitHub", "Docker", "Docker Compose", "Docker Hub", "Figma"],
    },
    {
      group: "Colaboración",
      items: [
        "Scrum",
        "Metodologías ágiles",
        "Liderazgo de equipos",
        "Logística y operaciones de eventos",
        "Comunicación",
      ],
    },
  ],

  board: {
    filters: ["Backend", "Full Stack", "QA", "Frontend"],
    columns: [
      { id: "fullstack", title: "Full Stack" },
      { id: "backend", title: "Backend & QA" },
      { id: "frontend", title: "Frontend" },
    ],
  },

  projects: [
    {
      id: "MEL-101",
      title: "SvShop",
      summary:
        "E-commerce con un monolito modular y un microservicio de órdenes, cada uno con su base de datos, orquestados con Docker Compose.",
      status: "Done",
      column: "fullstack",
      tags: ["Full Stack", "Backend"],
      role: "Arquitecta de software y Scrum Master. Diseñé la arquitectura del sistema, definí qué componentes formarían el monolito y cuáles el microservicio, distribuí las tareas del equipo según sus responsabilidades y di seguimiento al cronograma.",
      tech: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Zustand",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Nodemailer",
        "Docker",
        "Docker Compose",
      ],
      duration: "5 semanas (marzo a abril de 2026)",
      participation: "Aproximadamente 75 % (equipo de 5 personas).",
      challenges:
        "El mayor reto fue diseñar la arquitectura de la base de datos y la comunicación entre servicios. El sistema combina un monolito modular (autenticación, usuarios, productos, carrito, checkout y facturas) con un microservicio de órdenes que tiene su propia conexión a MongoDB. Definí qué datos pertenecían a cada servicio y cómo se comunicaban por HTTP mediante endpoints internos, por ejemplo para validar el stock y actualizar el estado de las facturas al crear una orden.",
      links: [
        { label: "Repositorio", url: "https://github.com/RivasMel2024/svshop_arquitectura" },
      ],
    },
    {
      id: "MEL-102",
      title: "CuponX",
      summary:
        "Plataforma de cupones con autenticación JWT, control de acceso por roles y recuperación de contraseñas por correo.",
      featured: true,
      status: "Done",
      column: "fullstack",
      tags: ["Full Stack", "Backend"],
      role: "Desarrolladora backend, responsable completa de la autenticación, la recuperación de contraseñas, el envío de correos y los permisos por rol. También creé la estructura inicial del proyecto y su documentación, e implementé la gestión de estados de los cupones (en espera, aprobada, rechazada y descartada).",
      tech: [
        "React",
        "Vite",
        "React Bootstrap",
        "Node.js",
        "Express",
        "PostgreSQL",
        "JWT",
        "bcrypt",
        "Nodemailer",
        "Resend",
      ],
      duration: "2.5 meses (febrero a abril de 2026)",
      participation: "Aproximadamente 20 % (equipo de 5 personas).",
      challenges:
        "El sistema tenía endpoints sin verificación de permisos, por lo que un usuario sin privilegios podía acceder al dashboard de administrador con solo llamar al endpoint. Implementé autenticación con JWT y control de acceso por roles, tanto en las rutas del backend como en la navegación del frontend, para que cada usuario solo pudiera acceder a lo que su rol permite. Además, desarrollé el flujo de recuperación de contraseñas con envío de correos.",
      note: "Reconocido como proyecto destacable en la ESEN.",
      links: [{ label: "Repositorio", url: "https://github.com/RivasMel2024/cuponx" }],
    },
    {
      id: "MEL-103",
      title: "API de adopciones con testing",
      summary:
        "API REST de adopciones con pruebas de integración, documentación en Swagger e imagen publicada en Docker Hub.",
      status: "Done",
      column: "backend",
      tags: ["Backend", "QA"],
      role: "Desarrolladora individual.",
      tech: [
        "Node.js",
        "Express",
        "MongoDB Atlas",
        "Mongoose",
        "JWT",
        "bcrypt",
        "Mocha",
        "Chai",
        "Supertest",
        "Faker",
        "Swagger",
        "Docker",
      ],
      duration: "3 meses (2025)",
      participation: "100 %",
      challenges:
        "Pruebas de integración de los flujos de adopción con peticiones HTTP reales, generación de datos de prueba con Faker, documentación de endpoints con Swagger y publicación de la imagen en Docker Hub.",
      links: [
        {
          label: "Repositorio",
          url: "https://github.com/Merl024/entregas_backend3/tree/master/entrega_final",
        },
        { label: "Imagen Docker", url: "https://hub.docker.com/r/merl024/entrega_final" },
      ],
    },
    {
      id: "MEL-104",
      title: "E-commerce con arquitectura en capas",
      summary:
        "Backend de e-commerce con arquitectura en capas (DAO, DTO, Repository y servicios) y autenticación con Passport y JWT.",
      status: "Done",
      column: "backend",
      tags: ["Backend"],
      role: "Desarrolladora individual.",
      tech: [
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "Passport",
        "JWT",
        "Handlebars",
        "WebSockets",
        "Nodemailer",
      ],
      duration: "3 meses (2025)",
      participation: "100 %",
      challenges:
        "Arquitectura en capas con DAO, DTO, Repository y servicios; autenticación y autorización con Passport y JWT.",
      links: [
        { label: "Repositorio", url: "https://github.com/Merl024/entrega_final_backendII" },
      ],
    },
    {
      id: "MEL-105",
      title: "turismoX",
      summary:
        "Sitio de turismo que muestra atracciones y actividades de forma dinámica desde Firebase, con modales de detalle.",
      status: "Done",
      column: "frontend",
      tags: ["Frontend"],
      role: "Desarrolladora frontend. Desarrollé la sección de atracciones y actividades, con modales de detalle y diseño responsive, y el servicio que obtiene las atracciones desde Firebase. También apoyé en las secciones de tarifas, contacto y \"Quiénes somos\".",
      tech: ["HTML", "CSS", "JavaScript", "Firebase"],
      duration: "7 semanas (septiembre a noviembre de 2025)",
      participation: "Aproximadamente 33 % (equipo de 5 personas).",
      challenges:
        "Mostrar las atracciones de forma dinámica a partir de los datos almacenados en Firebase, con vistas de detalle en modales y un diseño que se adaptara bien a cualquier pantalla.",
      links: [
        { label: "Repositorio", url: "https://github.com/ChristianRende22/Turimox" },
        { label: "Demo", url: "https://christianrende22.github.io/Turimox/" },
      ],
    },
    {
      id: "MEL-106",
      title: "Ambar Studio",
      summary:
        "Plataforma web multi-clínica para clínicas dentales, que moderniza el sistema de escritorio Dental Smiling.",
      featured: true,
      status: "In Progress",
      column: "backend",
      tags: ["Backend", "QA"],
      role: "Desarrolladora backend. Responsable de los módulos de parámetros por clínica, operación clínica básica y expediente clínico avanzado.",
      tech: ["FastAPI", "SQLAlchemy 2.0", "Alembic", "MySQL", "JWT", "bcrypt", "Docker", "pytest"],
      duration: "Julio a agosto de 2026 (backend).",
      participation: "3 de 7 módulos del backend (equipo de 2 personas).",
      challenges:
        "Migrar las entidades del sistema legacy en PyQt6 a una API REST multi-clínica, con aislamiento obligatorio de los datos por clínica en cada endpoint. Diseñé los modelos y migraciones con Alembic para especialidades, consultorios y la configuración de cada clínica (horarios, métodos de pago, impuestos y numeración de facturas), con endpoints CRUD protegidos por clínica. Implementé la operación clínica (pacientes, odontólogos y citas) y el expediente clínico avanzado (diagnósticos, odontogramas, planes de tratamiento y recetas). Trabajé con desarrollo guiado por pruebas (TDD) usando pytest, y documenté dos fallas de infraestructura detectadas al cerrar el Módulo 3: la falta de un seed del superadmin y un healthcheck de MySQL en Docker Compose que hacía fallar las migraciones.",
      note: "Evolución de Dental Smiling, nominado a Proyecto Destacado · Reconociendo tu Pasión, ESEN 2025",
      links: [
        { label: "Repositorio", url: "https://github.com/ChristianRende22/Ambar-Studio" },
      ],
    },
  ],

  activity: [
    {
      type: "internship",
      org: "C3 · Competitive Coding Club",
      role: "Frontend Developer & QA",
      summary: "Frontend con Astro y QA de la landing de la Copa Salvadoreña de Programación 2026.",
      mode: "Pasantía remota",
      dates: "Abr 2026 – May 2026",
      description:
        "Desarrollé secciones del frontend de la landing de la Copa Salvadoreña de Programación 2026 con Astro y validé la interfaz como QA, entregando a tiempo para habilitar los registros del evento.",
      highlights: [
        "Validé la implementación contra los diseños de Figma y documenté casi dos páginas de inconsistencias de UI antes del lanzamiento; todas se resolvieron.",
        "Hice QA manual de tres formularios de registro (18 a 21 campos cada uno) y encontré problemas de validación en siete campos, documentados para el equipo de desarrollo.",
      ],
    },
    {
      type: "internship",
      org: "Credicomer Sociedad de Ahorro y Crédito",
      role: "Quality Assurance Tester",
      summary: "Casos de prueba, pruebas manuales y reporte de defectos antes de cada despliegue.",
      mode: "Pasantía presencial",
      dates: "Dic 2025 – Ene 2026",
      description:
        "Diseñé casos de prueba para nuevas funcionalidades, ejecuté pruebas manuales en escritorio y Android, reporté defectos críticos antes del despliegue y elaboré documentación de sistemas y manuales de usuario a partir del backlog del producto.",
      highlights: [
        "Documenté defectos de forma clara y consistente, y trabajé con los desarrolladores para asegurar que se pudieran reproducir y resolver.",
      ],
    },
    {
      type: "education",
      org: "ESEN",
      role: "Ingeniería de Software y Negocios Digitales",
      summary: "Ingeniería de Software y Negocios Digitales.",
      mode: "Educación",
      dates: "Ene 2024 – Nov 2028",
      description: "",
    },
  ],

  certifications: [
    { issuer: "Coderhouse", name: "Backend III: Testing y Escalabilidad", year: "2025" },
    { issuer: "Coderhouse", name: "Backend II: Diseño y Arquitectura", year: "2025" },
    { issuer: "Coderhouse", name: "Backend I: Desarrollo Avanzado", year: "2024" },
    { issuer: "Coderhouse", name: "JavaScript · Top 10 de la generación", year: "2023" },
    { issuer: "Coderhouse", name: "Desarrollo Web", year: "2023" },
  ],

  workflow: [
    { state: "Open", description: "Entender el problema y al usuario." },
    { state: "In Progress", description: "Diseñar y desarrollar." },
    { state: "In Testing", description: "Probar como lo haría el usuario." },
    { state: "Done", description: "Documentar y entregar." },
  ],

  contact: {
    title: "¿Tienes un bug? Abre un issue.",
    text: "Escríbeme, que yo le doy seguimiento.",
    email: "rivasmelisa2024@gmail.com",
    emailSubject: "Oportunidad para Melisa Rivas",
    emailBody: [
      "Hola, Melisa:",
      "",
      "Tipo: Oportunidad laboral",
      "Empresa:",
      "Puesto:",
      "Descripción:",
    ],
    photo: {
      src: "assets/img/melisa-formal.webp",
      alt: "Melisa Rivas con blazer negro frente a un edificio de la ESEN.",
      caption: "Asignada · Melisa Rivas",
      width: 960,
      height: 1280,
    },
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/melisa-rivas-/" },
      { label: "GitHub personal", url: "https://github.com/Merl024" },
      { label: "GitHub académico", url: "https://github.com/RivasMel2024" },
    ],
  },
};
