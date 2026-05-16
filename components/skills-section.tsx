'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import TechLogos from './tech-logos'
import CodeSamples from './code-samples'
import TerminalLogs from './terminal-logs'

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'JavaScript', level: 90, logo: 'JavaScript' as const },
      { name: 'TypeScript', level: 85, logo: 'TypeScript' as const },
      { name: 'React.js', level: 90, logo: 'React' as const },
      { name: 'Angular', level: 75, logo: 'Angular' as const },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Java', level: 85, logo: 'Java' as const },
      { name: 'Spring Boot', level: 80, logo: 'SpringBoot' as const },
      { name: 'Node.js', level: 85, logo: 'NodeJS' as const },
      { name: 'Python', level: 80, logo: 'Python' as const },
      { name: 'PostgreSQL', level: 80, logo: 'PostgreSQL' as const },
      { name: 'MongoDB', level: 85, logo: 'MongoDB' as const },
    ],
  },
  {
    name: 'AI & ML',
    skills: [
      { name: 'TensorFlow', level: 75, logo: 'TensorFlow' as const },
      { name: 'Python ML', level: 80, logo: 'Python' as const },
      { name: 'Vertex AI', level: 80, logo: 'TensorFlow' as const },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      { name: 'Docker', level: 85, logo: 'Docker' as const },
      { name: 'AWS', level: 75, logo: 'AWS' as const },
      { name: 'Linux', level: 90, logo: 'Linux' as const },
      { name: 'Git', level: 90, logo: 'Git' as const },
      { name: 'GitLab', level: 85, logo: 'GitLab' as const },
    ],
  },
]

const techStack = [
  { name: 'JavaScript', logo: 'JavaScript' as const },
  { name: 'TypeScript', logo: 'TypeScript' as const },
  { name: 'React', logo: 'React' as const },
  { name: 'Next.js', logo: 'NextJS' as const },
  { name: 'Java', logo: 'Java' as const },
  { name: 'Spring Boot', logo: 'SpringBoot' as const },
  { name: 'Node.js', logo: 'NodeJS' as const },
  { name: 'Python', logo: 'Python' as const },
  { name: 'Docker', logo: 'Docker' as const },
  { name: 'Kubernetes', logo: 'Kubernetes' as const },
  { name: 'PostgreSQL', logo: 'PostgreSQL' as const },
  { name: 'MongoDB', logo: 'MongoDB' as const },
  { name: 'Redis', logo: 'Redis' as const },
  { name: 'AWS', logo: 'AWS' as const },
  { name: 'Linux', logo: 'Linux' as const },
  { name: 'Git', logo: 'Git' as const },
  { name: 'GitLab', logo: 'GitLab' as const },
  { name: 'Angular', logo: 'Angular' as const },
  { name: 'TensorFlow', logo: 'TensorFlow' as const },
  { name: 'Tailwind', logo: 'Tailwind' as const },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" className="py-24 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From frontend frameworks to backend systems, AI/ML to DevOps - 
            I bring a full-stack perspective to every project.
          </p>
        </motion.div>

        {/* Tech Stack Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-lg font-semibold mb-6 text-center">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => {
              const LogoComponent = TechLogos[tech.logo]
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl glass hover:glow-border transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                    <LogoComponent />
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {skillCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-primary text-primary-foreground'
                  : 'glass hover:bg-secondary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Skills with Progress Bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-8 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories[activeCategory].skills.map((skill, index) => {
              const LogoComponent = TechLogos[skill.logo]
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8">
                        <LogoComponent />
                      </div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm font-mono text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary via-cyan-500 to-accent rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Code Samples & Terminal Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Samples */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-primary font-mono">{'//'}</span>
              Code Samples
            </h3>
            <CodeSamples />
          </motion.div>

          {/* Terminal Logs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-green-400">$</span>
              Live Terminal
              <span className="text-xs text-green-400 font-mono ml-2 px-2 py-0.5 bg-green-400/10 rounded">
                ubuntu
              </span>
            </h3>
            <TerminalLogs />

            {/* Linux Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-4 glass rounded-lg p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12">
                <TechLogos.Linux />
              </div>
              <div>
                <p className="font-medium">Linux Power User</p>
                <p className="text-sm text-muted-foreground">
                  Daily driver: Ubuntu | Terminal enthusiast | Docker & K8s expert
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Tech Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 overflow-hidden"
        >
          <div className="flex animate-marquee space-x-6">
            {[...techStack, ...techStack].map((tech, index) => {
              const LogoComponent = TechLogos[tech.logo]
              return (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-full glass whitespace-nowrap shrink-0"
                >
                  <div className="w-5 h-5">
                    <LogoComponent />
                  </div>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
