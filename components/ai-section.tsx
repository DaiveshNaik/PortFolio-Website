'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Cpu, MessageSquare, Phone, Workflow, Sparkles, Zap, Bot } from 'lucide-react'
import AIAgentVisualization from './ai-agent-visualization'

const aiCapabilities = [
  {
    icon: Brain,
    title: 'Vertex AI',
    description: 'Building intelligent applications with Google Cloud Vertex AI platform',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Workflow,
    title: 'RAG Pipelines',
    description: 'Implementing Retrieval Augmented Generation for context-aware AI responses',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: MessageSquare,
    title: 'LLM APIs',
    description: 'Integrating large language model APIs for natural language processing',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Cpu,
    title: 'AI Automation',
    description: 'Creating intelligent automation workflows for business processes',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Phone,
    title: 'AI Voice Assistant',
    description: 'Developing voice-enabled AI assistants with speech recognition',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Building autonomous AI agents that can reason, plan, and execute tasks',
    gradient: 'from-violet-500 to-purple-500',
  },
]

export default function AISection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="ai" className="py-24 px-4 relative overflow-hidden" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Building the Future with{' '}
            <span className="gradient-text">AI Agents</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Specializing in cutting-edge AI technologies to build intelligent, 
            autonomous agents that transform how we interact with technology.
          </p>
        </motion.div>

        {/* AI Agent Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <AIAgentVisualization />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-3xl p-8 mb-16"
        >
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '5+', label: 'AI Projects Built', icon: Brain },
              { value: '3+', label: 'LLM Integrations', icon: MessageSquare },
              { value: '10K+', label: 'API Calls/Day', icon: Zap },
              { value: '100%', label: 'Passion for AI', icon: Sparkles },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group glass rounded-2xl p-6 hover:glow-border transition-all duration-500 relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${capability.gradient} p-[1px] mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <capability.icon className="w-7 h-7 text-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all duration-300">{capability.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
