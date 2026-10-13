import { useEffect, useRef, useState } from 'react'
import { FiDownload, FiExternalLink, FiMaximize2, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

const FILES = [
  { id: 'pt', label: 'PT', file: '/curriculo-pt.pdf', downloadName: 'curriculo-davi-sollar-pt.pdf' },
  { id: 'en', label: 'EN', file: '/curriculo-en.pdf', downloadName: 'davi-sollar-resume-en.pdf' },
]
const ZOOM_MIN = 0.5
const ZOOM_MAX = 2
const ZOOM_STEP = 0.1

export default function CurriculumViewer({ notice }) {
  const areaRef = useRef(null)
  const [current, setCurrent] = useState(FILES[0])
  const [pages, setPages] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [width, setWidth] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const area = areaRef.current
    if (!area) return undefined
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(240, Math.floor(entry.contentRect.width)))
    })
    observer.observe(area)
    return () => observer.disconnect()
  }, [])

  const changeFile = (file) => {
    if (file.id === current.id) return
    setCurrent(file)
    setPages(0)
    setError(false)
  }

  const changeZoom = (delta) => {
    setZoom((value) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(value + delta).toFixed(2))))
  }

  const pageWidth = width ? Math.round(Math.min(width, 900) * zoom) : undefined

  return <div className="real-widget cv-widget">
    <div className="widget-toolbar">
      <div>{FILES.map((file) => <button className={file.id === current.id ? 'active' : ''} key={file.id} type="button" onClick={() => changeFile(file)}>{file.label}</button>)}</div>
      <div className="widget-actions">
        <button type="button" disabled={zoom <= ZOOM_MIN} onClick={() => changeZoom(-ZOOM_STEP)} title="Diminuir zoom"><FiZoomOut /></button>
        <span>{Math.round(zoom * 100)}%</span>
        <button type="button" disabled={zoom >= ZOOM_MAX} onClick={() => changeZoom(ZOOM_STEP)} title="Aumentar zoom"><FiZoomIn /></button>
        <button type="button" disabled={zoom === 1} onClick={() => setZoom(1)} title="Ajustar à largura"><FiMaximize2 /></button>
        <a href={current.file} download={current.downloadName} title="Baixar PDF"><FiDownload /></a>
        <a href={current.file} target="_blank" rel="noreferrer" title="Abrir PDF"><FiExternalLink /></a>
      </div>
    </div>
    <div className="cv-area" ref={areaRef}>
      {error ? <p className="cv-status cv-error">Não foi possível exibir o PDF aqui. Use os botões acima para baixar ou abrir.</p> : <Document
        key={current.file}
        file={current.file}
        onLoadSuccess={({ numPages }) => setPages(numPages)}
        onLoadError={(loadError) => {
          console.error('Currículo: falha ao abrir o PDF', loadError)
          setError(true)
        }}
        loading={<p className="cv-status">Carregando currículo...</p>}
        error={null}
        externalLinkTarget="_blank"
        externalLinkRel="noopener noreferrer"
      >
        {pageWidth && Array.from({ length: pages }, (_, index) => <div className="cv-page" key={index}><Page pageNumber={index + 1} width={pageWidth} loading={null} /></div>)}
      </Document>}
    </div>
    {notice && <small>{notice}</small>}
  </div>
}
