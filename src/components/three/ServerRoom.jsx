import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/**
 * ServerBladeUnit — Individual 1U/2U server blade with ventilation, drive caddies & LED activity lights
 */
function ServerBladeUnit({ y, accentColor = '#00f5ff', blinkPhase = 0 }) {
  const ledRef = useRef()

  useFrame((state) => {
    if (ledRef.current) {
      const t = state.clock.elapsedTime * 6 + blinkPhase
      // Realistic high-frequency network activity flickers
      ledRef.current.material.opacity = (Math.sin(t) > 0.1 && Math.cos(t * 1.7) > -0.3) ? 1.0 : 0.25
    }
  })

  return (
    <group position={[0, y, 0.42]}>
      {/* Server Steel Chassis Faceplate */}
      <mesh>
        <boxGeometry args={[0.96, 0.26, 0.04]} />
        <meshStandardMaterial color="#111320" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Drive Caddies (4 Hot-Swap Bays) */}
      {[-0.34, -0.12, 0.1, 0.32].map((x, idx) => (
        <group key={idx} position={[x, 0, 0.022]}>
          <mesh>
            <boxGeometry args={[0.18, 0.2, 0.01]} />
            <meshStandardMaterial color="#1c2032" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Drive Lever Handle */}
          <mesh position={[0.07, 0, 0.008]}>
            <boxGeometry args={[0.015, 0.16, 0.008]} />
            <meshStandardMaterial color="#2d334e" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Drive Activity Tiny LED */}
          <mesh position={[-0.06, 0.07, 0.007]}>
            <circleGeometry args={[0.006, 8]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#00f5ff' : '#00ff88'} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Network Status LED Array Bar */}
      <mesh position={[-0.42, 0, 0.025]} ref={ledRef}>
        <boxGeometry args={[0.04, 0.18, 0.005]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.8} toneMapped={false} />
      </mesh>
    </group>
  )
}

/**
 * ServerRackRealistic — 42U Heavy Data Center Server Cabinet with perforated door, handles & cable bundle
 */
function ServerRackRealistic({ position, rotation = [0, 0, 0], accentColor = '#00f5ff' }) {
  const bladeYs = useMemo(() => [-1.3, -0.98, -0.66, -0.34, -0.02, 0.3, 0.62, 0.94, 1.26], [])

  return (
    <group position={position} rotation={rotation}>
      {/* Heavy Cabinet Outer Structure */}
      <RoundedBox args={[1.18, 3.4, 1.1]} radius={0.02} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#080a14" metalness={0.92} roughness={0.3} />
      </RoundedBox>

      {/* Inner Server Bay Cavity */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[1.02, 3.24, 0.95]} />
        <meshStandardMaterial color="#05060d" roughness={0.7} />
      </mesh>

      {/* Stacked Server Units inside the rack */}
      {bladeYs.map((y, idx) => (
        <ServerBladeUnit
          key={idx}
          y={y}
          accentColor={accentColor}
          blinkPhase={idx * 1.8 + position[0]}
        />
      ))}

      {/* Vertical Perforated Front Glass/Mesh Door Frame */}
      <group position={[0, 0, 0.56]}>
        {/* Door Frame Border */}
        <mesh>
          <boxGeometry args={[1.12, 3.3, 0.02]} />
          <meshStandardMaterial color="#0b0d18" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Perforated Smoked Glass Window */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.96, 3.12]} />
          <meshPhysicalMaterial
            color="#0b1224"
            transmission={0.45}
            roughness={0.12}
            metalness={0.3}
            transparent
            opacity={0.65}
          />
        </mesh>
        {/* Vertical Brushed Steel Handle */}
        <mesh position={[0.48, 0, 0.04]}>
          <cylinderGeometry args={[0.016, 0.016, 0.9, 16]} />
          <meshStandardMaterial color="#c0c8de" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Key Lock Cylinders */}
        <mesh position={[0.48, 0.5, 0.025]}>
          <cylinderGeometry args={[0.012, 0.012, 0.02, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#dbe2f5" metalness={1.0} roughness={0.05} />
        </mesh>
      </group>

      {/* Vertical Architectural LED Accent Pillar Strip */}
      <mesh position={[0.57, 0, 0.54]}>
        <boxGeometry args={[0.025, 3.32, 0.015]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} />
      </mesh>
      <mesh position={[-0.57, 0, 0.54]}>
        <boxGeometry args={[0.025, 3.32, 0.015]} />
        <meshBasicMaterial color="#00b8e6" toneMapped={false} />
      </mesh>

      {/* Bundled Network Patch Cables (Cyan & Purple Cat6) running down rack corner */}
      <mesh position={[0.46, 0, 0.44]}>
        <cylinderGeometry args={[0.025, 0.025, 3.1, 12]} />
        <meshStandardMaterial color={accentColor} roughness={0.8} />
      </mesh>
      <mesh position={[-0.46, 0, 0.44]}>
        <cylinderGeometry args={[0.025, 0.025, 3.1, 12]} />
        <meshStandardMaterial color="#00b8e6" roughness={0.8} />
      </mesh>
    </group>
  )
}

