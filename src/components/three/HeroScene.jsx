import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import ModelWrapper from './ModelWrapper'

function HeroBackdrop() {
  const texture = useTexture('/images/showroom-cyan-wall.png')

  return (
    <mesh position={[0, 2, -7.2]}>
      <planeGeometry args={[18, 10.125]} />
      <meshBasicMaterial map={texture} toneMapped={false} fog={false} />
    </mesh>
  )
}

function HeroComputer() {
  const { scene } = useGLTF('/models/environment/server-rack.glb')
  const groupRef = useRef()
  const dragRef = useRef({ active: false, x: 0, rotation: 0 })

  useFrame((_, delta) => {
    if (!groupRef.current || dragRef.current.active) return
    groupRef.current.rotation.y += delta * 0.35
  })

  return (
    <group
      ref={groupRef}
      position={[0, -1.3, 0]}
      onPointerDown={(event) => {
        event.stopPropagation()
        dragRef.current = { active: true, x: event.clientX, rotation: groupRef.current.rotation.y }
        event.target.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (!dragRef.current.active) return
        event.stopPropagation()
        groupRef.current.rotation.y = dragRef.current.rotation + (event.clientX - dragRef.current.x) * 0.012
      }}
      onPointerUp={(event) => {
        event.stopPropagation()
        dragRef.current.active = false
        if (event.target.hasPointerCapture(event.pointerId)) event.target.releasePointerCapture(event.pointerId)
      }}
      onPointerCancel={() => { dragRef.current.active = false }}
    >
      <ModelWrapper scene={scene} targetHeight={2.8} />
    </group>
  )
}

/**
 * HeroScene — Realistic Tier IV Cloud Server Room & Flagship PC Centerpiece
 * Features balanced PBR lighting, directional shadows, depth fog, and bounded OrbitControls
 */
export default function HeroScene() {
  return (
    <Canvas
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
      }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      shadows
    >
      {/* Background Color & Deep Atmosphere Fog */}
      <color attach="background" args={['#020a14']} />
      <fog attach="fog" args={['#020a14', 12, 24]} />

      {/* Initial Camera framing */}
      <PerspectiveCamera makeDefault position={[0, 0.5, 6.8]} fov={48} />

      {/* ── Balanced Realistic PBR Lighting ── */}
      {/* Base Soft Ambient Lighting */}
      <ambientLight intensity={0.45} />

      {/* Key Directional Light for crisp metallic highlights & shadows */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Left Aisle Neon Cyan Illumination */}
      <pointLight
        position={[-3.8, 2.5, 1.5]}
        color="#00f5ff"
        intensity={2.8}
        distance={12}
        decay={2}
      />

      {/* Right Aisle Neon Purple Illumination */}
      <pointLight
        position={[3.8, 2.5, 1.5]}
        color="#00b8e6"
        intensity={3.2}
        distance={12}
        decay={2}
      />

      {/* Focused Centerpiece Spotlight on Console & Master Rig */}
      <spotLight
        position={[0, 4.2, 2.5]}
        target-position={[0, -0.2, 0]}
        angle={0.55}
        penumbra={0.7}
        intensity={2.8}
        color="#ffffff"
        castShadow
      />

      {/* Deep Background Server Hall Glow */}
      <pointLight
        position={[0, 1.2, -4.5]}
        color="#00f5ff"
        intensity={1.6}
        distance={9}
        decay={2}
      />

      {/* Subtle floating cyber dust / network nodes */}

      {/* Realistic Server Room & Station */}
      <Suspense fallback={null}>
        <HeroBackdrop />
        <HeroComputer />
      </Suspense>

      {/* Interactive OrbitControls - Mouse & Touch with safe bounds */}
      <OrbitControls
        enableZoom={false}
        minDistance={3.8}
        maxDistance={9.8}
        enablePan={false}
        dampingFactor={0.06}
        enableDamping
        maxPolarAngle={Math.PI / 2 - 0.02} // never clip below floor
        minPolarAngle={Math.PI / 5}       // don't flip inverted
        maxAzimuthAngle={Math.PI / 3.4}   // framed inside room corridor
        minAzimuthAngle={-Math.PI / 3.4}
      />
    </Canvas>
  )
}
