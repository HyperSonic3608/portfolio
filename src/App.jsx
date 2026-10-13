import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CurriculumViewer from "./components/CurriculumViewer";
import CanvasDashboard from "./components/Canvas/CanvasDashboard";
import GitHubProjects from "./components/GitHubProjects";
import SkillsGlobe from "./components/SkillsGlobe";
import { isEmailConfigured, sendPortfolioEmail } from "./services/emailService";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { isDefined } from "react-pdf/dist/shared/utils.js";
import profileImage from "../public/profile-photo.jpg";

const blades = [
  { id: "home", color: "#ca6f29", symbol: "bi-house-fill" },
  { id: "curriculum", color: "#dfa738", symbol: "bi-file-earmark-person-fill" },
  { id: "projects", color: "#8ad74b", symbol: "bi-grid-3x3-gap-fill" },
  { id: "skills", color: "#67a951", symbol: "bi-stars" },
  { id: "canvas", color: "#5287b8", symbol: "bi-calendar3" },
  { id: "experience", color: "#6899b3", symbol: "bi-briefcase-fill" },
  { id: "contact", color: "#675b9d", symbol: "bi-envelope-fill" },
];

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "";
const socialUsernames = {
  linkedin: import.meta.env.VITE_LINKEDIN_USERNAME || "",
  github: import.meta.env.VITE_GITHUB_USERNAME || "",
  instagram: import.meta.env.VITE_INSTAGRAM_USERNAME || "",
}

