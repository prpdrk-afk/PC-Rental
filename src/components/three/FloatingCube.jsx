import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

/**
 * FloatingCube — animated 3D icosahedron mesh inside the Hero scene.
 * Rotates slowly and distorts over time for an organic, futuristic feel.
 * Extend this component with more meshes, shaders, or animations as needed.
 */
export default function FloatingCube() {
  const meshRef = useRef()
  const innerRef = useRef()

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.12
    meshRef.current.rotation.y += delta * 0.18
    meshRef.current.rotation.z += delta * 0.06

    // gentle float
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.3

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.08
      innerRef.current.rotation.y -= delta * 0.14
    }
  })

  return (
    <group>
      {/* Outer glow wireframe */}
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Inner solid with distort */}
      <mesh ref={innerRef} scale={1.0}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#0d0d2b"
          emissive="#7b2ff7"
          emissiveIntensity={0.5}
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Accent ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={2.2}>
        <torusGeometry args={[1, 0.015, 8, 60]} />
        <meshStandardMaterial
          color="#7b2ff7"
          emissive="#7b2ff7"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  )
}
