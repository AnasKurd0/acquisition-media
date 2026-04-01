'use client'
import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const { mouse, size } = useThree()

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      const isLime = Math.random() > 0.5
      colors[i * 3] = isLime ? 0.91 : 1
      colors[i * 3 + 1] = isLime ? 1 : 1
      colors[i * 3 + 2] = isLime ? 0 : 1
    }
    return { positions, colors }
  }, [count])

  const originalPositions = useMemo(() => positions.slice(), [positions])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const geo = meshRef.current.geometry
    const pos = geo.attributes.position.array as Float32Array
    const t = clock.getElapsedTime()

    const mx = (mouse.x * size.width) / size.width * 5
    const my = (mouse.y * size.height) / size.height * 3
    const radius = 1.5

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      pos[ix] = originalPositions[ix] + Math.sin(t * 0.2 + i * 0.01) * 0.05
      pos[ix + 1] = originalPositions[ix + 1] + Math.cos(t * 0.15 + i * 0.008) * 0.05
      pos[ix + 2] = originalPositions[ix + 2]

      const dx = pos[ix] - mx
      const dy = pos[ix + 1] - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < radius) {
        const force = (radius - dist) / radius
        pos[ix] += dx * force * 0.04
        pos[ix + 1] += dy * force * 0.04
      }
    }

    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial size={0.015} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export function WebGLCanvas() {
  const [shouldRender, setShouldRender] = useState(false)
  const [particleCount, setParticleCount] = useState(1800)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const isMobile = window.innerWidth < 768
    setParticleCount(isMobile ? 900 : 1800)
    setShouldRender(true)
  }, [])

  if (!shouldRender) return null

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 70 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles count={particleCount} />
      </Canvas>
    </div>
  )
}
