import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Sparkles, RotateCw, Eye, Layers } from 'lucide-react'
import { siteImages } from '@/config/images'

interface Hero3DModelProps {
  className?: string
}

export default function Hero3DModel({ className = '' }: Hero3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const modelMeshRef = useRef<THREE.Mesh | null>(null)
  const pedestalRef = useRef<THREE.Group | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const reqIdRef = useRef<number | null>(null)

  // Interactive View Angle State
  const [activeTextureIndex, setActiveTextureIndex] = useState<number>(0)
  const [isRotating, setIsRotating] = useState<boolean>(true)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const views = [
    {
      id: 0,
      label: 'Full Silhouette',
      caption: 'The Gulabi & Citron Salwar Sets',
      image: siteImages.models.heroGirls,
    },
    {
      id: 1,
      label: 'Craft Macro',
      caption: 'French Scalloped Lace & Pleated Hem',
      image: siteImages.models.detailHues,
    },
    {
      id: 2,
      label: 'Editorial Grid',
      caption: '32-Shot Garden Atelier Lookbook',
      image: siteImages.models.shootGrid,
    },
  ]

  // Track mouse coordinates for interactive parallax tilt
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const prevMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || 600
    const height = container.clientHeight || 700

    // ── 1. SCENE SETUP ──
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x0f0e0d)
    scene.fog = new THREE.FogExp2(0x0f0e0d, 0.04)

    // ── 2. CAMERA ──
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0.2, 5.2)

    // ── 3. RENDERER ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    rendererRef.current = renderer

    // Clear any previous canvas
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    // ── 4. LIGHTING ──
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfff0db, 2.2)
    keyLight.position.set(4, 6, 5)
    scene.add(keyLight)

    const rimLight = new THREE.PointLight(0xd4af37, 2.8, 12)
    rimLight.position.set(-4, 3, -2)
    scene.add(rimLight)

    const frontFill = new THREE.PointLight(0xfff5ea, 1.6, 10)
    frontFill.position.set(0, 1, 4)
    scene.add(frontFill)

    // ── 5. PEDESTAL & REFLECTIVE PLATFORM ──
    const pedestalGroup = new THREE.Group()
    pedestalRef.current = pedestalGroup

    // Mirror turntable disk
    const diskGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.08, 64)
    const diskMat = new THREE.MeshStandardMaterial({
      color: 0x181716,
      roughness: 0.2,
      metalness: 0.85,
    })
    const disk = new THREE.Mesh(diskGeo, diskMat)
    disk.position.y = -1.9
    pedestalGroup.add(disk)

    // Gold rim ring around pedestal
    const ringGeo = new THREE.TorusGeometry(1.68, 0.02, 16, 100)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.9,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    ring.position.y = -1.86
    pedestalGroup.add(ring)

    scene.add(pedestalGroup)

    // ── 6. 3D FLOATING GOLDEN SILK PARTICLES ──
    const particleCount = 140
    const particleGeo = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8
      particlePos[i + 1] = (Math.random() - 0.5) * 7
      particlePos[i + 2] = (Math.random() - 0.5) * 6
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5d061,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    particlesRef.current = particles
    scene.add(particles)

    // ── 7. 3D MODEL MESH (Curved Luxury Plinth with Texture) ──
    const textureLoader = new THREE.TextureLoader()
    const currentImgUrl = views[activeTextureIndex]?.image || siteImages.models.heroGirls

    textureLoader.load(
      currentImgUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter

        // Curved dimensional display plane (gives realistic drape and volumetric depth)
        const planeGeo = new THREE.CylinderGeometry(
          1.4, // radiusTop
          1.4, // radiusBottom
          3.6, // height
          48,  // radialSegments
          1,   // heightSegments
          true, // openEnded
          Math.PI * 0.8, // thetaStart
          Math.PI * 0.4  // thetaLength
        )

        // Adjust UV mapping so image fits gracefully across the curved front
        const uvs = planeGeo.attributes.uv
        for (let i = 0; i < uvs.count; i++) {
          const u = uvs.getX(i)
          uvs.setX(i, 1 - u) // Flip horizontal if needed
        }
        planeGeo.attributes.uv.needsUpdate = true

        const planeMat = new THREE.MeshStandardMaterial({
          map: texture,
          side: THREE.DoubleSide,
          roughness: 0.4,
          metalness: 0.1,
          transparent: true,
          opacity: 0.98,
        })

        const modelMesh = new THREE.Mesh(planeGeo, planeMat)
        modelMesh.position.set(0, 0, 0)
        modelMeshRef.current = modelMesh
        scene.add(modelMesh)

        setLoading(false)
      },
      undefined,
      (err) => {
        console.error('Error loading 3D texture:', err)
        setLoading(false)
      }
    )

    // ── 8. MOUSE & DRAG INTERACTION ──
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      if (isDragging.current) {
        const deltaX = e.clientX - prevMousePos.current.x
        const deltaY = e.clientY - prevMousePos.current.y
        targetRotation.current.y += deltaX * 0.008
        targetRotation.current.x += deltaY * 0.005
        prevMousePos.current = { x: e.clientX, y: e.clientY }
      } else {
        // Subtle ambient parallax
        targetRotation.current.y = x * 0.6
        targetRotation.current.x = -y * 0.3
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      prevMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('resize', handleResize)

    // ── 9. ANIMATION LOOP ──
    let clock = new THREE.Clock()

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth lerp rotation toward mouse target
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05

      // Idle float & rotation
      if (modelMeshRef.current) {
        if (isRotating && !isDragging.current) {
          const autoRotate = Math.sin(elapsedTime * 0.6) * 0.22
          modelMeshRef.current.rotation.y = currentRotation.current.y + autoRotate
        } else {
          modelMeshRef.current.rotation.y = currentRotation.current.y
        }
        modelMeshRef.current.rotation.x = currentRotation.current.x

        // Gentle floating breathing motion
        modelMeshRef.current.position.y = Math.sin(elapsedTime * 1.2) * 0.05
      }

      // Rotate pedestal turntable
      if (pedestalRef.current) {
        pedestalRef.current.rotation.y = elapsedTime * 0.15
      }

      // Float ambient particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.05
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.05
      }

      renderer.render(scene, camera)
    }

    animate()

    // ── CLEANUP ──
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [activeTextureIndex, isRotating])

  // Switch Texture on the fly
  const handleSelectView = (index: number) => {
    setActiveTextureIndex(index)
    setLoading(true)
  }

  return (
    <div className={`relative w-full h-full min-h-[580px] lg:min-h-[720px] bg-[#0f0e0d] overflow-hidden select-none ${className}`}>
      {/* 3D WebGL Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate 3D model"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f0e0d]/80 backdrop-blur-sm z-20">
          <div className="w-8 h-8 border-2 border-amber-300 border-t-transparent rounded-full animate-spin mb-3" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-200">
            Rendering 3D Model...
          </span>
        </div>
      )}

      {/* Top Floating Badge & HUD */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-200">
            Live 3D Atelier Simulation
          </span>
        </div>

        <button
          onClick={() => setIsRotating((prev) => !prev)}
          className="pointer-events-auto flex items-center gap-1.5 bg-black/60 hover:bg-black/90 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white text-[10px] font-mono uppercase tracking-widest transition-colors"
          title="Toggle Auto Rotation"
        >
          <RotateCw size={12} className={isRotating ? 'animate-spin' : ''} />
          <span>{isRotating ? 'Auto Orbit: On' : 'Orbit: Paused'}</span>
        </button>
      </div>

      {/* Interactive 3D Hotspots Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Hotspot 1: Neckline / Lace */}
        <div className="absolute top-[32%] left-[46%] pointer-events-auto">
          <button
            onClick={() =>
              setActiveHotspot(
                activeHotspot === 'lace'
                  ? null
                  : 'French Scalloped Lace — Delicate floral lace borders hand-tacked along kurti hems.'
              )
            }
            className="group relative flex items-center justify-center w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white hover:scale-125 transition-transform shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-amber-300 relative" />
          </button>
        </div>

        {/* Hotspot 2: Silk Fabric / Dupatta */}
        <div className="absolute top-[48%] left-[28%] pointer-events-auto">
          <button
            onClick={() =>
              setActiveHotspot(
                activeHotspot === 'silk'
                  ? null
                  : 'Pure Mulberry Chanderi Silk — Woven on traditional pit-looms in historic royal clusters.'
              )
            }
            className="group relative flex items-center justify-center w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white hover:scale-125 transition-transform shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-emerald-300 relative" />
          </button>
        </div>

        {/* Hotspot 3: Salwar Pleats */}
        <div className="absolute bottom-[28%] right-[38%] pointer-events-auto">
          <button
            onClick={() =>
              setActiveHotspot(
                activeHotspot === 'salwar'
                  ? null
                  : 'Pleated Salwar Flare — Micro-pleated volume engineered for effortless movement and grace.'
              )
            }
            className="group relative flex items-center justify-center w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white hover:scale-125 transition-transform shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-300 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-purple-300 relative" />
          </button>
        </div>
      </div>

      {/* Active Hotspot Toast Callout */}
      {activeHotspot && (
        <div className="absolute top-20 left-6 right-6 z-20 bg-neutral-900/95 border border-amber-300/40 p-4 text-white shadow-2xl backdrop-blur-md animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-300 shrink-0" />
              <p className="font-body text-xs leading-relaxed text-neutral-200">{activeHotspot}</p>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-neutral-400 hover:text-white text-xs font-mono uppercase"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls: Angle & Texture Switcher */}
      <div className="absolute bottom-6 left-6 right-6 z-10 space-y-3">
        {/* Caption */}
        <div className="flex items-center justify-between text-white/90 text-xs font-serif italic px-1">
          <span>&ldquo;{views[activeTextureIndex].caption}&rdquo;</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-amber-300">
            Interactive 3D Stage
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-black/60 p-1.5 border border-white/10 backdrop-blur-md">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => handleSelectView(v.id)}
              className={`py-2 px-2 text-[10px] font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                activeTextureIndex === v.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {v.id === 0 && <Eye size={12} />}
              {v.id === 1 && <Sparkles size={12} />}
              {v.id === 2 && <Layers size={12} />}
              <span className="truncate">{v.label}</span>
            </button>
          ))}
        </div>

        {/* Drag Helper Tip */}
        <div className="text-center">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
            Drag with cursor to tilt · Orbit with mouse
          </span>
        </div>
      </div>
    </div>
  )
}
