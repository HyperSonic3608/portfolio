import { FaJava } from 'react-icons/fa'
import { SiCss, SiGithub, SiGit, SiJavascript, SiNodedotjs, SiReact, SiVite, SiC, SiCplusplus, SiHtml5, SiBootstrap, SiSpringboot, SiPython, SiMysql, SiMongodb, SiLinux, SiIntellijidea, SiFigma, SiNpm, SiVercel, SiRender, SiUnity, SiEclipseide } from 'react-icons/si'
import { TbBrandCSharp, TbBrandVscode } from 'react-icons/tb'

export const skillCategories = ['Front-end', 'Back-end', 'Jogos', 'Dados', 'Ferramentas']
export const skills = [
  // Front-end
  { name: "HTML", icon: SiHtml5, color: "#E34F26", category: "Front-end", link: "https://developer.mozilla.org/pt-BR/docs/Web/HTML" },
  { name: "CSS", icon: SiCss, color: "#663399", category: "Front-end", link: "https://developer.mozilla.org/pt-BR/docs/Web/CSS" },
  { name: "JavaScript", icon: SiJavascript, color: "#E5B800", category: "Front-end", link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" },
  { name: "React", icon: SiReact, color: "#149ECA", category: "Front-end", link: "https://react.dev/" },
  { name: "Vite", icon: SiVite, color: "#646CFF", category: "Front-end", link: "https://vite.dev/" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", category: "Front-end", link: "https://getbootstrap.com/" },

  // Back-end
  { name: "Java", icon: FaJava, color: "#E76F00", category: "Back-end", link: "https://dev.java/learn/" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F", category: "Back-end", link: "https://spring.io/projects/spring-boot" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", category: "Back-end", link: "https://nodejs.org/pt" },
  { name: "Python", icon: SiPython, color: "#3776AB", category: "Back-end", link: "https://docs.python.org/pt-br/3/" },
  { name: "C", icon: SiC, color: "#5C6BC0", category: "Back-end", link: "https://en.cppreference.com/w/c" },
  { name: "C++", icon: SiCplusplus, color: "#00599C", category: "Back-end", link: "https://en.cppreference.com/w/cpp" },
  { name: "C#", icon: TbBrandCSharp, color: "#68217A", category: "Back-end", link: "https://learn.microsoft.com/pt-br/dotnet/csharp/" },

  // Jogos
  { name: "Unity", icon: SiUnity, color: "#7c7c7c", category: "Jogos", link: "https://docs.unity.com/" },

  // Dados
  { name: "MySQL", icon: SiMysql, color: "#4479A1", category: "Dados", link: "https://dev.mysql.com/doc/" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "Dados", link: "https://www.mongodb.com/docs/" },

  // Ferramentas
  { name: "Git", icon: SiGit, color: "#F05032", category: "Ferramentas", link: "https://git-scm.com/book/pt-br/v2" },
  { name: "GitHub", icon: SiGithub, color: "#181717", category: "Ferramentas", link: "https://github.com/joaopauloaramuni" },
  { name: "Linux", icon: SiLinux, color: "#333333", category: "Ferramentas", link: "https://www.kernel.org/" },
  { name: "VS Code", icon: TbBrandVscode, color: "#007ACC", category: "Ferramentas", link: "https://code.visualstudio.com/docs" },
  { name: "IntelliJ IDEA", icon: SiIntellijidea, color: "#FE315D", category: "Ferramentas", link: "https://www.jetbrains.com/idea/" },
  { name: "Eclipse IDE", icon: SiEclipseide, color: "#2C0B6E", category: "Ferramentas", link: "https://help.eclipse.org/latest/index.jsp" },
  { name: "Figma", icon: SiFigma, color: "#A259FF", category: "Ferramentas", link: "https://help.figma.com/" },
  { name: "npm", icon: SiNpm, color: "#CB3837", category: "Ferramentas", link: "https://docs.npmjs.com/" },
  { name: "Vercel", icon: SiVercel, color: "#111111", category: "Ferramentas", link: "https://vercel.com/docs" },
  { name: "Render", icon: SiRender, color: "#1c0037", category: "Ferramentas", link: "https://render.com/docs" }
];