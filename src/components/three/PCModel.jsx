import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import {
  CaseChassis,
  MotherboardDetailed,
  RAMSticks,
  GPUDetailed,
  AirCoolerTower,
  LiquidCoolerAIO,
  CustomLiquidLoop,
  RGBFan,
} from './DetailedPCComponents'

/**
 * BasicRig — Entry-level clean air-cooled gaming PC
 */
function BasicRig({ rgbColor, isHovered }) {
  return (
    <CaseChassis
      caseWidth={0.46}
      caseHeight={1.06}
      caseDepth={0.96}
      rgbColor={rgbColor}
      glassTint="#e8f4fc"
    >
      {/* Interior Ambient Fill Light */}
      <pointLight
        position={[0, 0.6, 0]}
        color={rgbColor}
        intensity={isHovered ? 2.5 : 1.2}
        distance={2.5}
      />

      {/* Motherboard */}
      <MotherboardDetailed position={[0.18, 0.28, 0]} />

      {/* CPU Air Cooler Tower */}
      <AirCoolerTower position={[0.08, 0.72, -0.05]} rgbColor={rgbColor} />

      {/* 2x DDR5 RAM Sticks */}
      <RAMSticks count={2} position={[0.15, 0.64, 0.16]} rgbColor={rgbColor} />

      {/* Dual-Fan Mid-Tier GPU */}
      <GPUDetailed
        position={[0.08, 0.44, 0.02]}
        fanCount={2}
        cardLength={0.68}
        rgbColor={rgbColor}
      />

      {/* Rear 120mm Exhaust Fan */}
      <RGBFan
        position={[0.08, 0.72, -0.42]}
        rotation={[0, 0, 0]}
        scale={0.8}
        rgbColor={rgbColor}
        speed={6}
      />

      {/* Front Intake Fan */}
      <RGBFan
        position={[0.08, 0.6, 0.42]}
        rotation={[0, Math.PI, 0]}
        scale={0.8}
        rgbColor={rgbColor}
        speed={6}
      />
    </CaseChassis>
  )
}

/**
 * ProRig — High-performance 240mm AIO liquid-cooled gaming PC
 */
function ProRig({ rgbColor, isHovered }) {
  return (
    <CaseChassis
      caseWidth={0.52}
      caseHeight={1.18}
      caseDepth={1.06}
      rgbColor={rgbColor}
      glassTint="#f4ecff"
    >
      {/* Interior Dual RGB Glow */}
      <pointLight
        position={[0, 0.65, 0]}
        color={rgbColor}
        intensity={isHovered ? 3.2 : 1.6}
        distance={2.8}
      />
      <pointLight
        position={[0, 0.35, 0.1]}
        color="#00f5ff"
        intensity={isHovered ? 2.0 : 0.8}
        distance={2.2}
      />

      {/* Motherboard */}
      <MotherboardDetailed position={[0.2, 0.28, 0]} />

      {/* 240mm Liquid Cooler AIO */}
      <LiquidCoolerAIO position={[0.1, 0.2, 0]} rgbColor={rgbColor} />

      {/* 4x DDR5 RAM Sticks with RGB Lightbars */}
      <RAMSticks count={4} position={[0.18, 0.68, 0.18]} rgbColor="#00f5ff" />

      {/* Triple-Fan High-Performance GPU */}
      <GPUDetailed
        position={[0.09, 0.45, 0.02]}
        fanCount={3}
        cardLength={0.82}
        rgbColor={rgbColor}
      />

      {/* Rear Exhaust Fan */}
      <RGBFan
        position={[0.1, 0.78, -0.46]}
        rotation={[0, 0, 0]}
        scale={0.85}
        rgbColor={rgbColor}
        speed={8}
      />

      {/* Dual Front Intake RGB Fans */}
      <RGBFan
        position={[0.1, 0.8, 0.46]}
        rotation={[0, Math.PI, 0]}
        scale={0.85}
        rgbColor="#00f5ff"
        speed={8}
      />
      <RGBFan
        position={[0.1, 0.45, 0.46]}
        rotation={[0, Math.PI, 0]}
        scale={0.85}
        rgbColor={rgbColor}
        speed={8}
      />
    </CaseChassis>
  )
}

/**
 * UltraRig — Flagship Custom Liquid Loop cooling with reservoir & monster GPU
 */
