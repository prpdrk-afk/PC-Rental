import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Polyfill FileReader for Node.js GLTFExporter
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf
        if (this.onloadend) this.onloadend({ target: this })
        if (this.onload) this.onload({ target: this })
      })
    }
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const modelsDir = path.join(__dirname, 'public', 'models')

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true })
}

/**
 * Helper to build gaming desk geometry
 */
function createGamingDesk(accentColor) {
  const desk = new THREE.Group()
  desk.name = 'GamingDesk'

  // Tabletop (1.6m x 0.8m x 0.04m)
  const topGeo = new THREE.BoxGeometry(1.6, 0.04, 0.8)
  const topMat = new THREE.MeshStandardMaterial({
    color: 0x0c0e18,
    metalness: 0.85,
    roughness: 0.25,
  })
  const topMesh = new THREE.Mesh(topGeo, topMat)
  topMesh.position.y = 0.74
  topMesh.castShadow = true
  topMesh.receiveShadow = true
  desk.add(topMesh)

  // Tabletop Beveled Edge Accent Strip
  const edgeGeo = new THREE.BoxGeometry(1.61, 0.015, 0.01)
  const edgeMat = new THREE.MeshBasicMaterial({ color: accentColor })
  const frontEdge = new THREE.Mesh(edgeGeo, edgeMat)
  frontEdge.position.set(0, 0.74, 0.405)
  desk.add(frontEdge)

  // Heavy Z-Frame Steel Legs
  const legMat = new THREE.MeshStandardMaterial({ color: 0x161826, metalness: 0.95, roughness: 0.2 })
  ;[-0.7, 0.7].forEach((x) => {
    // Vertical upright
    const legGeo = new THREE.BoxGeometry(0.06, 0.72, 0.06)
    const leg = new THREE.Mesh(legGeo, legMat)
    leg.position.set(x, 0.36, 0)
    leg.castShadow = true
    desk.add(leg)

    // Bottom horizontal foot
    const footGeo = new THREE.BoxGeometry(0.06, 0.03, 0.7)
    const foot = new THREE.Mesh(footGeo, legMat)
    foot.position.set(x, 0.015, 0)
    desk.add(foot)

    // Angled Z-support brace
    const braceGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.65, 8)
    const brace = new THREE.Mesh(braceGeo, legMat)
    brace.position.set(x, 0.36, -0.1)
    brace.rotation.x = Math.PI / 6
    desk.add(brace)
  })

  // Cross Support Beam
  const beamGeo = new THREE.BoxGeometry(1.36, 0.04, 0.04)
  const beam = new THREE.Mesh(beamGeo, legMat)
  beam.position.set(0, 0.5, -0.2)
  desk.add(beam)

  // Extra Large Stitched RGB Gaming Deskpad
  const padGeo = new THREE.BoxGeometry(1.1, 0.006, 0.48)
  const padMat = new THREE.MeshStandardMaterial({ color: 0x070912, roughness: 0.9 })
  const pad = new THREE.Mesh(padGeo, padMat)
  pad.position.set(-0.15, 0.763, 0.05)
  desk.add(pad)

  // Deskpad RGB Rim
  const padRimGeo = new THREE.BoxGeometry(1.11, 0.003, 0.49)
  const padRimMat = new THREE.MeshBasicMaterial({ color: accentColor })
  const padRim = new THREE.Mesh(padRimGeo, padRimMat)
  padRim.position.set(-0.15, 0.761, 0.05)
  desk.add(padRim)

  return desk
}

/**
 * Helper to build ergonomic gaming chair
 */
