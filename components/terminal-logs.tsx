'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Terminal, Circle } from 'lucide-react'

interface LogEntry {
  id: number | string
  type: 'info' | 'success' | 'warning' | 'error' | 'system'
  timestamp: string
  message: string
}

const initialLogs: LogEntry[] = [
  { id: 1, type: 'system', timestamp: '00:00:00', message: 'System boot sequence initiated...' },
  { id: 2, type: 'info', timestamp: '00:00:01', message: '$ neofetch' },
  { id: 3, type: 'system', timestamp: '00:00:01', message: '         _____' },
  { id: 4, type: 'system', timestamp: '00:00:01', message: '        /     \\' },
  { id: 5, type: 'system', timestamp: '00:00:01', message: '       | () () |   OS: Ubuntu Linux x86_64' },
  { id: 6, type: 'system', timestamp: '00:00:01', message: '        \\  ^  /    Kernel: 6.8.0-zen1' },
  { id: 7, type: 'system', timestamp: '00:00:01', message: '         |||||     Shell: zsh 5.9' },
  { id: 8, type: 'system', timestamp: '00:00:01', message: '         |||||     Terminal: alacritty' },
]

const serverLogs: Omit<LogEntry, 'id' | 'timestamp'>[] = [
  { type: 'info', message: '$ pnpm dev' },
  { type: 'success', message: '> next dev --turbo' },
  { type: 'success', message: '  ▲ Next.js 15.1.0 (turbo)' },
  { type: 'success', message: '  - Local:        http://localhost:3000' },
  { type: 'success', message: '  - Network:      http://192.168.1.105:3000' },
  { type: 'success', message: ' ✓ Starting...' },
  { type: 'success', message: ' ✓ Ready in 847ms' },
  { type: 'info', message: '○ Compiling / ...' },
  { type: 'success', message: ' ✓ Compiled / in 234ms' },
  { type: 'info', message: 'GET / 200 in 45ms' },
  { type: 'info', message: '$ docker ps' },
  { type: 'system', message: 'CONTAINER ID   IMAGE          STATUS        PORTS' },
  { type: 'system', message: 'a1b2c3d4e5f6   postgres:16    Up 2 hours    5432/tcp' },
  { type: 'system', message: 'f6e5d4c3b2a1   redis:alpine   Up 2 hours    6379/tcp' },
  { type: 'success', message: ' ✓ All containers healthy' },
  { type: 'info', message: '$ npm run build' },
  { type: 'success', message: '> next build' },
  { type: 'info', message: 'Creating an optimized production build...' },
  { type: 'success', message: ' ✓ Compiled successfully' },
  { type: 'success', message: ' ✓ Linting and checking validity of types' },
  { type: 'success', message: ' ✓ Collecting page data' },
  { type: 'success', message: ' ✓ Generating static pages (12/12)' },
  { type: 'success', message: ' ✓ Finalizing page optimization' },
  { type: 'info', message: 'Route (app)                    Size     First Load JS' },
  { type: 'system', message: '┌ ○ /                          5.2 kB        89.1 kB' },
  { type: 'system', message: '├ ○ /about                     2.1 kB        86.0 kB' },
  { type: 'system', message: '├ ○ /projects                  4.8 kB        88.7 kB' },
  { type: 'system', message: '└ ○ /contact                   3.2 kB        87.1 kB' },
  { type: 'success', message: ' ✓ Build completed in 12.4s' },
  { type: 'info', message: '$ systemctl status nginx' },
  { type: 'success', message: '● nginx.service - A high performance web server' },
  { type: 'success', message: '   Loaded: loaded (/lib/systemd/system/nginx.service)' },
  { type: 'success', message: '   Active: active (running) since Mon 2024-01-15 09:00:00' },
  { type: 'info', message: '$ kubectl get pods -n production' },
  { type: 'system', message: 'NAME                        READY   STATUS    RESTARTS   AGE' },
  { type: 'success', message: 'api-server-7b5d4f9c8-x2j9k   1/1     Running   0          4h' },
  { type: 'success', message: 'web-app-6c8b5d7e9-m3k8p      1/1     Running   0          4h' },
  { type: 'success', message: 'redis-cache-5a9c6d8e7-n4l9q  1/1     Running   0          4h' },
  { type: 'info', message: 'GET /api/health 200 in 12ms' },
  { type: 'info', message: 'POST /api/users 201 in 89ms' },
  { type: 'success', message: ' ✓ Database connection established' },
  { type: 'info', message: 'WebSocket connection established: client_id_x7k9m2' },
  { type: 'success', message: ' ✓ AI Model loaded: vertex-ai/gemini-pro' },
  { type: 'info', message: 'Processing inference request...' },
  { type: 'success', message: ' ✓ Inference complete in 1.2s' },
  { type: 'info', message: '$ git push origin main' },
  { type: 'success', message: 'Enumerating objects: 15, done.' },
  { type: 'success', message: 'Counting objects: 100% (15/15), done.' },
  { type: 'success', message: 'Delta compression using up to 8 threads' },
  { type: 'success', message: 'Writing objects: 100% (8/8), 2.45 KiB | 2.45 MiB/s, done.' },
  { type: 'success', message: 'To github.com:daiveshnaik/portfolio.git' },
  { type: 'success', message: '   a1b2c3d..d4e5f6g  main -> main' },
  { type: 'info', message: '$ htop' },
  { type: 'system', message: 'CPU[||||||||||||||||||||              ] 45.2%' },
  { type: 'system', message: 'Mem[|||||||||||||                     ] 32.1%' },
  { type: 'system', message: 'Swp[                                  ] 0.0%' },
]

function getTimestamp(): string {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour12: false })
}

function getLogColor(type: LogEntry['type']): string {
  switch (type) {
    case 'success':
      return 'text-green-400'
    case 'error':
      return 'text-red-400'
    case 'warning':
      return 'text-yellow-400'
    case 'info':
      return 'text-cyan-400'
    case 'system':
      return 'text-gray-400'
    default:
      return 'text-gray-300'
  }
}

export default function TerminalLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs)
  const logIndexRef = useRef(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = logIndexRef.current % serverLogs.length
      const newLog: LogEntry = {
        id: crypto.randomUUID(),
        timestamp: getTimestamp(),
        ...serverLogs[nextIndex],
      }
      
      logIndexRef.current = nextIndex + 1
      
      setLogs((currentLogs) => {
        const updatedLogs = [...currentLogs, newLog]
        // Keep last 20 logs for performance
        return updatedLogs.slice(-20)
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [logs])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="glass rounded-xl overflow-hidden border border-border/50"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-border/50">
        <div className="flex gap-2">
          <Circle className="w-3 h-3 fill-red-500 text-red-500" />
          <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <Circle className="w-3 h-3 fill-green-500 text-green-500" />
        </div>
        <div className="flex items-center gap-2 ml-4 text-sm text-muted-foreground">
          <Terminal className="w-4 h-4" />
          <span className="font-mono">daivesh@ubuntu ~ </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="h-64 overflow-y-auto p-4 bg-black/80 font-mono text-xs leading-relaxed"
      >
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-3"
            >
              <span className="text-gray-600 select-none shrink-0">[{log.timestamp}]</span>
              <span className={getLogColor(log.type)}>{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Cursor */}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-green-400"
        >
          _
        </motion.span>
      </div>
    </motion.div>
  )
}
