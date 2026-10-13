import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { CANVAS_PATH, handleCanvas } from './api/_canvas.js'
import { GITHUB_PATH, handleGitHub } from './api/_github.js'

function canvasApi(env) {
  const middleware = (req, res, next) => {
    if (new URL(req.url, 'http://localhost').pathname !== CANVAS_PATH) return next()
    handleCanvas(req, res, env).catch(next)
  }

  return {
    name: 'canvas-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

function githubApi(env) {
  const middleware = (req, res, next) => {
    if (new URL(req.url, 'http://localhost').pathname !== GITHUB_PATH) return next()
    handleGitHub(req, res, env).catch(next)
  }

  return {
    name: 'github-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), canvasApi(env), githubApi(env)],
  }
})
