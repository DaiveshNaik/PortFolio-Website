'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { Github, Linkedin, Mail, ChevronDown, Download, ExternalLink, Sparkles } from 'lucide-react'

const roles = [
  'Full Stack Developer',
  'AI Agent Builder',
  'React & Node.js Developer',
  'LLM Integration Expert',
  'Linux Power User',
]

// Code block styling component
function CodeBlock({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`font-mono text-sm md:text-base ${className}`}>
      {children}
    </div>
  )
}

function CodeKeyword({ children }: { children: React.ReactNode }) {
  return <span className="text-purple-400">{children}</span>
}

function CodeString({ children }: { children: React.ReactNode }) {
  return <span className="text-green-400">{children}</span>
}

function CodeComment({ children }: { children: React.ReactNode }) {
  return <span className="text-muted-foreground/60 italic">{children}</span>
}

function CodeVariable({ children }: { children: React.ReactNode }) {
  return <span className="text-cyan-400">{children}</span>
}

function CodeFunction({ children }: { children: React.ReactNode }) {
  return <span className="text-yellow-400">{children}</span>
}

function CodeNumber({ children }: { children: React.ReactNode }) {
  return <span className="text-orange-400">{children}</span>
}

// Floating code snippets for background
const codeSnippets = [
  'const agent = new AIAgent()',
  'await llm.generate(prompt)',
  'pipeline.process(data)',
  'model.predict(input)',
  'agent.execute(task)',
  'async function train()',
  'export const AI = {}',
  'return response.json()',
  'sudo systemctl start',
  'docker compose up -d',
  'git push origin main',
]

