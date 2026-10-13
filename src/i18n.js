import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  "pt-BR": {
    translation: {
      metaTitle: "Davi Sollar — Portfólio",
      nav: [
        "início",
        "currículo",
        "projetos",
        "habilidades",
        "agenda",
        "experiência",
        "contato",
      ],
      openProjects: "ABRIR FUNCIONALIDADES",
      aboutEyebrow: "ABOUT / PERFIL",
      aboutTitle: "Construo experiências",
      aboutAccent: "com propósito.",
      aboutText:
        "Sou técnico em informática e estudante de Engenharia de Software. Este espaço reúne minha trajetória, estudos e projetos.",
      aboutSecond:
        "Desenvolvi programas e aprendi usando diversas linguagens em minha trajetória, como Java, C++ e Python, e também ferramentas de desenvolvimento como Unity, VS Code, IntelliJ IDEA e Eclipse IDE.",
      aboutThird:
        "Fui premiado em 3º lugar na mostra de trabalhos META do CEFET-MG com o meu TCC, e meu primeiro Trabalho Interdisciplinar foi certificado como Trabalho Destaque.",
      facts: ["interface", "integração", "visualização"],
      experienceEyebrow: "EXPERIENCE / TRAJETÓRIA",
      experienceTitle: "Experiências",
      experienceAccent: "e Estudos",
      contactEyebrow: "CONTACT / CONEXÃO",
      contactTitle: "Entre em",
      contactAccent: "contato",
      contactText:
        "Envie uma mensagem para iniciar uma conversa sobre tecnologia, oportunidades ou colaboração.",
      name: "NOME",
      email: "E-MAIL",
      message: "MENSAGEM",
      send: "ENVIAR",
      sent: "MENSAGEM ENVIADA",
      emailMissing: "Configure as variáveis do EmailJS para habilitar o envio.",
      channel: "BLADE",
      select: "SELECT / A OPEN",
      githubUser: "Usuário GitHub",
      search: "Buscar",
      configureGithub: "Informe o usuário GitHub em VITE_GITHUB_USERNAME.",
      canvasUnavailable:
        "Agenda Canvas indisponível. Configure a API server-side.",
      loading: "Carregando…",
      skillsHint:
        "Arraste para girar · clique numa habilidade para abrir a documentação",
      curriculumMissing:
        "Substitua os s de exemplo pelo currículo real em public/.",
      homeResume: "Ver currículo",
      homeContact: "Entre em contato",
      tools: {
        curriculum: "CURRÍCULO ",
        canvas: "AGENDA",
        github: "PROJETOS",
        skills: "HABILIDADES",
      },
      timeline: [
        "PUC Minas - Bacharelado em Engenharia de Software",
        "CEFET-MG - Curso Técnico em Informática",
        "Próximo passo",
      ],
      timelineText: [
        "Estudo contínuo de análise, modelagem, projeto, construção e teste de software.",
        "Curso técnico integrado com o ensino médio, no qual aprendi desenvolvimento e manutenção de sistemas.",
        "Experiências profissionais serão adicionadas quando fornecidas.",
      ],
    },
  },
  en: {
    translation: {
      metaTitle: "Davi Sollar — Portfolio",
      nav: [
        "home",
        "resume",
        "projects",
        "skills",
        "schedule",
        "experience",
        "contact",
      ],
      openProjects: "OPEN FEATURES",
      aboutEyebrow: "ABOUT / PROFILE",
      aboutTitle: "I build experiences",
      aboutAccent: "with purpose.",
      aboutText:
        "I am an IT technician and a Software Engineering student. This space brings together my background, studies, and projects.",
      aboutSecond:
        "Throughout my journey, I have developed programs and gained experience with various programming languages, such as Java, C++, and Python, as well as development tools like Unity, VS Code, IntelliJ IDEA, and Eclipse IDE.",
      aboutThird:
        "I won 3rd place at CEFET-MG's META Project Exhibition with my final thesis, and my first Interdisciplinary Project received the Outstanding Project certificate.",
      facts: ["interface", "integration", "visualization"],
      experienceEyebrow: "EXPERIENCE / JOURNEY",
      experienceTitle: "Experience",
      experienceAccent: "and Education",
      contactEyebrow: "CONTACT / CONNECTION",
      contactTitle: "Get in",
      contactAccent: "touch",
      contactText:
        "Send me a message to start a conversation about technology, opportunities, or collaboration.",
      name: "NAME",
      email: "EMAIL",
      message: "MESSAGE",
      send: "SEND",
      sent: "MESSAGE SENT",
      emailMissing:
        "Configure the EmailJS variables to enable message delivery.",
      channel: "BLADE",
      select: "SELECT / A OPEN",
      githubUser: "GitHub Username",
      search: "Search",
      configureGithub: "Enter the GitHub username in VITE_GITHUB_USERNAME.",
      canvasUnavailable:
        "Canvas schedule unavailable. Configure the server-side API.",
      loading: "Loading…",
      skillsHint: "Drag to rotate · click a skill to open its documentation",
      curriculumMissing:
        "Replace the sample resumes with the actual resume files in public/.",
      homeResume: "View resume",
      homeContact: "Get in touch",
      tools: {
        curriculum: "RESUME",
        canvas: "SCHEDULE",
        github: "PROJECTS",
        skills: "SKILLS",
      },
      timeline: [
        "PUC Minas - Bachelor's Degree in Software Engineering",
        "CEFET-MG - Technical Program in Information Technology",
        "Next Step",
      ],
      timelineText: [
        "Ongoing study of software analysis, modeling, design, development, and testing.",
        "Technical program integrated with high school, where I learned software development and system maintenance.",
        "Professional experience will be added when details are provided.",
      ],
    },
  },
  es: {
    translation: {
      metaTitle: "Davi Sollar — Portafolio",
      nav: [
        "inicio",
        "currículum",
        "proyectos",
        "habilidades",
        "agenda",
        "experiencia",
        "contacto",
      ],
      openProjects: "ABRIR FUNCIONALIDADES",
      aboutEyebrow: "ACERCA DE / PERFIL",
      aboutTitle: "Creo experiencias",
      aboutAccent: "con propósito.",
      aboutText:
        "Soy técnico en informática y estudiante de Ingeniería de Software. Este espacio reúne mi trayectoria, mis estudios y mis proyectos.",
      aboutSecond:
        "A lo largo de mi trayectoria, he desarrollado programas y adquirido experiencia con diversos lenguajes de programación, como Java, C++ y Python, así como con herramientas de desarrollo como Unity, VS Code, IntelliJ IDEA y Eclipse IDE.",
      aboutThird:
        "Obtuve el tercer puesto en la exposición de trabajos META del CEFET-MG con mi trabajo de fin de curso, y mi primer Proyecto Interdisciplinario recibió el certificado de Proyecto Destacado.",
      facts: ["interfaz", "integración", "visualización"],
      experienceEyebrow: "EXPERIENCIA / TRAYECTORIA",
      experienceTitle: "Experiencia",
      experienceAccent: "y Estudios",
      contactEyebrow: "CONTACTO / CONEXIÓN",
      contactTitle: "Ponte en",
      contactAccent: "contacto",
      contactText:
        "Envíame un mensaje para iniciar una conversación sobre tecnología, oportunidades o colaboración.",
      name: "NOMBRE",
      email: "CORREO ELECTRÓNICO",
      message: "MENSAJE",
      send: "ENVIAR",
      sent: "MENSAJE ENVIADO",
      emailMissing:
        "Configura las variables de EmailJS para habilitar el envío de mensajes.",
      channel: "BLADE",
      select: "SELECT / A OPEN",
      githubUser: "Usuario de GitHub",
      search: "Buscar",
      configureGithub:
        "Introduce el usuario de GitHub en VITE_GITHUB_USERNAME.",
      canvasUnavailable:
        "Agenda de Canvas no disponible. Configura la API del servidor.",
      loading: "Cargando…",
      skillsHint:
        "Arrastra para girar · haz clic en una habilidad para abrir su documentación",
      curriculumMissing:
        "Sustituye los currículums de ejemplo por el currículum real en public/.",
      homeResume: "Ver currículum",
      homeContact: "Ponte en contacto",
      tools: {
        curriculum: "CURRÍCULUM",
        canvas: "AGENDA",
        github: "PROYECTOS",
        skills: "HABILIDADES",
      },
      timeline: [
        "PUC Minas - Grado en Ingeniería de Software",
        "CEFET-MG - Formación Técnica en Informática",
        "Próximo paso",
      ],
      timelineText: [
        "Estudio continuo de análisis, modelado, diseño, desarrollo y pruebas de software.",
        "Formación técnica integrada en la educación secundaria, en la que aprendí desarrollo de software y mantenimiento de sistemas.",
        "La experiencia profesional se añadirá cuando se faciliten los datos correspondientes.",
      ],
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt-BR",
    supportedLngs: Object.keys(resources),
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "portfolio-language",
    },
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.title = i18n.t("metaTitle");
});

export default i18n;
