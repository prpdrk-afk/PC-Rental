import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * ModelWrapper normalizes an imported scene in its own local coordinate space.
 * It leaves the source asset untouched while making differently-authored GLBs
 * share a common height, floor level, and horizontal center.
 */
export default function ModelWrapper({ scene, targetHeight = 1.5, debug = false }) {
  const { modelScene, debugInfo } = useMemo(() => {
    if (!scene) return { modelScene: null, debugInfo: null }

    // Work on a private clone, never the GLTF loader's cached source scene.
    const normalizedScene = scene.clone(true)

    const getLocalBounds = () => {
      normalizedScene.updateMatrixWorld(true)
      return new THREE.Box3().setFromObject(normalizedScene)
    }

    // Measure the complete imported hierarchy before any normalization.
    const originalBox = getLocalBounds()
    const originalSize = originalBox.getSize(new THREE.Vector3())
    const originalHeight = originalSize.y

    if (!Number.isFinite(originalHeight) || originalHeight <= 0) {
      console.warn('ModelWrapper: skipped normalization because the model height is invalid.', {
        height: originalHeight,
      })
      return { modelScene: normalizedScene, debugInfo: null }
    }

    const normalizedScale = targetHeight / originalHeight
    if (!Number.isFinite(normalizedScale) || normalizedScale <= 0) {
      console.warn('ModelWrapper: skipped normalization because the target scale is invalid.', {
        targetHeight,
        originalHeight,
      })
      return { modelScene: normalizedScene, debugInfo: null }
    }

    // Preserve any authored scale while applying one uniform normalization factor.
    normalizedScene.scale.multiplyScalar(normalizedScale)

    // Re-measure after scaling, then align the lowest point to the floor and
    // center the resulting bounds on the station's local X/Z axes.
    const normalizedBox = getLocalBounds()
    const normalizedCenter = normalizedBox.getCenter(new THREE.Vector3())
    normalizedScene.position.x -= normalizedCenter.x
    normalizedScene.position.y -= normalizedBox.min.y
    normalizedScene.position.z -= normalizedCenter.z
    const finalBox = getLocalBounds()
    const finalSize = finalBox.getSize(new THREE.Vector3())

    return {
      modelScene: normalizedScene,
      debugInfo: debug
        ? {
            box: finalBox.clone(),
            dimensions: finalSize.toArray(),
            scale: normalizedScale,
          }
        : null,
    }
  }, [scene, targetHeight, debug])

  const debugHelper = useMemo(() => {
    if (!debugInfo) return null
    return new THREE.Box3Helper(debugInfo.box, '#00f5ff')
  }, [debugInfo])

  return (
    <group>
      {modelScene && <primitive object={modelScene} />}
      {debugHelper && <primitive object={debugHelper} />}
      {debugInfo && (
        <Html position={[0, debugInfo.dimensions[1] + 0.2, 0]} center>
          <div
            style={{
              color: '#00f5ff',
              background: 'rgba(0, 0, 0, 0.8)',
              fontFamily: 'monospace',
              fontSize: '11px',
              padding: '4px 6px',
              whiteSpace: 'nowrap',
            }}
          >
            size: {debugInfo.dimensions.map((value) => value.toFixed(2)).join(' x ')}
            <br />
            scale: {debugInfo.scale.toFixed(4)}
          </div>
        </Html>
      )}
    </group>
  )
}