function UltraRig({ rgbColor, isHovered }) {
  return (
    <CaseChassis
      caseWidth={0.58}
      caseHeight={1.3}
      caseDepth={1.16}
      rgbColor={rgbColor}
      glassTint="#fff4ee"
    >
      {/* High-Intensity Multi-zone Lighting */}
      <pointLight
        position={[0, 0.75, 0.1]}
        color={rgbColor}
        intensity={isHovered ? 4.0 : 2.2}
        distance={3.2}
      />
      <pointLight
        position={[0, 0.35, -0.1]}
        color="#00f5ff"
        intensity={isHovered ? 3.0 : 1.4}
        distance={3.0}
      />

      {/* Motherboard */}
      <MotherboardDetailed position={[0.22, 0.32, 0]} />

      {/* Extreme Custom Open-Loop Liquid Cooling with Reservoir & Hardline Tubes */}
      <CustomLiquidLoop position={[0.12, 0.22, 0]} rgbColor={rgbColor} />

      {/* 4x Extreme DDR5 RAM Sticks */}
      <RAMSticks count={4} position={[0.2, 0.76, 0.2]} rgbColor="#00f5ff" />

      {/* Monster Flagship RTX 4090 GPU with Anti-Sag Bracket */}
      <GPUDetailed
        position={[0.11, 0.48, 0.04]}
        fanCount={3}
        cardLength={0.94}
        rgbColor={rgbColor}
        isExtreme={true}
      />

      {/* Rear Exhaust Fan */}
      <RGBFan
        position={[0.12, 0.86, -0.5]}
        rotation={[0, 0, 0]}
        scale={0.9}
        rgbColor={rgbColor}
        speed={9}
      />

      {/* Triple Front Intake Fans */}
      <RGBFan
        position={[0.12, 0.96, 0.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.86}
        rgbColor="#00f5ff"
        speed={9}
      />
      <RGBFan
        position={[0.12, 0.64, 0.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.86}
        rgbColor={rgbColor}
        speed={9}
      />
      <RGBFan
        position={[0.12, 0.32, 0.5]}
        rotation={[0, Math.PI, 0]}
        scale={0.86}
        rgbColor="#7b2ff7"
        speed={9}
      />
    </CaseChassis>
  )
}

/**
 * PCModel — Realistic Gaming PC with full PBR hardware anatomy, hover elevation, and click interaction
 */
export default function PCModel({
  pkg,
  position,
  isSelected,
  onSelect,
  isHovered,
  onHoverChange,
}) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Target hover elevation: lift up slightly and rotate slightly toward user
    const targetY = position[1] + (isHovered || isSelected ? 0.12 : 0)
    const idleSway = Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.02
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY + idleSway,
      6,
      delta
    )

    // Smooth hover scale
    const targetScale = isSelected ? 1.06 : isHovered ? 1.04 : 1.0
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(pkg)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHoverChange(pkg.id)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        onHoverChange(null)
        document.body.style.cursor = 'auto'
      }}
    >
      {/* Heavy Anodized Pedestal Stand */}
      <group position={[0, -0.06, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[1.1, 1.25, 0.08, 36]} />
          <meshStandardMaterial color="#080914" metalness={0.95} roughness={0.2} />
        </mesh>
        {/* Recessed Glowing Neon Riser Ring */}
        <mesh position={[0, 0.041, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.98, 1.08, 36]} />
          <meshBasicMaterial color={pkg.color} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      </group>

      {/* Selected Vertical Light Cylinder */}
      {isSelected && (
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[1.15, 1.15, 1.8, 32, 1, true]} />
          <meshBasicMaterial
            color={pkg.color}
            transparent
            opacity={0.14}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* High-Detail PC Assembly per tier */}
      {pkg.id === 'basic' && <BasicRig rgbColor={pkg.color} isHovered={isHovered} />}
      {pkg.id === 'pro' && <ProRig rgbColor={pkg.color} isHovered={isHovered} />}
      {pkg.id === 'ultra' && <UltraRig rgbColor={pkg.color} isHovered={isHovered} />}

      {/* 3D Floating Tag & Price Badge */}
      <Html
        position={[0, 1.75, 0]}
        center
        distanceFactor={7.5}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div
          style={{
            background: isSelected
              ? 'rgba(6, 8, 26, 0.95)'
              : 'rgba(6, 8, 26, 0.82)',
            backdropFilter: 'blur(14px)',
            border: `1.5px solid ${pkg.color}`,
            borderRadius: '24px',
            padding: '7px 18px',
            color: '#fff',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.08em',
            boxShadow: isHovered || isSelected ? `0 0 24px ${pkg.glowColor}` : '0 4px 16px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            transform: isHovered || isSelected ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <span style={{ color: pkg.color, fontSize: '15px' }}>{pkg.icon}</span>
          <span>{pkg.name.toUpperCase()} RIG</span>
          <span
            style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '12px',
              padding: '2px 9px',
              color: pkg.color,
              fontSize: '12px',
              fontWeight: 800,
            }}
          >
            ฿{pkg.price}/ชม.
          </span>
        </div>
      </Html>
    </group>
  )
}