/**
 * OverheadCableTrays — Suspended fiber optic cable ladder and conduits
 */
function OverheadCableTrays() {
  return (
    <group position={[0, 3.6, 0]}>
      {/* Left Tray Channel */}
      <group position={[-2.8, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 0.06, 18]} />
          <meshStandardMaterial color="#1a1d2e" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Yellow High-Density Fiber Optic Cables */}
        <mesh position={[-0.12, 0.04, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 18, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#007fa8" roughness={0.7} />
        </mesh>
        {/* Blue 10GbE Network Cables */}
        <mesh position={[0.12, 0.04, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 18, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#00d9ff" roughness={0.7} />
        </mesh>
        {/* Ceiling Hanger Unistrut Rods */}
        {[-6, -2, 2, 6].map((z, i) => (
          <mesh key={i} position={[0, 0.4, z]}>
            <cylinderGeometry args={[0.012, 0.012, 0.8, 8]} />
            <meshStandardMaterial color="#6b7490" metalness={0.95} />
          </mesh>
        ))}
      </group>

      {/* Right Tray Channel */}
      <group position={[2.8, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 0.06, 18]} />
          <meshStandardMaterial color="#1a1d2e" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[-0.12, 0.04, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 18, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#00f5ff" roughness={0.7} />
        </mesh>
        <mesh position={[0.12, 0.04, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 18, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#00b8e6" roughness={0.7} />
        </mesh>
        {[-6, -2, 2, 6].map((z, i) => (
          <mesh key={i} position={[0, 0.4, z]}>
            <cylinderGeometry args={[0.012, 0.012, 0.8, 8]} />
            <meshStandardMaterial color="#6b7490" metalness={0.95} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/**
 * CenterpieceStation — High-end cloud computing master console positioned at midground
 */
function CenterpieceStation() {
  const groupRef = useRef()
  const displayRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle breathing elevation
      groupRef.current.position.y =
        -0.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.08 - 0.15
    }
    if (displayRef.current) {
      displayRef.current.material.emissiveIntensity =
        0.9 + Math.sin(state.clock.elapsedTime * 2.5) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.15, 0.4]}>
      {/* Heavy CNC Machined Hologram Base */}
      <group position={[0, -1.5, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[1.7, 1.9, 0.18, 48]} />
          <meshStandardMaterial color="#080a18" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Glowing Concentric Neon Rings */}
        <mesh position={[0, 0.092, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 1.62, 48]} />
          <meshBasicMaterial color="#00f5ff" side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.093, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.05, 1.15, 48]} />
          <meshBasicMaterial color="#00b8e6" side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      </group>

      {/* Cloud Terminal Console Desk */}
      <RoundedBox args={[2.7, 0.09, 1.2]} position={[0, -0.9, 0.1]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#0c0e1e" metalness={0.85} roughness={0.25} />
      </RoundedBox>

      {/* Master Flagship Liquid-Cooled Server Tower on Desk */}
      <group position={[0.85, -0.28, 0]}>
        <RoundedBox args={[0.55, 1.15, 0.95]} radius={0.02} smoothness={4} castShadow>
          <meshStandardMaterial color="#0a0c16" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        {/* Tempered Glass Window */}
        <mesh position={[-0.26, 0, 0]}>
          <boxGeometry args={[0.015, 1.05, 0.85]} />
          <meshPhysicalMaterial
            color="#00f5ff"
            transmission={0.8}
            roughness={0.05}
            metalness={0.1}
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Internal Glowing RGB Core */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.35, 0.7, 0.6]} />
          <meshStandardMaterial
            color="#060814"
            emissive="#00b8e6"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Ultra-Wide Curved Panoramic Terminal Display (49" Super Ultra-Wide) */}
      <group position={[-0.35, -0.15, 0.15]} rotation={[0, 0.12, 0]}>
        {/* Dual Articulated Monitor Arms */}
        <mesh position={[0, -0.42, -0.28]}>
          <cylinderGeometry args={[0.035, 0.045, 0.65, 16]} />
          <meshStandardMaterial color="#1a2036" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, -0.72, -0.2]}>
          <boxGeometry args={[0.6, 0.04, 0.35]} />
          <meshStandardMaterial color="#111424" metalness={0.9} />
        </mesh>

        {/* Display Bezel Frame */}
        <RoundedBox args={[2.2, 0.92, 0.06]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#0b0e1b" metalness={0.9} roughness={0.2} />
        </RoundedBox>

        {/* High-Resolution Data Center Control Matrix Screen */}
        <mesh position={[0, 0, 0.033]} ref={displayRef}>
          <planeGeometry args={[2.14, 0.86]} />
          <meshStandardMaterial
            color="#040916"
            emissive="#00f5ff"
            emissiveIntensity={0.85}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Cyber Mechanical Keyboard & Glass Touchpad */}
      <mesh position={[-0.35, -0.84, 0.38]}>
        <boxGeometry args={[0.75, 0.025, 0.26]} />
        <meshStandardMaterial color="#0f1224" emissive="#00f5ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.2, -0.84, 0.38]}>
        <boxGeometry args={[0.15, 0.02, 0.22]} />
        <meshStandardMaterial color="#0d1020" emissive="#00b8e6" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

/**
 * ServerRoom — Realistic Tier IV Data Center Architecture
 */
export default function ServerRoom() {
  return (
    <group>
      {/* 1. Raised Data Center Tile Floor (60x60cm bevelled panels) */}
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial
          color="#060712"
          metalness={0.88}
          roughness={0.32}
        />
      </mesh>

      {/* Tile Seam Grid Lines */}
      <gridHelper
        args={[32, 32, '#00f5ff', '#14172e']}
        position={[0, -2.385, 0]}
      />

      {/* Floor Airflow Perforated Vent Tiles */}
      {[-1.8, 1.8].map((x, i) =>
        [-4, -2, 0, 2, 4].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, -2.38, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.9, 0.9]} />
            <meshStandardMaterial color="#0a0d1d" roughness={0.9} wireframe />
          </mesh>
        ))
      )}

      {/* 2. Ceiling Grid Structure & Troffer Strip Lights */}
      <group position={[0, 4.4, 0]}>
        <mesh>
          <boxGeometry args={[26, 0.2, 26]} />
          <meshStandardMaterial color="#070914" roughness={0.8} />
        </mesh>
        {/* Recessed Architectural Linear LED Troffers */}
        <mesh position={[-2.8, -0.09, 0]}>
          <boxGeometry args={[0.15, 0.02, 18]} />
          <meshBasicMaterial color="#00f5ff" toneMapped={false} />
        </mesh>
        <mesh position={[2.8, -0.09, 0]}>
          <boxGeometry args={[0.15, 0.02, 18]} />
          <meshBasicMaterial color="#00b8e6" toneMapped={false} />
        </mesh>
      </group>

      {/* 3. Overhead Cable Run Systems */}
      <OverheadCableTrays />

      {/* 4. Left Aisle Server Racks (Foreground / Midground / Deep Background) */}
      <ServerRackRealistic position={[-4.0, -0.6, -3.2]} rotation={[0, Math.PI / 5, 0]} accentColor="#00f5ff" />
      <ServerRackRealistic position={[-4.5, -0.6, -0.5]} rotation={[0, Math.PI / 4, 0]} accentColor="#00b8e6" />
      <ServerRackRealistic position={[-4.2, -0.6, 2.2]} rotation={[0, Math.PI / 6, 0]} accentColor="#00f5ff" />
      <ServerRackRealistic position={[-3.8, -0.6, 4.8]} rotation={[0, Math.PI / 8, 0]} accentColor="#00b8e6" />

      {/* 5. Right Aisle Server Racks */}
      <ServerRackRealistic position={[4.0, -0.6, -3.2]} rotation={[0, -Math.PI / 5, 0]} accentColor="#00b8e6" />
      <ServerRackRealistic position={[4.5, -0.6, -0.5]} rotation={[0, -Math.PI / 4, 0]} accentColor="#00f5ff" />
      <ServerRackRealistic position={[4.2, -0.6, 2.2]} rotation={[0, -Math.PI / 6, 0]} accentColor="#00b8e6" />
      <ServerRackRealistic position={[3.8, -0.6, 4.8]} rotation={[0, -Math.PI / 8, 0]} accentColor="#00f5ff" />

      {/* 6. Deep Background End-of-Row Wall Racks */}
      <ServerRackRealistic position={[-1.8, -0.6, -6.0]} rotation={[0, 0, 0]} accentColor="#00f5ff" />
      <ServerRackRealistic position={[0, -0.6, -6.3]} rotation={[0, 0, 0]} accentColor="#00b8e6" />
      <ServerRackRealistic position={[1.8, -0.6, -6.0]} rotation={[0, 0, 0]} accentColor="#00f5ff" />

      {/* 7. Cold-Aisle Glass Containment Sliding Doors at the Rear */}
      <group position={[0, -0.6, -5.0]}>
        <mesh>
          <boxGeometry args={[3.2, 3.4, 0.04]} />
          <meshPhysicalMaterial
            color="#081020"
            transmission={0.65}
            roughness={0.08}
            metalness={0.2}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Door Frame Mullions */}
        <mesh position={[0, 0, 0.025]}>
          <boxGeometry args={[0.06, 3.4, 0.03]} />
          <meshStandardMaterial color="#1a2034" metalness={0.95} />
        </mesh>
      </group>

      {/* 8. Centerpiece Master Cloud Terminal Station */}
      <CenterpieceStation />
    </group>
  )
}
