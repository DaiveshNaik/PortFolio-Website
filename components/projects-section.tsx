'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'

const projects = [
  {
    title: 'Portfolio Website',
    subtitle: 'Personal Showcase',
    description: 'My personal portfolio to showcase my skills and projects. Built with React, Tailwind CSS, and Framer Motion for a smooth user experience.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    features: [
      'Smooth animations with Framer Motion',
      'Fully responsive design',
      'Interactive UI elements',
      'Dark mode aesthetic',
    ],
    image: '/projects/portfolio.jpg',
    liveUrl: 'https://daiveshnaik.me',
    githubUrl: 'https://github.com/DaiveshNaik',
    category: 'Front End',
  },
  {
    title: 'AI Copilot for Admin Panel',
    subtitle: 'with Code Generation',
    description: 'React + TypeScript-based AI assistant that helps developers generate, debug, and explain code within admin dashboards.',
    technologies: ['React', 'TypeScript', 'AI', 'Admin Panel'],
    features: [
      'Code generation & debugging',
      'AI-powered explanations',
      'Admin dashboard integration',
      'TypeScript support',
    ],
    image: '/projects/aicopilot.jpg',
    liveUrl: 'https://chataibydaivesh.netlify.app',
    githubUrl: 'https://github.com/DaiveshNaik/CHATAI',
    category: 'Full Stack & AI',
  },
  {
    title: 'E-Commerce Multi-Vendor Platform',
    subtitle: 'with AI Chatbot',
    description: 'A comprehensive multi-vendor e-commerce platform featuring an AI-powered chatbot for customer support, secure authentication, and scalable architecture.',
    technologies: ['React.js', 'Node.js', 'Spring Boot', 'MySQL', 'JWT', 'Generative AI'],
    features: [
      'Multi-vendor marketplace system',
      'AI chatbot for customer queries',
      'Secure JWT authentication',
      'Scalable microservices architecture',
    ],
    image: '/projects/ecommerce.jpg',
    liveUrl: '#',
    githubUrl: 'https://github.com/DaiveshNaik/Ecommerce-Multi-Vendor-Project',
    category: 'Full Stack',
  },
  {
    title: 'Task Management System',
    subtitle: 'with Live Chat',
    description: 'Real-time task management application with integrated live chat functionality, enabling teams to collaborate effectively.',
    technologies: ['React.js', 'Spring Boot', 'MySQL', 'WebSockets'],
    features: [
      'Real-time chat functionality',
      'Task tracking & management',
      'JWT authentication',
      'RESTful API design',
    ],
    image: '/projects/taskmanager.jpg',
    liveUrl: '#',
    githubUrl: 'https://github.com/DaiveshNaik/Project-Task-Management',
    category: 'Full Stack',
  },
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore some of my recent projects showcasing full-stack development, AI integration, and modern web technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative glass rounded-2xl overflow-hidden hover:glow-border transition-all duration-500"
            >
              {/* Project Image/Gradient Background */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium backdrop-blur-sm">
                  {project.category}
                </div>

                {/* Hover Animation */}
                <motion.div
                  animate={{
                    scale: hoveredProject === index ? 1.1 : 1,
                    opacity: hoveredProject === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-sm text-primary mb-3">{project.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