function createGamingChair(accentColor) {
  const chair = new THREE.Group()
  chair.name = 'GamingChair'
  chair.position.set(-0.15, 0, 0.65)
  chair.rotation.y = Math.PI

  const darkLeather = new THREE.MeshStandardMaterial({ color: 0x090a14, roughness: 0.6, metalness: 0.1 })
  const accentLeather = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.4, metalness: 0.2 })
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xc8d0e5, metalness: 0.95, roughness: 0.1 })

  // 5-Star Wheelbase Base
  const baseCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16), chromeMat)
  baseCenter.position.y = 0.08
  chair.add(baseCenter)

  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.32), chromeMat)
    arm.position.set(Math.sin(angle) * 0.16, 0.08, Math.cos(angle) * 0.16)
    arm.rotation.y = angle
    chair.add(arm)

    // Caster wheel
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 12), darkLeather)
    wheel.rotation.z = Math.PI / 2
    wheel.position.set(Math.sin(angle) * 0.3, 0.04, Math.cos(angle) * 0.3)
    chair.add(wheel)
  }

  // Gas Lift Cylinder
  const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.36, 16), chromeMat)
  piston.position.y = 0.24
  chair.add(piston)

  // Seat Cushion with Side Bolsters
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.08, 0.48), darkLeather)
  seat.position.y = 0.44
  chair.add(seat)

  // High-Back Racing Backrest
  const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.72, 0.08), darkLeather)
  backrest.position.set(0, 0.82, -0.22)
  backrest.rotation.x = -0.06
  chair.add(backrest)

  // Headrest Pillow
  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.12, 0.06), accentLeather)
  pillow.position.set(0, 1.12, -0.2)
  chair.add(pillow)

  // 3D Armrests
  ;[-0.26, 0.26].forEach((x) => {
    const armPost = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2, 8), chromeMat)
    armPost.position.set(x, 0.54, 0)
    chair.add(armPost)

    const armPad = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.24), darkLeather)
    armPad.position.set(x, 0.64, 0)
    chair.add(armPad)
  })

  return chair
}

/**
 * Helper to build gaming monitor setup
 */
function createGamingMonitors(tier, accentColor) {
  const group = new THREE.Group()
  group.name = 'MonitorSetup'

  const frameMat = new THREE.MeshStandardMaterial({ color: 0x0a0c16, metalness: 0.9, roughness: 0.2 })
  const standMat = new THREE.MeshStandardMaterial({ color: 0x161a2c, metalness: 0.95, roughness: 0.15 })
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x050716,
    emissive: accentColor,
    emissiveIntensity: 0.85,
    roughness: 0.1,
  })

  if (tier === 'basic') {
    // 27" Flat IPS Display
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.32, 12), standMat)
    stand.position.set(-0.15, 0.9, -0.08)
    group.add(stand)
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.015, 0.22), standMat)
    base.position.set(-0.15, 0.748, -0.08)
    group.add(base)

    const display = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.52, 0.03), frameMat)
    display.position.set(-0.15, 1.05, -0.05)
    group.add(display)
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.48), screenMat)
    screen.position.set(-0.15, 1.05, -0.034)
    group.add(screen)
  } else if (tier === 'pro') {
    // Dual Display Setup (Main 32" Curved QHD + Vertical Portrait Display)
    // Main Display
    const mainDisplay = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.62, 0.04), frameMat)
    mainDisplay.position.set(-0.25, 1.1, -0.05)
    mainDisplay.rotation.y = 0.04
    group.add(mainDisplay)
    const mainScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.57), screenMat)
    mainScreen.position.set(-0.25, 1.1, -0.029)
    mainScreen.rotation.y = 0.04
    group.add(mainScreen)

    // Vertical Streamer Monitor
    const sideDisplay = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.74, 0.03), frameMat)
    sideDisplay.position.set(0.38, 1.15, -0.1)
    sideDisplay.rotation.y = -0.38
    group.add(sideDisplay)
    const sideScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.38, 0.7),
      new THREE.MeshStandardMaterial({ color: 0x050614, emissive: 0x7b2ff7, emissiveIntensity: 0.9 })
    )
    sideScreen.position.set(0.38, 1.15, -0.084)
    sideScreen.rotation.y = -0.38
    group.add(sideScreen)

    // Dual Monitor Arm
    const armPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.45, 12), standMat)
    armPole.position.set(0, 0.96, -0.15)
    group.add(armPole)
  } else {
    // Ultra: 49" Super Ultra-Wide Curved Display
    const mainDisplay = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.58, 0.05), frameMat)
    mainDisplay.position.set(-0.12, 1.08, -0.05)
    group.add(mainDisplay)
    const mainScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 0.53), screenMat)
    mainScreen.position.set(-0.12, 1.08, -0.024)
    group.add(mainScreen)

    // Monitor Stand with RGB base
    const armPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.38, 16), standMat)
    armPole.position.set(-0.12, 0.93, -0.16)
    group.add(armPole)
    const hexBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.02, 6), standMat)
    hexBase.position.set(-0.12, 0.75, -0.16)
    group.add(hexBase)
  }

  // Keyboard
  const kbGeo = new THREE.BoxGeometry(0.44, 0.016, 0.16)
  const kbMat = new THREE.MeshStandardMaterial({ color: 0x111322, metalness: 0.7, roughness: 0.3 })
  const kb = new THREE.Mesh(kbGeo, kbMat)
  kb.position.set(-0.2, 0.774, 0.08)
  group.add(kb)
  // Keyboard RGB underglow
  const kbLed = new THREE.Mesh(new THREE.BoxGeometry(0.445, 0.004, 0.165), new THREE.MeshBasicMaterial({ color: accentColor }))
  kbLed.position.set(-0.2, 0.768, 0.08)
  group.add(kbLed)

  // Mouse
  const mouseGeo = new THREE.BoxGeometry(0.07, 0.024, 0.12)
  const mouse = new THREE.Mesh(mouseGeo, kbMat)
  mouse.position.set(0.16, 0.775, 0.08)
  group.add(mouse)
  const mouseLed = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.005, 0.05), new THREE.MeshBasicMaterial({ color: accentColor }))
  mouseLed.position.set(0.16, 0.788, 0.08)
  group.add(mouseLed)

  return group
}

