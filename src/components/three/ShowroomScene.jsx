import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer, PerspectiveCamera, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import PCStationGLTF from './PCStationGLTF'
import CinematicCameraRig from './CinematicCameraRig'
import ParticleField from './ParticleField'
import { packages } from '../../data/packages'
import assetUrl from '../../utils/assetUrl'

/**
 * ShowroomEnvironment — Realistic modern showroom interior with reflective floor, acoustic walls & server racks
 */
function ShowroomEnvironment() {
  return (
    <group>
      {/* 1. Reflective Polished Showroom Floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 20]} />
        <meshPhysicalMaterial
          color="#04101f"
          metalness={0.72}
          roughness={0.23}
          clearcoat={0.8}
          clearcoatRoughness={0.16}
        />
      </mesh>

      {/* Subtle Data Center Tile Seam Grid */}
      <gridHelper
        args={[28, 28, '#087ea4', '#071b31']}
        position={[0, 0.002, 0]}
      />

      {/* 2. Rear Cyber Showroom Wall with Architectural Slats */}
      <group position={[0, 2.5, -2.4]} visible={false}>
        {/* Dark Backing Wall */}
        <mesh receiveShadow>
          <boxGeometry args={[24, 5.2, 0.1]} />
          <meshStandardMaterial color="#050712" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Vertical Acoustic Wood/Metal Slats */}
        {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map((x) => (
          <mesh key={x} position={[x, 0, 0.06]}>
            <boxGeometry args={[0.3, 4.8, 0.04]} />
            <meshStandardMaterial color="#121629" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}

        {/* Back-Illuminated Architectural Neon Light Bars */}
        <mesh position={[0, 1.8, 0.08]}>
          <boxGeometry args={[18, 0.03, 0.02]} />
          <meshBasicMaterial color="#00f5ff" toneMapped={false} />
        </mesh>
        <mesh position={[0, -1.2, 0.08]}>
          <boxGeometry args={[18, 0.03, 0.02]} />
          <meshBasicMaterial color="#7b2ff7" toneMapped={false} />
        </mesh>
      </group>

      {/* 3. Flanking Side Server Racks for Data Center Immersion */}
      {/* Left Server Rack Bay */}
      <group position={[-5.8, 1.7, -1.0]} rotation={[0, Math.PI / 4, 0]} visible={false}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 3.5, 0.9]} />
          <meshStandardMaterial color="#0a0c18" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.46]}>
          <boxGeometry args={[1.05, 3.3, 0.02]} />
          <meshPhysicalMaterial color="#00f5ff" transmission={0.5} roughness={0.1} transparent opacity={0.6} />
        </mesh>
        <mesh position={[0.55, 0, 0.46]}>
          <boxGeometry args={[0.02, 3.4, 0.02]} />
          <meshBasicMaterial color="#00f5ff" toneMapped={false} />
        </mesh>
      </group>

      {/* Right Server Rack Bay */}
      <group position={[5.8, 1.7, -1.0]} rotation={[0, -Math.PI / 4, 0]} visible={false}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 3.5, 0.9]} />
          <meshStandardMaterial color="#0a0c18" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.46]}>
          <boxGeometry args={[1.05, 3.3, 0.02]} />
          <meshPhysicalMaterial color="#7b2ff7" transmission={0.5} roughness={0.1} transparent opacity={0.6} />
        </mesh>
        <mesh position={[-0.55, 0, 0.46]}>
          <boxGeometry args={[0.02, 3.4, 0.02]} />
          <meshBasicMaterial color="#7b2ff7" toneMapped={false} />
        </mesh>
      </group>

      {/* 4. Overhead Cyber Light Conduits */}
      <mesh position={[-3, 4.6, 0]} visible={false}>
        <cylinderGeometry args={[0.03, 0.03, 14, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#00f5ff" toneMapped={false} />
      </mesh>
      <mesh position={[3, 4.6, 0]} visible={false}>
        <cylinderGeometry args={[0.03, 0.03, 14, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#7b2ff7" toneMapped={false} />
      </mesh>
    </group>
  )
}

/** A full-bleed visual backdrop, kept behind the real GLB stations. */
function GamingRoomBackdrop() {
  const texture = useTexture(assetUrl('images/showroom-cyan-wall.png'))

  return (
    <mesh position={[0, 3.1, -2.32]}>
      <planeGeometry args={[14, 7.875]} />
      <meshBasicMaterial map={texture} toneMapped={false} fog={false} />
    </mesh>
  )
}

/**
 * ShowroomScene — The unified Realistic 3D Showroom containing the 3 GLB Gaming PC Stations
 */
export default function ShowroomScene({ selectedPkg, onSelectPkg }) {
  const [hoveredId, setHoveredId] = useState(null)

  const stationConfigs = [
    { pkg: packages[0], model: assetUrl('models/basic_station.glb'), pos: [-2.6, 0, 0] },
    { pkg: packages[1], model: assetUrl('models/pro_station.glb'), pos: [0, 0, 0] },
    { pkg: packages[2], model: assetUrl('models/ultra_station.glb'), pos: [2.6, 0, 0] },
  ]

  return (
    <div className="showroom-container">
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        shadows
      >
        <color attach="background" args={['#050612']} />
        <fog attach="fog" args={['#050612', 12, 28]} />

        <PerspectiveCamera makeDefault position={[0, 1.9, 5.8]} fov={45} />

        {/* ── Realistic Studio & Showroom Lighting ── */}
        <ambientLight intensity={0.72} />

        {/* Self-contained studio environment for glass, metal, and paint reflections. */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={5}
            color="#ffffff"
            position={[0, 5, 4]}
            rotation={[Math.PI / 2, 0, Math.PI]}
            scale={[10, 5, 1]}
          />
          <Lightformer
            form="rect"
            intensity={3}
            color="#d9faff"
            position={[-6, 2, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[5, 4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2.5}
            color="#bda4ff"
            position={[6, 2, -1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[5, 4, 1]}
          />
        </Environment>

        {/* Key Directional Shadow-Casting Light */}
        <directionalLight
          position={[4, 7, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        {/* Focused Spotlights for each station */}
        {/* Basic Station Spotlight */}
        <spotLight
          position={[-2.6, 4.5, 2.5]}
          target-position={[-2.6, 0.8, 0]}
          color="#00f5ff"
          intensity={3.2}
          angle={0.55}
          penumbra={0.7}
        />

        {/* Pro Station Spotlight */}
        <spotLight
          position={[0, 4.5, 2.5]}
          target-position={[0, 0.8, 0]}
          color="#7b2ff7"
          intensity={3.5}
          angle={0.55}
          penumbra={0.7}
        />

        {/* Ultra Station Spotlight */}
        <spotLight
          position={[2.6, 4.5, 2.5]}
          target-position={[2.6, 0.8, 0]}
          color="#ff6b35"
          intensity={3.2}
          angle={0.55}
          penumbra={0.7}
        />

        {/* Rear Rim Light */}
        <pointLight position={[0, 2, -2]} color="#ffffff" intensity={0.9} />

        {/* Subtle Cyber Dust Atmosphere */}
        <ParticleField count={100} color="#00f5ff" radius={7} />

        {/* Showroom Architecture */}
        <ShowroomEnvironment />
        <GamingRoomBackdrop />

        {/* 3 Realistic GLB Stations */}
        <Suspense fallback={null}>
          {stationConfigs.map(({ pkg, model, pos }) => (
            <PCStationGLTF
              key={pkg.id}
              modelPath={model}
              pkg={pkg}
              position={pos}
              isHovered={hoveredId === pkg.id}
              isSelected={selectedPkg?.id === pkg.id}
              onHover={setHoveredId}
              onSelect={onSelectPkg}
            />
          ))}
        </Suspense>

        {/* Smooth Cinematic Camera Rig */}
        <CinematicCameraRig focusedTier={selectedPkg?.id || null} />
      </Canvas>

      {/* Floating Instructions Bar when in overview */}
      {!selectedPkg && (
        <div className="showroom-hint">
          <span>🎮 คลิกที่สถานี PC เพื่อซูมกล้องและดูสเปกจำลอง</span>
          <span>•</span>
          <span style={{ color: '#00f5ff' }}>BASIC • PRO • ULTRA</span>
        </div>
      )}
      {selectedPkg && (
        <div className="showroom-hint">
          <span>ลากเพื่อหมุนดู PC รอบตัว</span>
          <span>↔</span>
          <span style={{ color: selectedPkg.color }}>DRAG / TOUCH</span>
        </div>
      )}
    </div>
  )
}
