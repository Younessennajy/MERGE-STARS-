import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import HeroMergeCoin from './HeroMergeCoin'

/** Landing hero asset — keep in sync with LandingPage preload */
import coinModelUrl from '../assets/3d-coin/Meshy_AI_Golden_Star_Emblem_0521090909_texture.glb?url'

export { coinModelUrl as landingCoinModelUrl }

useGLTF.preload(coinModelUrl)

/** Hide the thick outer gold ring on coin faces; keep star, inner ring, and silver edge. */
const FACE_OUTER_RADIUS = 0.76

function stripOuterGoldBorder(root: THREE.Object3D) {
  root.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) return
    const mesh = obj as THREE.Mesh
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]

    for (const mat of materials) {
      if (!mat || !('onBeforeCompile' in mat)) continue
      const m = mat as THREE.MeshStandardMaterial
      m.onBeforeCompile = (shader) => {
        shader.vertexShader =
          'varying float vCoinFaceRadius;\nvarying vec3 vCoinFaceNormal;\n' +
          shader.vertexShader.replace(
            '#include <begin_vertex>',
            `#include <begin_vertex>
vCoinFaceRadius = length(transformed.xy);
vCoinFaceNormal = normalize(normalMatrix * normal);`,
          )

        shader.fragmentShader =
          'varying float vCoinFaceRadius;\nvarying vec3 vCoinFaceNormal;\n' +
          shader.fragmentShader.replace(
            '#include <output_fragment>',
            `if (abs(vCoinFaceNormal.z) > 0.82 && vCoinFaceRadius > ${FACE_OUTER_RADIUS.toFixed(3)}) {
  discard;
}
#include <output_fragment>`,
          )
      }
      m.needsUpdate = true
    }
  })
}

/**
 * 0521090909 GLB is thinnest on Z (face already toward camera).
 * Presentation tilt ~3/4 hero angle (reference marketing shot).
 */
const COIN_PRESENTATION_ROTATION: [number, number, number] = [-0.32, 0.58, 0.04]

function CoinSpinGroup({
  autoRotate,
  children,
}: {
  autoRotate: boolean
  children: ReactNode
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!autoRotate || !groupRef.current) return
    groupRef.current.rotation.y += delta * 0.45
  })

  return <group ref={groupRef}>{children}</group>
}

function CoinModel({ onLoaded }: { onLoaded: () => void }) {
  const { scene } = useGLTF(coinModelUrl)

  useEffect(() => {
    onLoaded()
  }, [onLoaded])

  const normalized = useMemo(() => {
    const clone = scene.clone(true)
    stripOuterGoldBorder(clone)
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const scale = 2.4 / maxDim
    clone.scale.setScalar(scale)
    return clone
  }, [scene])

  return (
    <group rotation={COIN_PRESENTATION_ROTATION}>
      <Center>
        <primitive object={normalized} />
      </Center>
    </group>
  )
}

function CoinScene({ autoRotate, onLoaded }: { autoRotate: boolean; onLoaded: () => void }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 6]} intensity={1.4} color="#fff5e0" />
      <directionalLight position={[-4, 2, 3]} intensity={0.5} color="#c9a84c" />
      <pointLight position={[1, 1, 4]} intensity={0.55} color="#f5d78e" />
      <Environment preset="city" />
      <CoinSpinGroup autoRotate={autoRotate}>
        <CoinModel onLoaded={onLoaded} />
      </CoinSpinGroup>
    </>
  )
}

interface Hero3DCoinProps {
  className?: string
  'aria-label'?: string
}

/**
 * Landing hero: Meshy GLB coin in the center. Falls back to SVG while loading or if WebGL fails.
 */
export default function Hero3DCoin({
  className = '',
  'aria-label': ariaLabel = 'MERGE STARS golden coin emblem',
}: Hero3DCoinProps) {
  const [ready, setReady] = useState(false)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div
      className={`relative ${className}`.trim()}
      role="img"
      aria-label={ariaLabel}
      style={{
        width: 'min(92vw, 500px)',
        height: 'min(92vw, 500px)',
        maxWidth: 500,
        maxHeight: 500,
      }}
    >
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <HeroMergeCoin className="w-full h-full opacity-90" aria-hidden />
        </div>
      )}

      <Canvas
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}
        camera={{ position: [0, 0.12, 3.65], fov: 38, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Suspense fallback={null}>
          <CoinScene autoRotate={!prefersReducedMotion} onLoaded={() => setReady(true)} />
        </Suspense>
      </Canvas>
    </div>
  )
}
