'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

// Neural network node positions
const nodes = [
  // Input layer
  { id: 'i1', x: 50, y: 80, layer: 'input' },
  { id: 'i2', x: 50, y: 160, layer: 'input' },
  { id: 'i3', x: 50, y: 240, layer: 'input' },
  { id: 'i4', x: 50, y: 320, layer: 'input' },
  // Hidden layer 1
  { id: 'h1-1', x: 180, y: 100, layer: 'hidden1' },
  { id: 'h1-2', x: 180, y: 180, layer: 'hidden1' },
  { id: 'h1-3', x: 180, y: 260, layer: 'hidden1' },
  // Hidden layer 2
  { id: 'h2-1', x: 310, y: 120, layer: 'hidden2' },
  { id: 'h2-2', x: 310, y: 200, layer: 'hidden2' },
  { id: 'h2-3', x: 310, y: 280, layer: 'hidden2' },
  // Output layer
  { id: 'o1', x: 440, y: 160, layer: 'output' },
  { id: 'o2', x: 440, y: 240, layer: 'output' },
]

// Connections between nodes
const connections = [
  // Input to Hidden 1
  { from: 'i1', to: 'h1-1' }, { from: 'i1', to: 'h1-2' }, { from: 'i1', to: 'h1-3' },
  { from: 'i2', to: 'h1-1' }, { from: 'i2', to: 'h1-2' }, { from: 'i2', to: 'h1-3' },
  { from: 'i3', to: 'h1-1' }, { from: 'i3', to: 'h1-2' }, { from: 'i3', to: 'h1-3' },
  { from: 'i4', to: 'h1-1' }, { from: 'i4', to: 'h1-2' }, { from: 'i4', to: 'h1-3' },
  // Hidden 1 to Hidden 2
  { from: 'h1-1', to: 'h2-1' }, { from: 'h1-1', to: 'h2-2' }, { from: 'h1-1', to: 'h2-3' },
  { from: 'h1-2', to: 'h2-1' }, { from: 'h1-2', to: 'h2-2' }, { from: 'h1-2', to: 'h2-3' },
  { from: 'h1-3', to: 'h2-1' }, { from: 'h1-3', to: 'h2-2' }, { from: 'h1-3', to: 'h2-3' },
  // Hidden 2 to Output
  { from: 'h2-1', to: 'o1' }, { from: 'h2-1', to: 'o2' },
  { from: 'h2-2', to: 'o1' }, { from: 'h2-2', to: 'o2' },
  { from: 'h2-3', to: 'o1' }, { from: 'h2-3', to: 'o2' },
]

