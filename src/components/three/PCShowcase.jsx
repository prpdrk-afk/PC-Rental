import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import PCModel from './PCModel'
import ParticleField from './ParticleField'
import { packages } from '../../data/packages'

/**
 * PCShowcase — Interactive 3D Showcase for inspecting the 3 Realistic PC Tiers
 */
export default function PCShowcase({ onSelectPkg }) {
  const [hoveredId, setHoveredId] = useState(null)

  // Positions across the X-axis for Basic, Pro, Ultra
  const positions = [
    [-3.3, 0, 0], // Basic
    [0, 0, 0],    // Pro
    [3.3, 0, 0],  // Ultra
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: '580px' }}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        <PerspectiveCamera makeDefault position={[0, 1.4, 7.2]} fov={44} />

        {/* ── Realistic Studio Lighting for Hardware Showcase ── */}
        <ambientLight intensity={0.55} />

        {/* Overhead Key Light for crisp highlights */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.6}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Individual Hardware Spotlights */}
        {/* Basic Rig Spotlight (Cyan) */}
        <spotLight
          position={[-3.3, 4.5, 3]}
          target-position={[-3.3, 0.5, 0]}
          color="#00f5ff"
          intensity={2.8}
          angle={0.5}
          penumbra={0.7}
        />

        {/* Pro Rig Spotlight (Purple) */}
        <spotLight
          position={[0, 4.5, 3]}
          target-position={[0, 0.5, 0]}
          color="#7b2ff7"
          intensity={3.2}
          angle={0.5}
          penumbra={0.7}
        />

        {/* Ultra Rig Spotlight (Orange/Gold) */}
        <spotLight
          position={[3.3, 4.5, 3]}
          target-position={[3.3, 0.5, 0]}
          color="#ff6b35"
          intensity={3.0}
          angle={0.5}
          penumbra={0.7}
        />

        {/* Subtle Rim Fill Light from rear */}
        <pointLight position={[0, 2, -3]} color="#ffffff" intensity={0.8} />

        {/* Raised Showcase Platform Base */}
        <mesh position={[0, -0.12, 0]} receiveShadow>
          <boxGeometry args={[11.5, 0.12, 4.2]} />
          <meshStandardMaterial color="#080916" metalness={0.92} roughness={0.25} />
        </mesh>
        {/* Showcase Border Glow Rim */}
        <mesh position={[0, -0.05, 2.11]}>
          <boxGeometry args={[11.5, 0.02, 0.02]} />
          <meshBasicMaterial color="#00f5ff" toneMapped={false} />
        </mesh>

        {/* Cyber Floor Grid below */}
        <gridHelper
          args={[22, 22, '#00f5ff', '#10142c']}
          position={[0, -0.19, 0]}
        />

        {/* Floating atmospheric cyber dust */}
        <ParticleField count={100} color="#00f5ff" radius={7} />

        {/* 3 Detailed PC Models */}
        <Suspense fallback={null}>
          {packages.map((pkg, idx) => (
            <PCModel
              key={pkg.id}
              pkg={pkg}
              position={positions[idx]}
              onSelect={onSelectPkg}
              isHovered={hoveredId === pkg.id}
              onHoverChange={setHoveredId}
            />
          ))}
        </Suspense>

        {/* Interactive Camera Orbit - Mouse & Touch */}
        <OrbitControls
          enableZoom={true}
          minDistance={3.2}
          maxDistance={11.0}
          enablePan={false}
          dampingFactor={0.06}
          enableDamping
          maxPolarAngle={Math.PI / 2 - 0.05} // don't go below floor
          minPolarAngle={Math.PI / 4.5}
          maxAzimuthAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 3}
        />
      </Canvas>

      {/* Floating Guidance Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          background: 'rgba(5, 7, 22, 0.82)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 245, 255, 0.22)',
          borderRadius: '24px',
          padding: '7px 20px',
          fontSize: '0.82rem',
          color: '#8892b0',
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          letterSpacing: '0.06em',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 5,
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
        }}
      >
        <span>🖱️ ลากเพื่อหมุน 360°</span>
        <span>•</span>
        <span>🔍 ซูมดูชิ้นส่วนฮาร์ดแวร์</span>
        <span>•</span>
        <span style={{ color: '#00f5ff' }}>👆 คลิกที่เครื่องเพื่อดูสเปกเต็ม</span>
      </div>
    </div>
  )
}
