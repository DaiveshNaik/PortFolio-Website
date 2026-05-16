'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.015
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function CyanParticles() {
  const ref = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -state.clock.elapsedTime * 0.01
      ref.current.rotation.y = -state.clock.elapsedTime * 0.015
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null)
  const orb2Ref = useRef<THREE.Mesh>(null)
  const orb3Ref = useRef<THREE.Mesh>(null)
  const orb4Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(t * 0.3) * 4
      orb1Ref.current.position.y = Math.cos(t * 0.4) * 2.5
      orb1Ref.current.position.z = Math.sin(t * 0.2) * 2
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(t * 0.2) * 5
      orb2Ref.current.position.y = Math.sin(t * 0.3) * 3
      orb2Ref.current.position.z = Math.cos(t * 0.25) * 2
    }
    if (orb3Ref.current) {
      orb3Ref.current.position.x = Math.sin(t * 0.4 + 2) * 4.5
      orb3Ref.current.position.y = Math.cos(t * 0.2 + 1) * 2.5
      orb3Ref.current.position.z = Math.sin(t * 0.3 + 1) * 2
    }
    if (orb4Ref.current) {
      orb4Ref.current.position.x = Math.cos(t * 0.35 + 3) * 3.5
      orb4Ref.current.position.y = Math.sin(t * 0.25 + 2) * 3
      orb4Ref.current.position.z = Math.cos(t * 0.2 + 2) * 2
    }
  })

  return (
    <>
      <mesh ref={orb1Ref} position={[-3, 0, -5]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.25} />
      </mesh>
      <mesh ref={orb2Ref} position={[4, 1, -6]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
      </mesh>
      <mesh ref={orb3Ref} position={[0, -2, -4]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
      </mesh>
      <mesh ref={orb4Ref} position={[-2, 2, -5]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>
    </>
  )
}

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
  })

  const lines = useMemo(() => {
    const result: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = []
    for (let i = 0; i < 15; i++) {
      result.push({
        start: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 6
        ),
        end: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 6
        ),
      })
    }
    return result
  }, [])

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => {
        const points = [line.start, line.end]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial 
              attach="material" 
              color="#3b82f6" 
              transparent 
              opacity={0.1}
            />
          </line>
        )
      })}
    </group>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
        <CyanParticles />
        <FloatingOrbs />
        <ConnectionLines />
      </Canvas>
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      {/* Corner glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
    </div>
  )
}