/**
 * Helper to build realistic gaming PC tower
 */
function createGamingPCTower(tier, accentColor) {
  const pc = new THREE.Group()
  pc.name = 'GamingPCTower'
  pc.position.set(0.55, 0.76, 0.02) // On top of the desk right side

  const dims =
    tier === 'basic'
      ? { w: 0.28, h: 0.62, d: 0.58 }
      : tier === 'pro'
      ? { w: 0.32, h: 0.7, d: 0.64 }
      : { w: 0.36, h: 0.78, d: 0.7 }

  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x090b16, metalness: 0.9, roughness: 0.25 })
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.88,
    roughness: 0.04,
    metalness: 0.05,
    ior: 1.52,
    thickness: 0.04,
    transparent: true,
    opacity: 0.35,
  })

  // Chassis Main Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(dims.w, dims.h, dims.d), chassisMat)
  body.position.y = dims.h / 2
  body.castShadow = true
  body.receiveShadow = true
  pc.add(body)

  // Tempered Glass Left Side Panel
  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.008, dims.h - 0.06, dims.d - 0.05), glassMat)
  glass.position.set(-dims.w / 2 - 0.004, dims.h / 2, 0)
  pc.add(glass)

  // Glass Thumbscrews
  ;[
    [-dims.w / 2 - 0.008, dims.h - 0.08, dims.d / 2 - 0.06],
    [-dims.w / 2 - 0.008, dims.h - 0.08, -dims.d / 2 + 0.06],
    [-dims.w / 2 - 0.008, 0.08, dims.d / 2 - 0.06],
    [-dims.w / 2 - 0.008, 0.08, -dims.d / 2 + 0.06],
  ].forEach((pos) => {
    const screw = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 0.012, 12),
      new THREE.MeshStandardMaterial({ color: 0xa8b4d0, metalness: 1.0, roughness: 0.1 })
    )
    screw.rotation.z = Math.PI / 2
    screw.position.set(...pos)
    pc.add(screw)
  })

  // Front Airflow Grille
  const frontGrille = new THREE.Mesh(
    new THREE.PlaneGeometry(dims.w - 0.06, dims.h - 0.1),
    new THREE.MeshStandardMaterial({ color: 0x05060e, roughness: 0.8, wireframe: true })
  )
  frontGrille.position.set(0, dims.h / 2, dims.d / 2 + 0.002)
  pc.add(frontGrille)

  // Power Button with LED Ring
  const btn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.005, 16),
    new THREE.MeshStandardMaterial({ color: 0x1a2034, metalness: 0.9 })
  )
  btn.rotation.x = Math.PI / 2
  btn.position.set(0, dims.h - 0.05, dims.d / 2 + 0.003)
  pc.add(btn)

  const ledRing = new THREE.Mesh(new THREE.RingGeometry(0.009, 0.012, 16), new THREE.MeshBasicMaterial({ color: accentColor }))
  ledRing.position.set(0, dims.h - 0.05, dims.d / 2 + 0.006)
  pc.add(ledRing)

  // Motherboard (Internal)
  const mobo = new THREE.Mesh(
    new THREE.BoxGeometry(0.008, dims.h * 0.65, dims.d * 0.68),
    new THREE.MeshStandardMaterial({ color: 0x080912, roughness: 0.7, metalness: 0.2 })
  )
  mobo.position.set(dims.w * 0.35, dims.h * 0.55, 0)
  pc.add(mobo)

  // VRM Heatsinks
  const vrm = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, 0.12, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x1a1e30, metalness: 0.95, roughness: 0.15 })
  )
  vrm.position.set(dims.w * 0.32, dims.h * 0.68, -0.1)
  pc.add(vrm)

  // DDR5 RAM Sticks (with top RGB lightbars)
  const ramCount = tier === 'basic' ? 2 : 4
  for (let i = 0; i < ramCount; i++) {
    const zOffset = 0.04 + i * 0.018
    const ram = new THREE.Mesh(
      new THREE.BoxGeometry(0.008, 0.09, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x101322, metalness: 0.9 })
    )
    ram.position.set(dims.w * 0.32, dims.h * 0.62, zOffset)
    pc.add(ram)

    const ramRgb = new THREE.Mesh(
      new THREE.BoxGeometry(0.009, 0.012, 0.01),
      new THREE.MeshBasicMaterial({ color: accentColor })
    )
    ramRgb.position.set(dims.w * 0.32, dims.h * 0.67, zOffset)
    pc.add(ramRgb)
  }

  // Graphics Card (GPU)
  const gpuLength = dims.d * 0.7
  const gpu = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.065, gpuLength),
    new THREE.MeshStandardMaterial({ color: 0x0c0e1a, metalness: 0.9, roughness: 0.25 })
  )
  gpu.position.set(dims.w * 0.22, dims.h * 0.42, 0)
  pc.add(gpu)

  // GPU Side RGB Logo
  const gpuLogo = new THREE.Mesh(
    new THREE.BoxGeometry(0.005, 0.016, gpuLength * 0.6),
    new THREE.MeshBasicMaterial({ color: accentColor })
  )
  gpuLogo.position.set(dims.w * 0.155, dims.h * 0.42, 0)
  pc.add(gpuLogo)

  // CPU Cooling Assembly based on tier
  if (tier === 'basic') {
    // Air Cooler Tower
    const cooler = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.16, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x8a94b0, metalness: 0.95, roughness: 0.2 })
    )
    cooler.position.set(dims.w * 0.22, dims.h * 0.64, -0.05)
    pc.add(cooler)
  } else if (tier === 'pro') {
    // 240mm AIO Liquid Cooler Pump & Radiator
    const pump = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.03, 20),
      new THREE.MeshStandardMaterial({ color: 0x0a0c16, metalness: 0.9 })
    )
    pump.rotation.z = Math.PI / 2
    pump.position.set(dims.w * 0.3, dims.h * 0.64, -0.05)
    pc.add(pump)

    const pumpRing = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.042, 24), new THREE.MeshBasicMaterial({ color: accentColor }))
    pumpRing.rotation.y = -Math.PI / 2
    pumpRing.position.set(dims.w * 0.28, dims.h * 0.64, -0.05)
    pc.add(pumpRing)

    // Top 240mm Radiator
    const rad = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.03, dims.d * 0.6),
      new THREE.MeshStandardMaterial({ color: 0x141726, metalness: 0.9 })
    )
    rad.position.set(dims.w * 0.2, dims.h - 0.04, 0)
    pc.add(rad)
  } else {
    // Ultra: Custom Liquid Cooling with Acrylic Reservoir & Hardline Tubes
    const res = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.28, 24),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.92, roughness: 0.05, ior: 1.49, transparent: true, opacity: 0.4 })
    )
    res.position.set(dims.w * 0.2, dims.h * 0.52, dims.d * 0.22)
    pc.add(res)

    const coolant = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 0.24, 20),
      new THREE.MeshBasicMaterial({ color: accentColor })
    )
    coolant.position.set(dims.w * 0.2, dims.h * 0.52, dims.d * 0.22)
    pc.add(coolant)

    // Hardline Tube to CPU
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.007, 0.2, 12),
      new THREE.MeshPhysicalMaterial({ color: accentColor, transmission: 0.8, roughness: 0.1 })
    )
    tube.rotation.x = Math.PI / 3
    tube.position.set(dims.w * 0.2, dims.h * 0.6, 0.05)
    pc.add(tube)
  }

  // Front RGB Fans
  const fanCount = tier === 'basic' ? 1 : tier === 'pro' ? 2 : 3
  for (let i = 0; i < fanCount; i++) {
    const yPos = dims.h * 0.25 + i * (dims.h * 0.55 / fanCount)
    const fanRim = new THREE.Mesh(new THREE.RingGeometry(0.065, 0.08, 24), new THREE.MeshBasicMaterial({ color: accentColor }))
    fanRim.position.set(0, yPos, dims.d / 2 - 0.015)
    pc.add(fanRim)
  }

  // Rear Exhaust Fan
  const rearFan = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.075, 24), new THREE.MeshBasicMaterial({ color: accentColor }))
  rearFan.position.set(0, dims.h * 0.7, -dims.d / 2 + 0.015)
  pc.add(rearFan)

  return pc
}

