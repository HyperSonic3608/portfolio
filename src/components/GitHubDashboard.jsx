import { useEffect, useState } from 'react'

export default function GitHubDashboard({ configured, configureMessage, searchLabel, loading }) {
  const [username, setUsername] = useState(configured)
  const [input, setInput] = useState(configured)
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    if (!username) return undefined
    let active = true
    Promise.all([fetch(`https://api.github.com/users/${username}`).then((r) => { if (!r.ok) throw new Error('Perfil não encontrado'); return r.json() }), fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`).then((r) => r.json())])
      .then(([user, repositories]) => { if (active) { setProfile(user); setRepos(Array.isArray(repositories) ? repositories : []) } }).catch((reason) => active && setError(reason.message))
    return () => { active = false }
  }, [username])
  if (!configured) return <div className="real-widget api-state"><strong>GitHub API</strong><p>{configureMessage}</p></div>
  return <div className="real-widget github-widget"><form className="inline-search" onSubmit={(event) => { event.preventDefault(); setUsername(input.trim().replace(/^@/, '')) }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder={searchLabel} /><button>{searchLabel}</button></form>{error && <p className="api-error">{error}</p>}{!profile && !error && <p>{loading}</p>}{profile && <><div className="github-profile"><img src={profile.avatar_url} alt="" /><div><h3>{profile.name || profile.login}</h3><p>{profile.bio || 'GitHub profile'}</p></div></div><div className="widget-stats"><b>{profile.public_repos}<small>repos</small></b><b>{profile.followers}<small>seguidores</small></b><b>{profile.following}<small>seguindo</small></b></div><div className="repo-grid">{repos.map((repo) => <a href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}><b>{repo.name}</b><small>{repo.language || '—'} · ★ {repo.stargazers_count}</small></a>)}</div></>}</div>
}