function NeuralNetworkSVG() {
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set())
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set())

  useEffect(() => {
    const animateNetwork = () => {
      // Randomly activate connections and nodes to simulate data flow
      const newActiveConns = new Set<string>()
      const newActiveNodes = new Set<string>()
      
      // Activate random connections
      connections.forEach((conn, idx) => {
        if (Math.random() > 0.6) {
          newActiveConns.add(`${conn.from}-${conn.to}`)
          newActiveNodes.add(conn.from)
          newActiveNodes.add(conn.to)
        }
      })
      
      setActiveConnections(newActiveConns)
      setActiveNodes(newActiveNodes)
    }

    const interval = setInterval(animateNetwork, 300)
    return () => clearInterval(interval)
  }, [])

  const getNode = (id: string) => nodes.find(n => n.id === id)

  return (
    <svg viewBox="0 0 500 400" className="w-full h-full">
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glowStrong">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Connections */}
      {connections.map((conn) => {
        const fromNode = getNode(conn.from)
        const toNode = getNode(conn.to)
        if (!fromNode || !toNode) return null
        const isActive = activeConnections.has(`${conn.from}-${conn.to}`)
        
        return (
          <motion.line
            key={`${conn.from}-${conn.to}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke={isActive ? '#06b6d4' : '#3b82f6'}
            strokeWidth={isActive ? 2 : 0.5}
            strokeOpacity={isActive ? 0.9 : 0.2}
            filter={isActive ? 'url(#glow)' : undefined}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        )
      })}

      {/* Data flow particles */}
      {Array.from(activeConnections).map((connKey, idx) => {
        const [fromId, toId] = connKey.split('-')
        const fromNode = getNode(fromId)
        const toNode = getNode(toId)
        if (!fromNode || !toNode) return null

        return (
          <motion.circle
            key={`particle-${connKey}-${idx}`}
            r={3}
            fill="#06b6d4"
            filter="url(#glowStrong)"
            initial={{ cx: fromNode.x, cy: fromNode.y, opacity: 1 }}
            animate={{ cx: toNode.x, cy: toNode.y, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const isActive = activeNodes.has(node.id)
        const nodeColor = node.layer === 'input' ? '#3b82f6' : 
                         node.layer === 'output' ? '#8b5cf6' : '#06b6d4'
        
        return (
          <g key={node.id}>
            {/* Outer glow ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={isActive ? 20 : 12}
              fill="transparent"
              stroke={nodeColor}
              strokeWidth={1}
              strokeOpacity={isActive ? 0.5 : 0.2}
              filter={isActive ? 'url(#glow)' : undefined}
              animate={{ r: isActive ? [12, 20, 12] : 12 }}
              transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
            />
            {/* Main node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={8}
              fill={isActive ? nodeColor : '#1e293b'}
              stroke={nodeColor}
              strokeWidth={2}
              filter={isActive ? 'url(#glowStrong)' : 'url(#glow)'}
              animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            />
          </g>
        )
      })}

      {/* Layer labels */}
      <text x="50" y="370" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">INPUT</text>
      <text x="180" y="370" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">HIDDEN</text>
      <text x="310" y="370" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">PROCESS</text>
      <text x="440" y="370" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">OUTPUT</text>
    </svg>
  )
}

function AgentChatSimulation() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'agent', text: string }>>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversations = [
    { user: "Analyze this dataset", agent: "Processing 10,000 records... Found 3 key insights with 94% confidence." },
    { user: "Generate a report", agent: "Report generated. Key metrics: 23% growth, 15% cost reduction, 8 recommendations." },
    { user: "Optimize the pipeline", agent: "Pipeline optimized. Latency reduced by 45%, throughput increased 3x." },
    { user: "Summarize findings", agent: "Analysis complete. 5 critical patterns detected, 2 anomalies flagged." },
  ]

  useEffect(() => {
    let conversationIndex = 0
    
    const runConversation = async () => {
      const conv = conversations[conversationIndex % conversations.length]
      
      // User message
      setMessages(prev => [...prev.slice(-3), { type: 'user', text: conv.user }])
      
      await new Promise(r => setTimeout(r, 1000))
      
      // Agent typing
      setIsTyping(true)
      await new Promise(r => setTimeout(r, 800))
      
      // Agent response with typing effect
      setIsTyping(false)
      let text = ''
      for (let i = 0; i < conv.agent.length; i++) {
        text += conv.agent[i]
        setCurrentText(text)
        await new Promise(r => setTimeout(r, 20))
      }
      
      setMessages(prev => [...prev, { type: 'agent', text: conv.agent }])
      setCurrentText('')
      
      conversationIndex++
      await new Promise(r => setTimeout(r, 2000))
    }

    const interval = setInterval(runConversation, 6000)
    runConversation()
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass rounded-2xl p-4 h-64 flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/50">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-mono text-muted-foreground">AI Agent Online</span>
      </div>
      
      <div className="flex-1 overflow-hidden space-y-2">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-3 py-1.5 rounded-xl text-xs ${
              msg.type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-foreground'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        
        {currentText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] px-3 py-1.5 rounded-xl text-xs bg-muted text-foreground">
              {currentText}
              <span className="animate-pulse">|</span>
            </div>
          </motion.div>
        )}
        
        {isTyping && !currentText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="px-3 py-2 rounded-xl bg-muted">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

function DataFlowAnimation() {
  const [dataPoints, setDataPoints] = useState<Array<{ id: number, x: number, progress: number }>>([])

  useEffect(() => {
    let idCounter = 0
    
    const createDataPoint = () => {
      const newPoint = {
        id: idCounter++,
        x: Math.random() * 80 + 10,
        progress: 0
      }
      setDataPoints(prev => [...prev.slice(-8), newPoint])
    }

    const interval = setInterval(createDataPoint, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-32 overflow-hidden">
      {/* Flow lines */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-20">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        ))}
      </div>
      
      {/* Data points */}
      {dataPoints.map(point => (
        <motion.div
          key={point.id}
          className="absolute w-2 h-2 rounded-full bg-cyan-400"
          style={{ left: `${point.x}%`, filter: 'drop-shadow(0 0 8px #06b6d4)' }}
          initial={{ top: '-10%', opacity: 1 }}
          animate={{ top: '110%', opacity: 0 }}
          transition={{ duration: 2, ease: 'linear' }}
        />
      ))}
      
      {/* Processing indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-4 h-4 rounded-full bg-primary/50" />
        </motion.div>
      </div>
    </div>
  )
}

function MetricsDisplay() {
  const [metrics, setMetrics] = useState({
    accuracy: 94.7,
    latency: 23,
    throughput: 1250,
    activeAgents: 3
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        accuracy: 94 + Math.random() * 2,
        latency: 20 + Math.random() * 10,
        throughput: 1200 + Math.random() * 100,
        activeAgents: Math.floor(Math.random() * 3) + 2
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: 'Accuracy', value: `${metrics.accuracy.toFixed(1)}%`, color: 'text-green-400' },
        { label: 'Latency', value: `${metrics.latency.toFixed(0)}ms`, color: 'text-cyan-400' },
        { label: 'Throughput', value: `${metrics.throughput.toFixed(0)}/s`, color: 'text-blue-400' },
        { label: 'Active Agents', value: metrics.activeAgents.toString(), color: 'text-purple-400' },
      ].map((metric) => (
        <div key={metric.label} className="glass rounded-xl p-3 text-center">
          <div className={`text-lg font-bold font-mono ${metric.color}`}>
            {metric.value}
          </div>
          <div className="text-xs text-muted-foreground">{metric.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function AIAgentVisualization() {
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Neural Network Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs font-mono text-muted-foreground">neural_network.py</span>
          </div>
          <div className="h-80">
            <NeuralNetworkSVG />
          </div>
        </motion.div>

        {/* Right side - Agent Chat + Metrics */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AgentChatSimulation />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MetricsDisplay />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-4"
          >
            <div className="text-xs font-mono text-muted-foreground mb-2">REAL-TIME DATA FLOW</div>
            <DataFlowAnimation />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
