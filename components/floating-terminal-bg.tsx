'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

const terminalCommands = [
  '$ npm run dev',
  '$ docker-compose up -d',
  '$ kubectl apply -f deployment.yaml',
  '$ git push origin main',
  '$ python train_model.py',
  '$ systemctl start nginx',
  '$ ssh user@server',
  '$ pnpm build',
  '$ npm test -- --coverage',
  '$ curl localhost:3000/api',
  '$ htop',
  '$ neofetch',
  '$ ls -la',
  '$ cd ~/projects',
  '$ vim config.yaml',
  '$ cat /etc/passwd',
  '$ grep -r "pattern" .',
  '$ awk "{print $1}" file.txt',
  '$ sudo pacman -Syu',
  '$ journalctl -xe',
]

const serverLogs = [
  '✓ Server running on port 3000',
  '✓ Database connected',
  '✓ Redis cache initialized',
  '✓ WebSocket server ready',
  '✓ API routes loaded',
  '✓ Auth middleware active',
  '→ GET /api/users 200 45ms',
  '→ POST /api/auth 201 89ms',
  '✓ Build completed in 12.4s',
  '✓ Deployed to production',
  '✓ Health check passed',
  '✓ SSL certificate valid',
]

export default function FloatingTerminalBg() {
  const items = useMemo(() => {
    const allItems = [...terminalCommands, ...serverLogs]
    return Array.from({ length: 20 }, (_, i) => ({
      text: allItems[i % allItems.length],
      x: (i * 37) % 100,
      y: (i * 73) % 100,
      delay: (i * 11) % 10,
      duration: 15 + ((i * 19) % 15),
      isSuccess: allItems[i % allItems.length].startsWith('✓'),
      isArrow: allItems[i % allItems.length].startsWith('→'),
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.45]">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute font-mono text-xs whitespace-nowrap ${
            item.isSuccess ? 'text-green-500' : item.isArrow ? 'text-cyan-500' : 'text-white'
          }`}
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, -20, -40],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  )
}
