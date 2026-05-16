'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }, [cursorX, cursorY])

  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])
  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for interactive elements
      const isInteractive = target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('[data-cursor]')
      
      if (isInteractive) {
        setIsHovering(true)
        const cursorData = target.getAttribute('data-cursor') || 
          target.closest('[data-cursor]')?.getAttribute('data-cursor')
        setCursorText(cursorData || '')
      } else {
        setIsHovering(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave])

  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[200] hidden md:flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: isHovering ? 60 : 12,
            height: isHovering ? 60 : 12,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ marginLeft: -6, marginTop: -6 }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: isHovering ? 'rgb(6, 182, 212)' : 'rgb(59, 130, 246)',
              background: isHovering 
                ? 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)' 
                : 'transparent',
            }}
            animate={{
              scale: isClicking ? 0.9 : 1,
              borderWidth: isHovering ? 2 : 2,
            }}
          />
          
          {/* Inner dot */}
          <motion.div
            className="absolute rounded-full bg-gradient-to-r from-primary to-accent"
            animate={{
              width: isHovering ? 8 : 6,
              height: isHovering ? 8 : 6,
              opacity: isHovering ? 0.8 : 1,
            }}
          />

          {/* Cursor text */}
          {cursorText && isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute text-[10px] font-mono text-cyan-400 whitespace-nowrap"
              style={{ top: '100%', marginTop: 8 }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Trailing particles */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[199] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: 4 - i,
              height: 4 - i,
              marginLeft: -2 + i * 0.5,
              marginTop: -2 + i * 0.5,
            }}
            animate={{
              scale: isHovering ? [1, 1.5, 1] : 1,
              opacity: isHovering ? [0.3, 0.6, 0.3] : 0.2,
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* Glow effect on hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[198] hidden md:block"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div 
            className="w-32 h-32 rounded-full blur-2xl"
            style={{
              marginLeft: -64,
              marginTop: -64,
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}
    </>
  )
}
