'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Database, Cloud, Brain, Zap, Users } from 'lucide-react'

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Built' },
  { value: '15+', label: 'Technologies' },
  { value: '5+', label: 'AI Integrations' },
]

const highlights = [
  { icon: Code2, label: 'Full Stack Development' },
  { icon: Brain, label: 'AI & Machine Learning' },
  { icon: Database, label: 'Database Design' },
  { icon: Cloud, label: 'Cloud Services' },
  { icon: Zap, label: 'Performance Optimization' },
  { icon: Users, label: 'Team Collaboration' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Building the <span className="gradient-text">Future</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m <span className="text-foreground font-semibold">Daivesh Naik</span>, a Junior Full Stack Developer passionate about 
                <span className="text-primary"> AI-powered applications</span>, scalable backend systems, modern frontend experiences, 
                and intelligent automation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                With hands-on experience in <span className="text-accent">React.js, Node.js, NestJS, Spring Boot, Python, MongoDB, MySQL, 
                Vertex AI, RAG pipelines</span>, and cloud technologies, I build solutions that make a difference.
              </p>
            </div>

            {/* Highlight Pills */}
            <div className="flex flex-wrap gap-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass rounded-2xl p-6 text-center group hover:glow-border transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
