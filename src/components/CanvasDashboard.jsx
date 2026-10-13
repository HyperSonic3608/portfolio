import { useEffect, useState } from 'react'

export default function CanvasDashboard({ unavailable, loading }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    let mounted = true
    fetch('/api/canvas', { headers: { Accept: 'application/json' } }).then(async (response) => {
      const body = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(body.message || unavailable)
      return body
    }).then((body) => mounted && setData(body)).catch((reason) => mounted && setError(reason.message || unavailable))
    return () => { mounted = false }
  }, [unavailable])
  if (!data) return <div className="real-widget api-state"><strong>{loading}</strong><p>{error || unavailable}</p></div>
  const courses = data.courses || []
  const assignments = data.assignments || data.tasks || []
  return <div className="real-widget canvas-widget"><div className="widget-stats"><b>{courses.length}<small>cursos</small></b><b>{assignments.length}<small>entregas</small></b><b>{data.events?.length || 0}<small>eventos</small></b></div><div className="canvas-items">{assignments.slice(0, 8).map((item) => <article key={item.id}><b>{item.name || item.title}</b><small>{item.due_at ? new Date(item.due_at).toLocaleDateString() : 'sem prazo'}</small></article>)}</div></div>
}