const socialLinks = {
  linkedin:
    "https://www.linkedin.com" +
    (isDefined(import.meta.env.VITE_LINKEDIN_USERNAME)
      ? "/in/" + import.meta.env.VITE_LINKEDIN_USERNAME
      : ""),
  github:
    "https://github.com" +
    (isDefined(import.meta.env.VITE_GITHUB_USERNAME)
      ? "/" + import.meta.env.VITE_GITHUB_USERNAME
      : ""),
  instagram:
    "https://www.instagram.com" +
    (isDefined(import.meta.env.VITE_INSTAGRAM_USERNAME)
      ? "/" + import.meta.env.VITE_INSTAGRAM_USERNAME
      : ""),
};

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div className="language-switcher">
      {[
        ["pt-BR", "PT"],
        ["en", "EN"],
        ["es", "ES"],
      ].map(([code, label]) => (
        <button
          key={code}
          className={i18n.resolvedLanguage === code ? "active" : ""}
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function App() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [message, setMessage] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const current = blades[active];

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowRight")
        setActive((value) => Math.min(blades.length - 1, value + 1));
      if (event.key === "ArrowLeft")
        setActive((value) => Math.max(0, value - 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await sendPortfolioEmail(message);
      setStatus("sent");
      setMessage({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Falha no EmailJS:", error);
      setStatus(isEmailConfigured() ? "error" : "missing");
    }
  };

  const panel = (blade) => {

    // Blade Início
    if (blade.id === "home")
      return (
        <div className="home-view">
          <div className="home-copy">
            <h1>
              Davi Emanuel
              <br />
              <em>Moreira Sollar</em>
            </h1>
            <p>{t("aboutText")}</p>
            <p className="home-secondary">{t("aboutSecond")}</p>
            <p className="home-secondary">{t("aboutThird")}</p>
            <div className="home-actions">
              <div className="home-navigation">
                <button
                  className="xbox-button"
                  onClick={() =>
                    setActive(
                      blades.findIndex((item) => item.id === "curriculum"),
                    )
                  }
                >
                  <i className="bi bi-file-earmark-person-fill" />{" "}
                  {t("homeResume")}
                </button>
                <button
                  className="xbox-button"
                  onClick={() =>
                    setActive(blades.findIndex((item) => item.id === "contact"))
                  }
                >
                  <i className="bi bi-envelope-fill" /> {t("homeContact")}
                </button>
              </div>
              <div className="social-square-list" aria-label="Redes sociais">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin" />
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <i className="bi bi-github" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="profile-photo">
            <img src={profileImage} alt="Foto de Davi"></img>
          </div>
        </div>
      );

    // Blade Currículo
    if (blade.id === "curriculum")
      return (
        <div className="feature-page">
          <h2>{t("tools.curriculum")}</h2>
          <CurriculumViewer notice={t("curriculumMissing")} />
        </div>
      );

    // Blade Porjetos
    if (blade.id === "projects")
      return (
        <div className="feature-page">
          <h2>{t("tools.github")}</h2>
          <GitHubProjects />
        </div>
      );

    // Blade Habilidades
    if (blade.id === "skills")
      return (
        <div className="feature-page">
          <h2>{t("tools.skills")}</h2>
          <SkillsGlobe hint={t("skillsHint")} />
        </div>
      );

    // Blade Agenda
    if (blade.id === "canvas")
      return (
        <div className="feature-page">
          <h2>{t("tools.canvas")}</h2>
          <CanvasDashboard initialSection="agenda" agendaOnly />
        </div>
      );

    // Blade Experiências
    if (blade.id === "experience")
      return (
        <div className="experience-view">
          <h2>
            {t("experienceTitle")} <em>{t("experienceAccent")}</em>
          </h2>
          <div className="timeline">
            {t("timeline", { returnObjects: true }).map(
              (item, timelineIndex) => (
                <div key={item}>
                  <b>
                    {timelineIndex === 0
                      ? "2026 - O MOMENTO"
                      : timelineIndex === 1
                        ? "2023 — 2025"
                        : "PRÓXIMO"}
                  </b>
                  <h3>{item}</h3>
                  <p>{t(`timelineText.${timelineIndex}`)}</p>
                </div>
              ),
            )}
          </div>
        </div>
      );

    // Blade Contato
    return (
      <div className="contact-view">
        <div className="contact-copy">
          <h2>
            {t("contactTitle")}
            <br />
            <em>{t("contactAccent")}</em>
          </h2>
          <p>{t("contactText")}</p>
          <div className="social-links" aria-label="Formas de contato">
            <a href={contactEmail ? `mailto:${contactEmail}` : ''}>
              <i className="bi bi-envelope-fill" aria-hidden="true" />
              <span>
                <b>E-MAIL</b>
                <small>{contactEmail ? contactEmail : "Configure seu e-mail de contato"}</small>
              </span>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
              <i className="bi bi-linkedin" aria-hidden="true" />
              <span>
                <b>LINKEDIN</b>
                <small>{socialUsernames.linkedin ? socialUsernames.linkedin : "Perfil profissional"}</small>
              </span>
            </a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer">
              <i className="bi bi-github" aria-hidden="true" />
              <span>
                <b>GITHUB</b>
                <small>{socialUsernames.github ? socialUsernames.github : "Código e projetos"}</small>
              </span>
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              <i className="bi bi-instagram" aria-hidden="true" />
              <span>
                <b>INSTAGRAM</b>
                <small>{socialUsernames.instagram ? socialUsernames.instagram : "Perfil pessoal"}</small>
              </span>
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>
            {t("name")}
            <input
              name="name"
              required
              value={message.name}
              onChange={(event) =>
                setMessage({ ...message, name: event.target.value })
              }
            />
          </label>
          <label>
            {t("email")}
            <input
              name="email"
              required
              type="email"
              value={message.email}
              onChange={(event) =>
                setMessage({ ...message, email: event.target.value })
              }
            />
          </label>
          <label>
            {t("message")}
            <textarea
              name="message"
              required
              rows="4"
              value={message.message}
              onChange={(event) =>
                setMessage({ ...message, message: event.target.value })
              }
            />
          </label>
          <button
            className="xbox-button"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? t("loading") : t("send")} <b>→</b>
          </button>
          {status === "sent" && <small className="sent">{t("sent")}</small>}
          {status === "missing" && (
            <small className="api-error">{t("emailMissing")}</small>
          )}
          {status === "error" && (
            <small className="api-error">
              Não foi possível enviar a mensagem.
            </small>
          )}
        </form>
      </div>
    );
  };

  const leftBlades = blades.slice(0, active + 1);
  const rightBlades = blades.slice(active + 1);
  const renderTab = (blade) => {
    const index = blades.indexOf(blade);
    return (
      <button
        className={`slider-tab ${index === active ? "active" : ""}`}
        style={{ "--blade-color": blade.color }}
        key={blade.id}
        onClick={() => setActive(index)}
      >
        <i className={`blade-icon bi ${blade.symbol}`} aria-hidden="true" />
        <b>{t(`nav.${index}`)}</b>
      </button>
    );
  };

  return (
    <div className="blades-app" style={{ "--active-color": current.color }}>
      <div className="wave wave-one" />
      <div className="wave wave-two" />
      <div className="noise" />
      <main className="slider-dashboard">
        <nav
          className="slider-tabs slider-tabs-left"
          aria-label="Blades anteriores"
        >
          {leftBlades.map(renderTab)}
        </nav>
        <div className="slider-viewport">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {blades.map((blade, index) => (
              <section
                className="slider-panel"
                style={{ "--blade-color": blade.color }}
                aria-hidden={index !== active}
                key={blade.id}
              >
                <div className="panel-topline">
                  <span>
                    {index + 1} / {blades.length}
                  </span>
                  <span>
                    {t(`nav.${index}`).toUpperCase()} {t("channel")}
                  </span>
                  <span>{t("select")}</span>
                </div>
                {index === active ? (
                  panel(blade)
                ) : (
                  <div className="inactive-panel" aria-hidden="true" />
                )}
              </section>
            ))}
          </div>
        </div>
        <nav
          className="slider-tabs slider-tabs-right"
          aria-label="Próximas Blades"
        >
          {rightBlades.map(renderTab)}
        </nav>
      </main>
      <div className="screen-controls">
        <LanguageSwitcher />
        <span>← / → NAVEGAR</span>
        <span>© 2026 DAVI SOLLAR</span>
      </div>
    </div>
  );
}

export default App;