function FloatingCodeBackground() {
  const snippets = useMemo(() => 
    codeSnippets.map((code, i) => ({
      code,
      x: (i * 37) % 100,
      y: (i * 73) % 100,
      delay: (i * 11) % 5,
      duration: 15 + ((i * 19) % 10),
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      {snippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-primary whitespace-nowrap"
          style={{ left: `${snippet.x}%`, top: `${snippet.y}%` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [20, -20, 20],
          }}
          transition={{
            duration: snippet.duration,
            delay: snippet.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  )
}

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [lineNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25])

  useEffect(() => {
    const currentText = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-12 overflow-hidden">
      <FloatingCodeBackground />
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Code Editor Style Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Editor Window */}
          <div className="relative bg-[#0d1117] rounded-xl border border-border/50 overflow-hidden shadow-2xl shadow-primary/10">
            {/* Editor Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-border/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-muted-foreground">daivesh_naik.tsx</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-green-400">Available for hire</span>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex">
              {/* Line Numbers */}
              <div className="hidden md:flex flex-col py-6 px-3 bg-[#0d1117] border-r border-border/20 select-none">
                {lineNumbers.map((num) => (
                  <span key={num} className="font-mono text-xs text-muted-foreground/40 leading-7 text-right w-6">
                    {num}
                  </span>
                ))}
              </div>

              {/* Code Content */}
              <div className="flex-1 py-6 px-4 md:px-6 overflow-x-auto">
                <CodeBlock>
                  {/* Import statements */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.2 }}
                    className="leading-7"
                  >
                    <CodeKeyword>import</CodeKeyword> {'{'} <CodeVariable>Developer</CodeVariable>, <CodeVariable>AIEngineer</CodeVariable> {'}'} <CodeKeyword>from</CodeKeyword> <CodeString>{'"@tech/experts"'}</CodeString>;
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.3 }}
                    className="leading-7"
                  >
                    <CodeKeyword>import</CodeKeyword> {'{'} <CodeVariable>passion</CodeVariable>, <CodeVariable>creativity</CodeVariable>, <CodeVariable>innovation</CodeVariable>, <CodeVariable>problemSolving</CodeVariable> {'}'} <CodeKeyword>from</CodeKeyword> <CodeString>{'"./mindset"'}</CodeString>;
                  </motion.div>

                  <div className="leading-7">&nbsp;</div>

                  {/* Comment */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.4 }}
                    className="leading-7"
                  >
                    <CodeComment>{'// Initialize the developer'}</CodeComment>
                  </motion.div>

                  {/* Main class/function */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.5 }}
                    className="leading-7"
                  >
                    <CodeKeyword>const</CodeKeyword> <CodeVariable>daivesh</CodeVariable> = <CodeKeyword>new</CodeKeyword> <CodeFunction>Developer</CodeFunction>({'{'}
                  </motion.div>

                  {/* Name - Large display */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.6 }}
                    className="leading-7 pl-4"
                  >
                    name: <CodeString>{'"'}</CodeString>
                    <span className="text-2xl md:text-4xl lg:text-5xl font-bold gradient-text">DAIVESH NAIK</span>
                    <CodeString>{'"'}</CodeString>,
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.7 }}
                    className="leading-7 pl-4"
                  >
                    title: <CodeString>{'"Full Stack Developer"'}</CodeString>,
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.75 }}
                    className="leading-7 pl-4"
                  >
                    location: <CodeString>{'"India"'}</CodeString>,
                  </motion.div>

                  {/* Skills array */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.8 }}
                    className="leading-7 pl-4"
                  >
                    skills: [<CodeString>{'"React"'}</CodeString>, <CodeString>{'"Node.js"'}</CodeString>, <CodeString>{'"Java"'}</CodeString>, <CodeString>{'"Spring Boot"'}</CodeString>, <CodeString>{'"AI/ML"'}</CodeString>, <CodeString>{'"Linux"'}</CodeString>],
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.85 }}
                    className="leading-7"
                  >
                    {'}'});
                  </motion.div>

                  <div className="leading-7">&nbsp;</div>

                  {/* Try-Catch Block */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.9 }}
                    className="leading-7"
                  >
                    <CodeKeyword>try</CodeKeyword> {'{'}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.95 }}
                    className="leading-7 pl-4"
                  >
                    <CodeKeyword>const</CodeKeyword> <CodeVariable>role</CodeVariable> = <CodeKeyword>await</CodeKeyword> daivesh.<CodeFunction>getCurrentRole</CodeFunction>();
                  </motion.div>

                  {/* Typing animation role */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1 }}
                    className="leading-7 pl-4"
                  >
                    console.<CodeFunction>log</CodeFunction>(<CodeString>{'"'}</CodeString>
                    <span className="text-lg md:text-xl text-green-400 font-semibold">{displayText}</span>
                    <span className="animate-pulse text-primary">|</span>
                    <CodeString>{'"'}</CodeString>);
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.05 }}
                    className="leading-7"
                  >
                    {'}'} <CodeKeyword>catch</CodeKeyword> (error) {'{'}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.1 }}
                    className="leading-7 pl-4"
                  >
                    <CodeComment>{'// Never fails - always learning!'}</CodeComment>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.15 }}
                    className="leading-7 pl-4"
                  >
                    daivesh.<CodeFunction>learn</CodeFunction>(error);
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.2 }}
                    className="leading-7"
                  >
                    {'}'}
                  </motion.div>

                  <div className="leading-7">&nbsp;</div>

                  {/* If-Else hiring block */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.25 }}
                    className="leading-7"
                  >
                    <CodeKeyword>if</CodeKeyword> (you.<CodeFunction>needsDeveloper</CodeFunction>()) {'{'}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.3 }}
                    className="leading-7 pl-4 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => window.open('https://www.linkedin.com/in/daivesh-naik/', '_blank')}
                  >
                    <CodeKeyword>return</CodeKeyword> daivesh.<CodeFunction>hireMe</CodeFunction>(); <CodeComment>{'// <- Click me!'}</CodeComment>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.35 }}
                    className="leading-7"
                  >
                    {'}'} <CodeKeyword>else</CodeKeyword> {'{'}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.4 }}
                    className="leading-7 pl-4 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={scrollToContact}
                  >
                    daivesh.<CodeFunction>connectAnyway</CodeFunction>(); <CodeComment>{'// Let\'s chat!'}</CodeComment>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.45 }}
                    className="leading-7"
                  >
                    {'}'}
                  </motion.div>
                </CodeBlock>
              </div>
            </div>

            {/* Editor Footer / Terminal */}
            <div className="px-4 py-3 bg-[#161b22] border-t border-border/30">
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Ready
                </span>
                <span>TypeScript</span>
                <span>UTF-8</span>
                <span className="ml-auto">Ln 25, Col 1</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons - Outside the editor */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <motion.button
              onClick={scrollToProjects}
              className="group relative px-6 py-3 rounded-lg glass glow-border overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="View Work"
            >
              <span className="relative z-10 flex items-center gap-2 font-mono text-sm">
                <ExternalLink className="w-4 h-4" />
                daivesh.viewProjects()
              </span>
            </motion.button>
            
            <motion.a
              href="/DaiveshNaik_FSDEV_Resume.pdf"
              download="DaiveshNaik_FSDEV_Resume.pdf"
              className="group relative px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="Download"
            >
              <span className="relative z-10 flex items-center gap-2 font-mono text-sm text-primary-foreground">
                <Download className="w-4 h-4" />
                downloadResume()
              </span>
            </motion.a>
            
            <motion.button
              onClick={scrollToContact}
              className="group relative px-6 py-3 rounded-lg border border-border overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.05, borderColor: 'rgb(var(--primary))' }}
              whileTap={{ scale: 0.98 }}
              data-cursor="Contact"
            >
              <span className="relative z-10 flex items-center gap-2 font-mono text-sm">
                <Mail className="w-4 h-4" />
                sendMessage()
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-6 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            {[
              { icon: Github, href: 'https://github.com/DaiveshNaik', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/daivesh-naik/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:naikdaivesh@gmail.com', label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg glass transition-all duration-300"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -3 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                data-cursor={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-xs font-mono tracking-wider">scroll.toExplore()</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
