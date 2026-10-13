# Portfólio Profissional

> Portfólio web responsivo inspirado na dashboard **Blades** do Xbox 360, criado para apresentar minha trajetória, meus projetos, as minhas habilidades e as minhas formas de contato em uma interface interativa.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=20232A" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8">
  <img src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111" alt="JavaScript">
  <img src="https://img.shields.io/badge/Status-em%20desenvolvimento-orange?style=for-the-badge" alt="Status em desenvolvimento">
</p>

---

## 📚 Índice

- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Variáveis de Ambiente](#-variáveis-de-ambiente)
  - [Instalação de Dependências](#-instalação-de-dependências)
  - [Como Executar](#-como-executar)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Testes e Validação](#-testes-e-validação)
- [Documentações e Referências](#-documentações-e-referências)
- [Autor](#-autor)
- [Agradecimentos](#-agradecimentos)

---

## 🔗 Links Úteis

- 🌐 **Demo online:** [davisollar.me](davisollar.me)
- 💻 **Repositório:** [HyperSonic3608/portfolio](https://github.com/HyperSonic3608/portfolio)

---

## 📝 Sobre o Projeto

Este projeto é meu portfólio profissional. Ele foi desenvolvido para reunir, em um único espaço, sua apresentação pessoal, formação, interesses, objetivos profissionais, experiências, competências técnicas e projetos.

A interface utiliza a metáfora visual das blades da dashboard original do Xbox 360: cada blade representa uma área do portfólio, e a navegação horizontal permite alternar entre os conteúdos. A implementação é autoral em React e CSS, usando os repositórios de referência apenas para adaptar padrões e funcionalidades.

O site também funciona como uma demonstração prática de integração de aplicações web, conectando uma interface React a:

- um visualizador de currículo em PDF;
- uma API server-side do Canvas LMS;
- a API REST e GraphQL do GitHub;
- um globo interativo de skills;
- o EmailJS para contato;
- o i18next para internacionalização.

---

## ✨ Funcionalidades Principais

- 🧭 **Navegação Blades:** troca de telas por clique e setas do teclado.
- 🏠 **Início e apresentação:** área para foto, resumo profissional, redes sociais e atalhos para currículo e contato.
- 📄 **Currículo:** visualização de PDF, zoom, troca de idioma, download e abertura do arquivo.
- 📁 **Projetos:** grade única com projetos manuais, repositórios do GitHub pessoal e repositórios da organização.
- 🔃 **Ordenação personalizada:** configuração de `displayOrder` em [`src/data/projects.json`](./src/data/projects.json).
- 🏷️ **Metadados de projetos:** origem, linguagem, tópicos, estrelas, forks, data de atualização e prévia social.
- 📅 **Agenda Canvas:** consulta server-side das disciplinas, tarefas e informações do Canvas LMS.
- 🐙 **GitHub:** leitura de repositórios por conta pessoal e organização, com tokens distintos no servidor.
- 🌐 **Internacionalização:** interface preparada para português, inglês e espanhol.
- 🌍 **Skills Globe:** globo 2D interativo com ícones, rotação, arraste e filtro de habilidades.
- ✉️ **Contato:** links para redes sociais e formulário com envio via EmailJS.
- 📱 **Responsividade:** adaptação para telas grandes, tablets e dispositivos móveis.
- 🎨 **Identidade visual:** cores inspiradas na dashboard Blades, Bootstrap Icons, fonte Exo 2 e scrollbar personalizado.

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end

- **Framework:** React `19.2.8`
- **Linguagem:** JavaScript com ES Modules
- **Build tool:** Vite `8.3.x`
- **Estilização:** CSS responsivo, `clip-path`, gradientes, canvas 2D e CSS customizado
- **Ícones:** Bootstrap Icons e React Icons
- **PDF:** `react-pdf` e PDF.js
- **Internacionalização:** `i18next`, `i18next-browser-languagedetector` e `react-i18next`
- **E-mail:** `@emailjs/browser`

### 🖥️ Back-end e integrações

- **Runtime:** Node.js para funções server-side e desenvolvimento local
- **Endpoints:** funções compatíveis com Vercel em `api/`
- **GitHub:** GitHub REST API e GraphQL API
- **Canvas:** Canvas LMS REST API
- **Cache:** cabeçalhos HTTP de cache para respostas da API do GitHub

### ⚙️ Infraestrutura e qualidade

- **Hospedagem:** Vercel
- **Controle de versão:** Git e GitHub
- **Validação:** ESLint, build de produção do Vite e verificação de sintaxe Node.js

---

## 🏗 Arquitetura

O projeto utiliza uma arquitetura de aplicação React com integrações server-side leves:

```text
Navegador
   │
   ├── React + Vite
   │    ├── App e navegação das blades
   │    ├── Componentes de currículo, Canvas, GitHub e skills
   │    ├── i18next
   │    └── Serviços HTTP
   │
   └── /api
        ├── /api/github  ── GitHub REST/GraphQL API
        └── /api/canvas  ── Canvas LMS REST API
```

### Fluxo das integrações

1. Os componentes React leem configurações públicas, como usuário do GitHub e URL do Canvas.
2. O navegador chama apenas os endpoints locais `/api/github` e `/api/canvas`.
3. As funções server-side selecionam credenciais e fazem as chamadas externas.
4. Tokens privados permanecem no servidor e não utilizam o prefixo `VITE_`.
5. Os dados retornados são normalizados pelos serviços e exibidos nos componentes das blades.

Essa separação evita expor tokens ao navegador e permite executar a mesma lógica durante `npm run dev`, `npm run preview` e em funções da Vercel.

---

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js `20` ou superior;
- npm;
- Git;
- credenciais das integrações, caso os recursos correspondentes sejam utilizados.

### 🔑 Variáveis de Ambiente

Copie o arquivo de exemplo:

```bash
copy .env.example .env.local
```

No macOS/Linux, use:

```bash
cp .env.example .env.local
```

| Variável | Exposição | Descrição |
| :--- | :--- | :--- |
| `VITE_GITHUB_USERNAME` | Pública | Usuário pessoal que será consultado. |
| `VITE_GITHUB_ORG` | Pública | Organização que será consultada. |
| `GITHUB_PERSONAL_TOKEN` | Server-side | Token opcional para a conta pessoal. |
| `GITHUB_ORG_TOKEN` | Server-side | Token opcional para a organização. |
| `GITHUB_TOKEN` | Server-side | Fallback legado para consultas GitHub. |
| `CANVAS_URL` | Server-side | URL da instância Canvas LMS. |
| `CANVAS_TOKEN` | Server-side | Token de acesso do Canvas. |
| `CANVAS_COURSES` | Server-side | Cursos que devem ser priorizados, quando aplicável. |
| `VITE_EMAILJS_SERVICE_ID` | Pública | Identificador do serviço EmailJS. |
| `VITE_EMAILJS_TEMPLATE_ID_FOR_ME` | Pública | Template de mensagem para o proprietário. |
| `VITE_EMAILJS_TEMPLATE_ID_FOR_SENDER` | Pública | Template de confirmação para o remetente. |
| `VITE_EMAILJS_PUBLIC_KEY` | Pública | Chave pública do EmailJS. |
| `VITE_CONTACT_EMAIL` | Pública | E-mail exibido na seção de contato. |
| `VITE_LINKEDIN_USERNAME` | Pública | Usuário ou identificador do LinkedIn. |
| `VITE_INSTAGRAM_USERNAME` | Pública | Usuário do Instagram. |

> [!WARNING]
> Nunca coloque tokens do GitHub ou do Canvas em variáveis com prefixo `VITE_`, nem os envie em query strings ou no código do navegador.


### 📦 Instalação de Dependências

```bash
git clone https://github.com/HyperSonic3608/portfolio.git
cd portfolio
npm install
```

### ⚡ Como Executar

Servidor de desenvolvimento:

```bash
npm run dev
```

Abra a URL exibida pelo Vite, normalmente `http://localhost:5173`.

Build de produção e preview local:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

---

## 🗂 Estrutura de Pastas

```text
.
├── api/
│   ├── _canvas.js
│   ├── _github.js
│   ├── canvas.js
│   └── github.js
├── public/
│   └── arquivos públicos, PDFs e mídias
├── src/
│   ├── components/
│   │   ├── Canvas/
│   │   ├── GitHub/
│   │   ├── CurriculumViewer.jsx
│   │   ├── GitHubProjects.jsx
│   │   └── SkillsGlobe.jsx
│   ├── config/
│   ├── data/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   ├── i18n.js
│   └── main.jsx
├── exemplos/
├── .env.example
├── LOG.md
├── PROJECT.md
├── TODO.md
├── package.json
├── vite.config.js
└── README.md
```

---


## ✅ Testes e Validação

Os comandos principais de validação são:

```bash
npm run lint
npm run build
node --check api/_github.js
node --check api/_canvas.js
git diff --check
```

O build de produção é a verificação principal de compilação. O projeto ainda não possui uma suíte automatizada de testes unitários ou end-to-end; os fluxos de integração devem ser verificados depois que as credenciais forem configuradas.

---

## 📖 Documentações e Referências

### Repositórios adaptados como funcionalidades

- [CurriculumPDF](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/CurriculumPDF)
- [CanvasAPI](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/CanvasAPI)
- [GitHubAPI](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/GitHubAPI)
- [Internacionalizacao_i18n](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/Internacionalizacao_i18n)
- [SkillsGlobe](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/SkillsGlobe)
- [SecureLoginPUC_React](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/SecureLoginPUC_React)

### Referências visuais e de navegação

- [BladesDash](https://github.com/archiecalvert/BladesDash)
- [XboxBladesSlider](https://github.com/del-Real/XboxBladesSlider)
- [Dashboard Blades do Xbox 360](https://en.wikipedia.org/wiki/Xbox_360_system_software)
- [Template de README utilizado](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md)

Os repositórios de referência não são apresentados como projetos autorais de Davi. Seus padrões foram analisados e suas funcionalidades foram adaptadas ao portfólio.

---

## 👨‍💻 Autor

**Davi Sollar**

- GitHub: [HyperSonic3608](https://github.com/HyperSonic3608)
- LinkedIn: [linkedin.com/in/davisollar](https://linkedin.com/in/davisollar).


## 🙏 Agradecimentos

- À comunidade React e Vite pelas ferramentas utilizadas na aplicação.
- Aos autores dos projetos de referência disponibilizados no repositório de desenvolvimento e integração de aplicações web.
- À comunidade que documenta a dashboard Blades e suas recriações para fins de estudo.