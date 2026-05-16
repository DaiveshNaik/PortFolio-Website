'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react'

const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'Anvex AI Technologies',
    location: 'India',
    period: 'June 2025 – Present',
    type: 'Full-time',
    achievements: [
      'Promoted from intern due to exceptional performance and dedication',
      'Built scalable web applications using React.js and Node.js',
      'Developed AI voice assistant with advanced natural language processing',
      'Created computer vision frontend interfaces for ML models',
      'Worked extensively with Vertex AI and RAG pipelines',
      'Implemented Docker + AWS + CI/CD deployment workflows',
      'Contributed to React Native hybrid app development',
    ],
    technologies: ['Next.js', 'React.js', 'Node.js', 'Vertex AI', 'Docker', 'AWS', 'React Native', 'Python', 'Google Cloud', 'Git', 'Linux'],
  },
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-8 md:pl-0 pb-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary glow-border -translate-x-1/2 md:-translate-x-1/2">
                <div className="absolute inset-1 rounded-full bg-background" />
                <div className="absolute inset-2 rounded-full bg-primary animate-pulse" />
              </div>

              {/* Content card */}
              <div className="md:w-[calc(50%-2rem)] md:ml-auto glass rounded-2xl p-6 md:p-8 hover:glow-border transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
                      <div className="flex items-center gap-1.5 text-primary">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-3 mb-6">
                  {exp.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Award className="w-4 h-4 text-accent mt-1 shrink-0" />
                      <span className="text-sm text-muted-foreground">{achievement}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
