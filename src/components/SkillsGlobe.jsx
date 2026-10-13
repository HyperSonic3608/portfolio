import { useEffect, useMemo, useRef, useState } from 'react'
import { skillCategories, skills } from '../data/skills'

function points(count) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, i) => { const y = 1 - (2 * (i + .5)) / count; const r = Math.sqrt(1 - y * y); const theta = golden * i; return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r } })
}

export default function SkillsGlobe({ hint }) {
  const [category, setCategory] = useState('Todas')
  const [list, setList] = useState(false)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const filtered = category === 'Todas' ? skills : skills.filter((skill) => skill.category === category)
  const filteredWithIcons = useMemo(() => filtered.map((skill) => ({ ...skill, Icon: skill.icon || SiReact })), [filtered])
  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const items = [...stage.querySelectorAll('[data-skill]')]
    const pts = points(filteredWithIcons.length)
    const lines = [...Array(6)].map((_, index) => [...Array(49)].map((__, step) => {
      const t = (step / 48) * Math.PI * 2
      const lon = (index / 6) * Math.PI
      return { x: Math.cos(t) * Math.cos(lon), y: Math.sin(t), z: Math.cos(t) * Math.sin(lon) }
    })).concat([-0.6, -0.3, 0, 0.3, 0.6].map((latitude) => [...Array(49)].map((__, step) => {
      const t = (step / 48) * Math.PI * 2
      const radius = Math.sqrt(1 - latitude * latitude)
      return { x: radius * Math.cos(t), y: latitude, z: radius * Math.sin(t) }
    })))
    const ryState = { value: 0 }; let frame; let dragging = false; let lastX = 0
    const draw = () => {
      const width = stage.clientWidth; const height = stage.clientHeight; const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height)
      const radius = Math.min(width, height) * .37; const cx = width / 2; const cy = height / 2
      if (!dragging) ryState.value += .004
      ctx.lineWidth = 1; ctx.strokeStyle = '#d4ec38'
      lines.forEach((line) => { let previous; line.forEach((point) => { const x = point.x * Math.cos(ryState.value) - point.z * Math.sin(ryState.value); const z = point.x * Math.sin(ryState.value) + point.z * Math.cos(ryState.value); const current = { x: cx + x * radius, y: cy + point.y * radius, z }; if (previous) { ctx.globalAlpha = (previous.z + z) / 2 > 0 ? .25 : .06; ctx.beginPath(); ctx.moveTo(previous.x, previous.y); ctx.lineTo(current.x, current.y); ctx.stroke() } previous = current }) })
      ctx.globalAlpha = 1
      pts.forEach((point, index) => { const x = point.x * Math.cos(ryState.value) - point.z * Math.sin(ryState.value); const z = point.x * Math.sin(ryState.value) + point.z * Math.cos(ryState.value); const scale = 1 / (1.8 - z); const el = items[index]; if (el) { el.style.transform = `translate(${cx + x * radius * scale}px, ${cy + point.y * radius * scale}px) translate(-50%, -50%) scale(${scale})`; el.style.opacity = `${.35 + (z + 1) * .32}`; el.style.zIndex = `${Math.round((z + 1) * 10)}` } })
      frame = requestAnimationFrame(draw)
    }
    const down = (event) => { dragging = true; lastX = event.clientX }
    const move = (event) => { if (dragging) { ryState.value += (event.clientX - lastX) * .01; lastX = event.clientX } }
    const up = () => { dragging = false }
    draw(); stage.addEventListener('pointerdown', down); stage.addEventListener('pointermove', move); stage.addEventListener('pointerup', up)
    return () => { cancelAnimationFrame(frame); stage.removeEventListener('pointerdown', down); stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerup', up) }
  }, [filteredWithIcons])
  return <div className="skills-section"><div className="skills-toolbar">{['Todas', ...skillCategories].map((item) => <button type="button" className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}<button type="button" className="view-toggle" onClick={() => setList((value) => !value)}>{list ? 'GLOBO' : 'LISTA'}</button></div>{list ? <div className="skills-grid">{filteredWithIcons.map(({ Icon, ...skill }) => <a href={skill.link} target="_blank" rel="noreferrer" key={skill.name} style={{ '--skill-color': skill.color }}><Icon aria-hidden="true" /><span>{skill.name}</span><small>{skill.category}</small></a>)}</div> : <><div className="skills-globe" ref={stageRef}><canvas ref={canvasRef} aria-hidden="true" />{filteredWithIcons.map(({ Icon, ...skill }) => <a data-skill href={skill.link} target="_blank" rel="noreferrer" key={skill.name} style={{ '--skill-color': skill.color }} aria-label={skill.name}><Icon aria-hidden="true" /><span>{skill.name}</span></a>)}</div><p className="skills-hint">{hint}</p></>}</div>
}
