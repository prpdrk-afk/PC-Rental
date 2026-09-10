import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Deterministic pseudo-random number generator to satisfy React strict purity rules
 */
function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

/**
 * ParticleField — Lightweight floating cyber dust / network nodes
 * High-performance GPU rotation & float transform, zero buffer re-upload
 */
export default function ParticleField({ count = 160, color = '#00f5ff', radius = 10 }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3 + 1)
      const r2 = pseudoRandom(i * 3 + 2)
      const r3 = pseudoRandom(i * 3 + 3)

      pos[i * 3] = (r1 - 0.5) * radius * 2
      pos[i * 3 + 1] = (r2 - 0.5) * radius * 1.5 + 1.0
      pos[i * 3 + 2] = (r3 - 0.5) * radius * 2
    }
    return pos
  }, [count, radius])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry key={`${count}-${radius}`}>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
