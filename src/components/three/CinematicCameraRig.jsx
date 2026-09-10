import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CinematicCameraRig — Smooth camera lerp between overview position and selected PC station
 */
export default function CinematicCameraRig({ focusedTier }) {
  const currentLookAt = useRef(new THREE.Vector3(0, 0.95, 0))

  useFrame((state, delta) => {
    // Determine target camera position and lookAt point
    let targetPos = new THREE.Vector3(0, 1.9, 5.8)
    let targetLook = new THREE.Vector3(0, 0.95, 0)

    if (focusedTier === 'basic') {
      targetPos = new THREE.Vector3(-2.6, 1.35, 2.3)
      targetLook = new THREE.Vector3(-2.6, 1.05, 0)
    } else if (focusedTier === 'pro') {
      targetPos = new THREE.Vector3(0, 1.35, 2.3)
      targetLook = new THREE.Vector3(0, 1.05, 0)
    } else if (focusedTier === 'ultra') {
      targetPos = new THREE.Vector3(2.6, 1.35, 2.3)
      targetLook = new THREE.Vector3(2.6, 1.05, 0)
    }

    // Smooth lerp camera position
    state.camera.position.lerp(targetPos, THREE.MathUtils.clamp(delta * 3.5, 0, 1))

    // Smooth lerp camera lookAt
    currentLookAt.current.lerp(targetLook, THREE.MathUtils.clamp(delta * 3.5, 0, 1))
    state.camera.lookAt(currentLookAt.current)
  })

  return null
}