/**
 * Builds a complete Station Scene and exports to binary GLB
 */
function buildAndExportStation(tier, accentColor, filename) {
  return new Promise((resolve, reject) => {
    const station = new THREE.Group()
    station.name = `Station_${tier}`

    // 1. Gaming Desk
    station.add(createGamingDesk(accentColor))

    // 2. Gaming Chair
    station.add(createGamingChair(accentColor))

    // 3. Gaming Monitors & Peripherals
    station.add(createGamingMonitors(tier, accentColor))

    // 4. Realistic Gaming PC Tower
    station.add(createGamingPCTower(tier, accentColor))

    const exporter = new GLTFExporter()
    exporter.parse(
      station,
      (glb) => {
        const outPath = path.join(modelsDir, filename)
        fs.writeFileSync(outPath, Buffer.from(glb))
        console.log(`Generated: ${filename} (${(glb.byteLength / 1024).toFixed(1)} KB)`)
        resolve(outPath)
      },
      (error) => {
        console.error(`Export failed for ${filename}:`, error)
        reject(error)
      },
      { binary: true }
    )
  })
}

async function main() {
  console.log('Generating realistic 3D GLB models for Basic, Pro, and Ultra stations...')
  await buildAndExportStation('basic', 0x00f5ff, 'basic_station.glb')
  await buildAndExportStation('pro', 0x7b2ff7, 'pro_station.glb')
  await buildAndExportStation('ultra', 0xff6b35, 'ultra_station.glb')
  console.log('All 3 GLB models generated successfully in public/models/!')
}

main().catch(console.error)
