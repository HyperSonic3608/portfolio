import { useCallback, useMemo, useState } from "react";
import { FiExternalLink, FiGitBranch, FiGlobe, FiStar } from "react-icons/fi";
import projectsConfig from "../data/projects.json";
import { fetchRepos } from "../services/githubService";
import { languageColor } from "./GitHub/languageColors";
import useGitHub, { formatDate, formatNumber, visibleRepos } from "./GitHub/useGitHub";
import "./GitHub/GitHub.css";

function githubPreview(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return "";
    const [owner, repository] = parsed.pathname.split("/").filter(Boolean);
    return owner && repository
      ? `https://opengraph.githubassets.com/1/${owner}/${repository}`
      : "";
  } catch {
    return "";
  }
}

function ManualProjectCard({ project }) {
  const preview = project.image || githubPreview(project.url);

  return (
    <article className="manual-project-card">
      <div className="manual-project-media">
        {preview ? (
          <img src={preview} alt={`Prévia do projeto ${project.name}`} loading="lazy" />
        ) : (
          <div className="manual-project-placeholder">
            <i className="bi bi-image" aria-hidden="true" />
            <span>ADICIONE IMAGE OU GIF</span>
          </div>
        )}
      </div>
      <h4>{project.name}</h4>
      <p>{project.description}</p>
      <div className="gh-repo-footer">
        {project.language && (
          <span className="project-language">
            <span className="gh-dot" style={{ background: languageColor(project.language) }} />
            {project.language}
          </span>
        )}
      </div>
      {project.topics?.length > 0 && (
        <div className="project-tags">
          {project.topics.slice(0, 2).map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      )}
      <a href={project.url} target="_blank" rel="noreferrer">
        Ver projeto <i className="bi bi-arrow-up-right" aria-hidden="true" />
      </a>
    </article>
  );
}

function GitHubProjectCard({ repo, source }) {
  return (
    <article className="manual-project-card github-project-card">
      <a className="manual-project-media" href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
        {repo.previewUrl ? (
          <img src={repo.previewUrl} alt={`Prévia do projeto ${repo.name}`} loading="lazy" />
        ) : (
          <div className="manual-project-placeholder">
            <i className="bi bi-github" aria-hidden="true" />
          </div>
        )}
      </a>
      <h4>{repo.name}</h4>
      <span className="project-source">GitHub / {source}</span>
      <p>{repo.description ?? "Sem descrição."}</p>
      {repo.topics.length > 0 && (
        <div className="project-tags">
          {repo.topics.slice(0, 3).map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      )}
      <div className="gh-repo-footer">
        {repo.language && (
          <span>
            <span className="gh-dot" style={{ background: languageColor(repo.language) }} />
            {repo.language}
          </span>
        )}
        <span title="Estrelas"><FiStar aria-hidden="true" /> {formatNumber(repo.stars)}</span>
        <span title="Forks"><FiGitBranch aria-hidden="true" /> {formatNumber(repo.forks)}</span>
        <span>{formatDate(repo.pushedAt)}</span>
      </div>
      <div className="github-project-links">
        <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
          Ver projeto <FiExternalLink aria-hidden="true" />
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label={`Site do projeto ${repo.name}`}>
            <FiGlobe aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function useGitHubSource(label, username, account) {
  const fetchSourceRepos = useCallback((name, source) => fetchRepos(name, source), []);
  const { status, data } = useGitHub(fetchSourceRepos, username, account);
  return {
    label,
    status,
    repos: visibleRepos(data ?? []).map((repo) => ({
      ...repo, source: label, account, displayId: `github:${account}:${repo.name}`,
    })),
  };
}

export default function GitHubProjects() {
  const [sort, setSort] = useState("custom");
  const [language, setLanguage] = useState("");
  const personal = useGitHubSource("pessoal", import.meta.env.VITE_GITHUB_USERNAME, "personal");
  const organization = useGitHubSource("organização", import.meta.env.VITE_GITHUB_ORG, "organization");
  const sources = [personal, organization];
  const githubRepos = sources.flatMap(({ repos }) => repos);
  const languages = useMemo(
    () => [...new Set(githubRepos.map((repo) => repo.language).filter(Boolean))].sort(),
    [githubRepos]
  );
  const manualProjects = projectsConfig.projects ?? [];
  const displayOrder = projectsConfig.displayOrder ?? [];
  const allCards = [
    ...githubRepos.map((repo) => ({ type: "github", value: repo, displayId: repo.displayId })),
    ...manualProjects.map((project) => ({
      type: "manual", value: project, displayId: project.id || `manual:${project.name}`,
    })),
  ];
  const customIndex = new Map(displayOrder.map((id, index) => [id, index]));
  const filteredCards = allCards
    .filter(({ value }) => !language || value.language === language)
    .sort((a, b) => {
      if (sort === "custom") {
        const aIndex = customIndex.get(a.displayId) ?? Number.MAX_SAFE_INTEGER;
        const bIndex = customIndex.get(b.displayId) ?? Number.MAX_SAFE_INTEGER;
        return aIndex - bIndex || a.displayId.localeCompare(b.displayId);
      }
      const left = a.value;
      const right = b.value;
      return ({
      pushed: (a, b) => (b.pushedAt ?? "").localeCompare(a.pushedAt ?? ""),
      stars: (a, b) => b.stars - a.stars,
      name: (a, b) => a.name.localeCompare(b.name),
      }[sort] ?? (() => 0))(left, right);
    });
  const loading = sources.some((source) => source.status === "loading");
  const configured = sources.some((source) => source.status !== "idle");

  return (
    <div className="github-projects-view">
      <div className="projects-toolbar">
        <div className="gh-filters">
          <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Linguagem">
            <option value="">Todas as linguagens</option>
            {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar por">
            <option value="custom">Ordem personalizada</option>
            <option value="pushed">Atualizados</option>
            <option value="stars">Mais estrelas</option>
            <option value="name">Nome (A-Z)</option>
          </select>
        </div>
      </div>

      {loading && <div className="gh-message" role="status">Carregando projetos do GitHub...</div>}
      {!loading && configured && filteredCards.length === 0 && (
        <div className="gh-message" role="status">Nenhum projeto do GitHub encontrado.</div>
      )}
      <div className="manual-project-grid">
        {filteredCards.map((card) => card.type === "github"
          ? <GitHubProjectCard key={card.displayId} repo={card.value} source={card.value.source} />
          : <ManualProjectCard key={card.displayId} project={card.value} />)}
      </div>
    </div>
  );
}
