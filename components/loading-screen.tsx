'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'

const loadingSteps = [
  { text: 'Initializing neural networks...', icon: '🧠' },
  { text: 'Loading AI models...', icon: '⚡' },
  { text: 'Connecting to APIs...', icon: '🔗' },
  { text: 'Deploying portfolio...', icon: '🚀' },
  { text: 'System ready', icon: '✓' },
]

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 12 + 3
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 600)
          return 100
        }
        setCurrentStep(Math.min(Math.floor(newProgress / 25), loadingSteps.length - 1))
        return newProgress
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }} />
          </div>

          {/* Glowing orbs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-accent/20 blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="text-center relative z-10">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="mb-10"
            >
              <div className="relative inline-flex items-center gap-4">
                <Terminal className="w-16 h-16 text-primary animate-pulse" />
                <motion.span
                  className="text-7xl font-bold gradient-text"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 40px rgba(59, 130, 246, 0.8)',
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  DN
                </motion.span>
              </div>
            </motion.div>

            {/* Terminal-style loading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 text-left font-mono text-sm max-w-sm mx-auto mb-8 relative overflow-hidden"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-muted-foreground">Daivesh Naik</span>
              </div>

              {/* Loading steps */}
              <div className="space-y-2">
                {loadingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: index <= currentStep ? 1 : 0.3,
                      x: 0
                    }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-2 ${index < currentStep ? 'text-green-400' :
                        index === currentStep ? 'text-cyan-400' : 'text-muted-foreground'
                      }`}
                  >
                    <span className="w-4 text-center">
                      {index < currentStep ? '✓' : index === currentStep ? '>' : '○'}
                    </span>
                    <span className={index === currentStep ? 'animate-pulse' : ''}>
                      {step.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Scanning line effect */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-72 mx-auto"
            >
              <div className="h-2 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm border border-border/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  className="h-full bg-gradient-to-r from-primary via-cyan-400 to-accent relative"
                  style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-muted-foreground font-mono">
                  Initializing...
                </span>
                <span className="text-sm font-bold gradient-text font-mono">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
