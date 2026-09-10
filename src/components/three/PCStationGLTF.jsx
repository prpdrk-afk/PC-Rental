import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import ModelWrapper from './ModelWrapper'

/**
 * PCStationGLTF — Loads realistic 3D gaming station GLB model
 * Handles hover elevation, glow effects, cursor changes, and click focus
 */
export default function PCStationGLTF({
  modelPath,
  pkg,
  position = [0, 0, 0],
  isHovered,
  isSelected,
  onHover,
  onSelect,
}) {
  const { scene } = useGLTF(modelPath)
  const groupRef = useRef()
  const modelRef = useRef()
  const rotationTarget = useRef({ x: 0, y: 0 })
  const dragState = useRef({ active: false, pointerId: null, startX: 0, startY: 0, rotationX: 0, rotationY: 0 })
  const suppressClick = useRef(false)

  useEffect(() => () => {
    document.body.style.cursor = 'auto'
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Hover / selected lift animation
    const targetY = position[1] + (isHovered || isSelected ? 0.08 : 0)
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetY,
      6,
      delta
    )

    // Subtle scale feedback
    const targetScale = isSelected ? 1.04 : isHovered ? 1.02 : 1.0
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

    // Keep the selected product responsive while softening the rotation input.
    if (modelRef.current) {
      modelRef.current.rotation.x = THREE.MathUtils.damp(
        modelRef.current.rotation.x,
        rotationTarget.current.x,
        14,
        delta
      )
      modelRef.current.rotation.y = THREE.MathUtils.damp(
        modelRef.current.rotation.y,
        rotationTarget.current.y,
        14,
        delta
      )
    }
  })

  const handlePointerDown = (e) => {
    if (!isSelected) return

    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)
    dragState.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      rotationX: rotationTarget.current.x,
      rotationY: rotationTarget.current.y,
    }
    document.body.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e) => {
    const drag = dragState.current
    if (!drag.active || drag.pointerId !== e.pointerId) return

    e.stopPropagation()
    const deltaX = e.clientX - drag.startX
    const deltaY = e.clientY - drag.startY
    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) suppressClick.current = true

    rotationTarget.current.y = drag.rotationY + deltaX * 0.012
    rotationTarget.current.x = THREE.MathUtils.clamp(
      drag.rotationX + deltaY * 0.006,
      -0.35,
      0.35
    )
  }

  const handlePointerUp = (e) => {
    const drag = dragState.current
    if (!drag.active || drag.pointerId !== e.pointerId) return

    e.stopPropagation()
    if (e.target.hasPointerCapture(e.pointerId)) e.target.releasePointerCapture(e.pointerId)
    dragState.current.active = false
    document.body.style.cursor = 'grab'
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        if (suppressClick.current) {
          suppressClick.current = false
          return
        }
        onSelect(pkg)
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(pkg.id)
        document.body.style.cursor = isSelected ? 'grab' : 'pointer'
      }}
      onPointerOut={() => {
        onHover(null)
        document.body.style.cursor = dragState.current.active
          ? 'grabbing'
          : isSelected
            ? 'grab'
            : 'auto'
      }}
    >
      {/* Heavy Anodized Platform Base */}
      <group position={[0, -0.01, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[1.3, 1.45, 0.05, 36]} />
          <meshStandardMaterial color="#080a18" metalness={0.95} roughness={0.25} />
        </mesh>
        {/* Neon Platform Border Ring */}
        <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.28, 36]} />
          <meshBasicMaterial
            color={pkg.color}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Reveal the selected product with light instead of an overlay mesh. */}
      {isSelected && (
        <pointLight
          position={[0, 1.2, 1.6]}
          color="#ffffff"
          intensity={9}
          distance={4.5}
          decay={2}
        />
      )}

      {/* The loaded station is normalized locally without altering its source GLB. */}
      <group ref={modelRef}>
        <ModelWrapper scene={scene} targetHeight={1.5} debug={false} />
      </group>

      {/* Floating 3D Badge */}
      <Html
        position={[0, 2.05, 0]}
        center
        distanceFactor={8}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div
          style={{
            background: isSelected
              ? 'rgba(6, 8, 28, 0.96)'
              : 'rgba(6, 8, 28, 0.85)',
            backdropFilter: 'blur(14px)',
            border: `1.5px solid ${pkg.color}`,
            borderRadius: '24px',
            padding: '7px 20px',
            color: '#fff',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.08em',
            boxShadow: isHovered || isSelected ? `0 0 24px ${pkg.glowColor}` : '0 4px 16px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            whiteSpace: 'nowrap',
            transform: isHovered || isSelected ? 'scale(1.12)' : 'scale(1)',
          }}
        >
          <span style={{ color: pkg.color, fontSize: '15px' }}>{pkg.icon}</span>
          <span>{pkg.name.toUpperCase()}</span>
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

// Preload models for instantaneous rendering
useGLTF.preload('/models/basic_station.glb')
useGLTF.preload('/models/pro_station.glb')
useGLTF.preload('/models/ultra_station.glb')
