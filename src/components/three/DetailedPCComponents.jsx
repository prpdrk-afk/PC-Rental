import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

/**
 * RGBFan — High detail 120mm fan with spinning aerodynamic blades and halo RGB ring
 */
export function RGBFan({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  rgbColor = '#00f5ff',
  speed = 8,
}) {
  const bladesRef = useRef()

  useFrame((_, delta) => {
    if (bladesRef.current) {
      bladesRef.current.rotation.z += delta * speed
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Outer Fan Casing */}
      <mesh>
        <boxGeometry args={[0.36, 0.36, 0.04]} />
        <meshStandardMaterial color="#0c0d14" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Circular Vent Cutout Rim */}
      <mesh position={[0, 0, 0.005]}>
        <ringGeometry args={[0.13, 0.165, 32]} />
        <meshStandardMaterial color="#141724" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* RGB Halo Ring Diffuser */}
      <mesh position={[0, 0, 0.021]}>
        <ringGeometry args={[0.135, 0.155, 32]} />
        <meshStandardMaterial
          color={rgbColor}
          emissive={rgbColor}
          emissiveIntensity={1.4}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* Spinning Blades & Motor Hub */}
      <group ref={bladesRef} position={[0, 0, 0.01]}>
        {/* Center Motor Hub */}
        <mesh>
          <cylinderGeometry args={[0.045, 0.045, 0.02, 20]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#0e101b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Hub Logo Center */}
        <mesh position={[0, 0, 0.011]}>
          <circleGeometry args={[0.028, 16]} />
          <meshBasicMaterial color={rgbColor} toneMapped={false} />
        </mesh>

        {/* 7 Aerodynamic Curved Fan Blades */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const angle = (i * Math.PI * 2) / 7
          return (
            <mesh
              key={i}
              rotation={[0, 0, angle]}
              position={[Math.cos(angle) * 0.08, Math.sin(angle) * 0.08, 0]}
            >
              <boxGeometry args={[0.08, 0.035, 0.004]} />
              <meshStandardMaterial
                color="#181c2e"
                roughness={0.3}
                metalness={0.5}
                transparent
                opacity={0.85}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

/**
 * RAMSticks — 2 or 4 DDR5 memory modules with finned heatspreaders and top RGB lightbars
 */
export function RAMSticks({ count = 2, rgbColor = '#00f5ff', position = [0, 0, 0] }) {
  const indices = count === 4 ? [-0.03, -0.01, 0.01, 0.03] : [-0.015, 0.015]

  return (
    <group position={position}>
      {indices.map((x, idx) => (
        <group key={idx} position={[x, 0, 0]}>
          {/* Metal Heatspreader */}
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.008, 0.16, 0.35]} />
            <meshStandardMaterial
              color="#10121d"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          {/* Top RGB Acrylic Diffuser Lightbar */}
          <mesh position={[0, 0.165, 0]}>
            <boxGeometry args={[0.009, 0.015, 0.35]} />
            <meshStandardMaterial
              color={rgbColor}
              emissive={rgbColor}
              emissiveIntensity={1.8}
              toneMapped={false}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/**
 * MotherboardDetailed — ATX Motherboard with VRM heatsinks, M.2 shield, PCIe slot & rear I/O
 */
export function MotherboardDetailed({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Matte Black Multi-layer PCB */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.01, 0.95, 0.85]} />
        <meshStandardMaterial color="#08090f" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Gold & Silver Printed Circuit Traces */}
      <mesh position={[0.006, 0.45, 0]}>
        <planeGeometry args={[0.9, 0.8]} />
        <meshStandardMaterial
          color="#121629"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Aluminum VRM Heatsinks around CPU Socket */}
      <group position={[0.02, 0.65, -0.15]}>
        <RoundedBox args={[0.03, 0.22, 0.12]} radius={0.005} smoothness={4}>
          <meshStandardMaterial color="#1a1e2f" metalness={0.95} roughness={0.15} />
        </RoundedBox>
        {/* Heat dissipation fins */}
        {[-0.04, -0.01, 0.02, 0.05].map((y, i) => (
          <mesh key={i} position={[0.015, y, 0]}>
            <boxGeometry args={[0.008, 0.006, 0.11]} />
            <meshStandardMaterial color="#0b0e1a" metalness={0.9} />
          </mesh>
        ))}
      </group>

      <group position={[0.02, 0.8, 0.05]}>
        <RoundedBox args={[0.03, 0.08, 0.25]} radius={0.005} smoothness={4}>
          <meshStandardMaterial color="#1a1e2f" metalness={0.95} roughness={0.15} />
        </RoundedBox>
      </group>

      {/* Rear I/O Shield Block */}
      <mesh position={[0.02, 0.65, -0.36]}>
        <boxGeometry args={[0.04, 0.35, 0.08]} />
        <meshStandardMaterial color="#111420" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* M.2 NVMe SSD Shield with Laser Accent */}
      <mesh position={[0.015, 0.42, 0.08]}>
        <boxGeometry args={[0.01, 0.03, 0.22]} />
        <meshStandardMaterial color="#1f2338" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Steel Armor PCIe 5.0 Slot */}
      <mesh position={[0.015, 0.32, 0]}>
        <boxGeometry args={[0.015, 0.02, 0.45]} />
        <meshStandardMaterial color="#c0c8df" metalness={1.0} roughness={0.1} />
      </mesh>
    </group>
  )
}

/**
 * GPUDetailed — Realistic Graphics Card with backplate, fin stack, rotating fans & RGB logo
 */
export function GPUDetailed({
  position = [0, 0, 0],
  fanCount = 3,
  rgbColor = '#00f5ff',
  cardLength = 0.85,
  isExtreme = false,
}) {
  const fansRef = useRef([])

  useFrame((_, delta) => {
    fansRef.current.forEach((fan) => {
      if (fan) fan.rotation.y += delta * 7
    })
  })

  return (
    <group position={position}>
      {/* Brushed Metal Backplate */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.18, 0.01, cardLength]} />
        <meshStandardMaterial
          color="#121524"
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>

      {/* Aluminum Heatsink Fin Array Block */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[0.16, 0.07, cardLength - 0.04]} />
        <meshStandardMaterial
          color="#22273d"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* Outer Aerodynamic Shroud */}
      <RoundedBox
        args={[0.175, 0.11, cardLength]}
        position={[0, -0.05, 0]}
        radius={0.01}
        smoothness={4}
      >
        <meshStandardMaterial color="#0a0c16" metalness={0.8} roughness={0.35} />
      </RoundedBox>

      {/* Side RGB Logo Bar */}
      <mesh position={[-0.088, -0.03, 0]}>
        <boxGeometry args={[0.005, 0.025, 0.4]} />
        <meshStandardMaterial
          color={rgbColor}
          emissive={rgbColor}
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>

      {/* PCIe Rear Metal Bracket with DisplayPorts */}
      <mesh position={[0, -0.05, -cardLength / 2 - 0.015]}>
        <boxGeometry args={[0.06, 0.16, 0.01]} />
        <meshStandardMaterial color="#8892aa" metalness={1.0} roughness={0.1} />
      </mesh>

      {/* Dual 8-Pin PCIe Power Connectors & Braided Cables */}
      <group position={[-0.06, 0.02, cardLength / 3]}>
        <mesh>
          <boxGeometry args={[0.03, 0.02, 0.06]} />
          <meshStandardMaterial color="#0c0d15" roughness={0.6} />
        </mesh>
        {/* Curved Power Cables down into grommet */}
        <mesh position={[-0.05, -0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.015, 0.015, 0.18, 12]} />
          <meshStandardMaterial color="#1a1f33" roughness={0.8} />
        </mesh>
      </group>

      {/* Cooling Fans on Bottom Shroud Face */}
      {Array.from({ length: fanCount }).map((_, idx) => {
        const offset = (idx - (fanCount - 1) / 2) * (cardLength / (fanCount + 0.3))
        return (
          <group
            key={idx}
            position={[0, -0.11, offset]}
            ref={(el) => (fansRef.current[idx] = el)}
          >
            {/* Fan Rim */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.07, 0.008, 8, 24]} />
              <meshStandardMaterial color={rgbColor} emissive={rgbColor} emissiveIntensity={0.8} />
            </mesh>
            {/* Fan Rotor Blades */}
            {[0, 1, 2, 3, 4].map((b) => {
              const a = (b * Math.PI * 2) / 5
              return (
                <mesh key={b} rotation={[0, a, 0]} position={[Math.cos(a) * 0.03, 0, Math.sin(a) * 0.03]}>
                  <boxGeometry args={[0.05, 0.004, 0.02]} />
                  <meshStandardMaterial color="#141828" metalness={0.7} />
                </mesh>
              )
            })}
          </group>
        )
      })}

      {/* Anti-Sag GPU Support Bracket for High-End Cards */}
      {isExtreme && (
        <group position={[-0.07, -0.22, cardLength / 2 - 0.05]}>
          <mesh>
            <cylinderGeometry args={[0.01, 0.01, 0.3, 12]} />
            <meshStandardMaterial color="#2a3048" metalness={0.95} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[0.03, 0.02, 0.04]} />
            <meshStandardMaterial color={rgbColor} emissive={rgbColor} emissiveIntensity={1.2} />
          </mesh>
        </group>
      )}
    </group>
  )
}

/**
 * AirCoolerTower — Stacked aluminum fin tower with copper heatpipes and 120mm fan (Basic)
 */
export function AirCoolerTower({ position = [0, 0, 0], rgbColor = '#00f5ff' }) {
  return (
    <group position={position}>
      {/* Copper Baseplate on CPU */}
      <mesh position={[0.015, 0, 0]}>
        <boxGeometry args={[0.015, 0.08, 0.08]} />
        <meshStandardMaterial color="#c86d3b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 4 U-Shaped Copper Heatpipes */}
      {[-0.025, -0.01, 0.01, 0.025].map((z, i) => (
        <mesh key={i} position={[0.06, 0, z]}>
          <cylinderGeometry args={[0.005, 0.005, 0.26, 12]} />
          <meshStandardMaterial color="#d47942" metalness={0.95} roughness={0.15} />
        </mesh>
      ))}

      {/* Aluminum Cooling Fin Stack */}
      <RoundedBox args={[0.12, 0.28, 0.28]} position={[0.08, 0, 0]} radius={0.005} smoothness={4}>
        <meshStandardMaterial color="#9ea6be" metalness={0.9} roughness={0.25} />
      </RoundedBox>

      {/* Finned Top Cap Plate */}
      <mesh position={[0.145, 0, 0]}>
        <boxGeometry args={[0.008, 0.285, 0.285]} />
        <meshStandardMaterial color="#121626" metalness={0.8} />
      </mesh>

      {/* Mounted Cooling Fan on Front of Heatsink */}
      <RGBFan
        position={[0.08, 0, 0.16]}
        rotation={[0, 0, 0]}
        scale={0.75}
        rgbColor={rgbColor}
        speed={7}
      />
    </group>
  )
}

/**
 * LiquidCoolerAIO — 240mm AIO Liquid cooler with infinity mirror pump & radiator (Pro)
 */
export function LiquidCoolerAIO({ position = [0, 0, 0], rgbColor = '#7b2ff7' }) {
  const pumpRef = useRef()

  useFrame((state) => {
    if (pumpRef.current) {
      pumpRef.current.rotation.x = state.clock.elapsedTime * 0.8
    }
  })

  return (
    <group position={position}>
      {/* CPU Pump Block */}
      <mesh position={[0.04, 0.55, -0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.065, 0.065, 0.04, 32]} />
        <meshStandardMaterial color="#0e101c" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Infinity Mirror RGB Ring on Pump Face */}
      <mesh position={[0.061, 0.55, -0.05]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.04, 0.06, 32]} />
        <meshStandardMaterial
          color={rgbColor}
          emissive={rgbColor}
          emissiveIntensity={2.0}
          toneMapped={false}
        />
      </mesh>

      {/* Braided Coolant Hoses extending to top radiator */}
      <mesh position={[0.08, 0.75, 0.05]} rotation={[0, 0, Math.PI / 5]}>
        <cylinderGeometry args={[0.012, 0.012, 0.42, 16]} />
        <meshStandardMaterial color="#1a1d2e" roughness={0.9} />
      </mesh>
      <mesh position={[0.06, 0.73, -0.08]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.012, 0.012, 0.38, 16]} />
        <meshStandardMaterial color="#1a1d2e" roughness={0.9} />
      </mesh>

      {/* Top 240mm Aluminum Radiator Assembly */}
      <group position={[0.08, 0.98, 0]}>
        <mesh>
          <boxGeometry args={[0.18, 0.035, 0.72]} />
          <meshStandardMaterial color="#141726" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Dual 120mm Radiator Exhaust Fans */}
        <RGBFan position={[0, -0.025, -0.18]} rotation={[Math.PI / 2, 0, 0]} scale={0.82} rgbColor={rgbColor} />
        <RGBFan position={[0, -0.025, 0.18]} rotation={[Math.PI / 2, 0, 0]} scale={0.82} rgbColor={rgbColor} />
      </group>
    </group>
  )
}

/**
 * CustomLiquidLoop — Extreme Open-Loop Water Cooling with acrylic reservoir & hardline tubing (Ultra)
 */
export function CustomLiquidLoop({ position = [0, 0, 0], rgbColor = '#ff6b35' }) {
  const fluidRef = useRef()

  useFrame((state) => {
    if (fluidRef.current) {
      fluidRef.current.material.emissiveIntensity =
        1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  return (
    <group position={position}>
      {/* Transparent Acrylic Cylindrical Coolant Reservoir */}
      <group position={[0.08, 0.45, 0.28]}>
        {/* Reservoir Base & D5 Pump */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.07, 0.075, 0.08, 24]} />
          <meshStandardMaterial color="#181d2e" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Clear Acrylic Outer Tube */}
        <mesh>
          <cylinderGeometry args={[0.065, 0.065, 0.36, 32]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.92}
            roughness={0.05}
            ior={1.49}
            thickness={0.03}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Glowing Dynamic Coolant Fluid inside */}
        <mesh ref={fluidRef} position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.056, 0.056, 0.32, 28]} />
          <meshStandardMaterial
            color={rgbColor}
            emissive={rgbColor}
            emissiveIntensity={1.4}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>

        {/* Chrome Top Cap with Compression G1/4 Fitting */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.03, 24]} />
          <meshStandardMaterial color="#d2d8ec" metalness={1.0} roughness={0.08} />
        </mesh>
      </group>

      {/* Clear/Chrome Hardline Acrylic Tubing with 90° Elbow Fittings */}
      {/* Tube 1: Reservoir -> GPU block */}
      <mesh position={[0.08, 0.22, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.009, 0.009, 0.28, 16]} />
        <meshPhysicalMaterial color={rgbColor} transmission={0.7} roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Tube 2: GPU block -> CPU waterblock */}
      <mesh position={[0.06, 0.44, -0.08]}>
        <cylinderGeometry args={[0.009, 0.009, 0.25, 16]} />
        <meshPhysicalMaterial color={rgbColor} transmission={0.7} roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Tube 3: CPU -> Top 360mm Radiator */}
      <mesh position={[0.06, 0.78, -0.15]}>
        <cylinderGeometry args={[0.009, 0.009, 0.38, 16]} />
        <meshPhysicalMaterial color={rgbColor} transmission={0.7} roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Chrome Compression Fittings */}
      {[
        [0.08, 0.22, 0.25],
        [0.06, 0.32, -0.08],
        [0.06, 0.55, -0.08],
        [0.06, 0.96, -0.15],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.015, 0.015, 0.02, 16]} />
          <meshStandardMaterial color="#dbe2f5" metalness={1.0} roughness={0.05} />
        </mesh>
      ))}

      {/* Massive 360mm Top Radiator with Triple RGB Halo Fans */}
      <group position={[0.08, 0.98, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.04, 0.95]} />
          <meshStandardMaterial color="#121626" metalness={0.9} roughness={0.3} />
        </mesh>
        <RGBFan position={[0, -0.028, -0.3]} rotation={[Math.PI / 2, 0, 0]} scale={0.78} rgbColor={rgbColor} />
        <RGBFan position={[0, -0.028, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.78} rgbColor="#00f5ff" />
        <RGBFan position={[0, -0.028, 0.3]} rotation={[Math.PI / 2, 0, 0]} scale={0.78} rgbColor={rgbColor} />
      </group>
    </group>
  )
}

/**
 * CaseChassis — Full aluminum chassis frame with bevelled edges, PSU shroud, feet, front I/O & glass
 */
export function CaseChassis({
  caseWidth = 0.52,
  caseHeight = 1.15,
  caseDepth = 1.05,
  rgbColor = '#00f5ff',
  glassTint = '#ffffff',
  children,
}) {
  return (
    <group>
      {/* Outer Anodized Aluminum Chassis Frame */}
      <RoundedBox
        args={[caseWidth, caseHeight, caseDepth]}
        position={[0, caseHeight / 2, 0]}
        radius={0.025}
        smoothness={6}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#0a0c16"
          metalness={0.88}
          roughness={0.28}
        />
      </RoundedBox>

      {/* Front Panel with Brushed Texture & Magnetic Airflow Mesh */}
      <group position={[0, caseHeight / 2, caseDepth / 2 + 0.005]}>
        {/* Front Bezel */}
        <RoundedBox args={[caseWidth - 0.04, caseHeight - 0.04, 0.02]} radius={0.015} smoothness={4}>
          <meshStandardMaterial color="#0e111e" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        {/* Hexagonal Mesh Ventilation Intake Grille */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[caseWidth - 0.12, caseHeight - 0.2]} />
          <meshStandardMaterial
            color="#060810"
            roughness={0.8}
            wireframe
          />
        </mesh>
        {/* Front Panel I/O: Power Button with LED Ring */}
        <group position={[0, caseHeight / 2 - 0.08, 0.012]}>
          <mesh>
            <circleGeometry args={[0.02, 24]} />
            <meshStandardMaterial color="#1a1f33" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.002]}>
            <ringGeometry args={[0.014, 0.018, 24]} />
            <meshBasicMaterial color={rgbColor} toneMapped={false} />
          </mesh>
        </group>
        {/* Dual USB 3.0 & Type-C Ports */}
        <mesh position={[0.06, caseHeight / 2 - 0.08, 0.012]}>
          <boxGeometry args={[0.02, 0.01, 0.005]} />
          <meshStandardMaterial color="#00f5ff" metalness={0.5} />
        </mesh>
        <mesh position={[0.1, caseHeight / 2 - 0.08, 0.012]}>
          <boxGeometry args={[0.016, 0.007, 0.005]} />
          <meshStandardMaterial color="#d5dcf5" metalness={0.8} />
        </mesh>
      </group>

      {/* Top Magnetic Dust Filter with Recessed Notch */}
      <mesh position={[0, caseHeight + 0.004, 0]}>
        <boxGeometry args={[caseWidth - 0.08, 0.006, caseDepth - 0.12]} />
        <meshStandardMaterial color="#0c0e18" roughness={0.9} />
      </mesh>

      {/* 4 CNC Aluminum Rubber Feet */}
      {[
        [-caseWidth / 2 + 0.06, caseDepth / 2 - 0.08],
        [caseWidth / 2 - 0.06, caseDepth / 2 - 0.08],
        [-caseWidth / 2 + 0.06, -caseDepth / 2 + 0.08],
        [caseWidth / 2 - 0.06, -caseDepth / 2 + 0.08],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0.02, z]}>
          <mesh>
            <cylinderGeometry args={[0.032, 0.032, 0.04, 20]} />
            <meshStandardMaterial color="#181c2e" metalness={0.95} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.018, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 0.008, 20]} />
            <meshStandardMaterial color="#05060a" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Bottom PSU Shroud Compartment */}
      <group position={[0, 0.16, 0]}>
        <mesh>
          <boxGeometry args={[caseWidth - 0.04, 0.24, caseDepth - 0.06]} />
          <meshStandardMaterial color="#090b14" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Glowing Cutout Logo on Shroud */}
        <mesh position={[-caseWidth / 2 + 0.018, 0, 0.15]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.2, 0.035]} />
          <meshStandardMaterial
            color={rgbColor}
            emissive={rgbColor}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Premium Tempered Glass Side Panel */}
      <group position={[-caseWidth / 2 - 0.004, caseHeight / 2 + 0.01, 0]}>
        {/* Clear Glass Sheet with Physical Transmission & IOR */}
        <mesh>
          <boxGeometry args={[0.008, caseHeight - 0.1, caseDepth - 0.08]} />
          <meshPhysicalMaterial
            color={glassTint}
            transmission={0.88}
            roughness={0.04}
            metalness={0.05}
            ior={1.52}
            thickness={0.05}
            transparent
            opacity={0.3}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Dark Silk-Screened Perimeter Bezel */}
        <mesh position={[-0.002, 0, 0]}>
          <boxGeometry args={[0.006, caseHeight - 0.105, caseDepth - 0.085]} />
          <meshStandardMaterial color="#000000" wireframe />
        </mesh>

        {/* 4 Corner Knurled Metal Thumbscrews */}
        {[
          [0, (caseHeight - 0.1) / 2 - 0.04, (caseDepth - 0.08) / 2 - 0.04],
          [0, -(caseHeight - 0.1) / 2 + 0.04, (caseDepth - 0.08) / 2 - 0.04],
          [0, (caseHeight - 0.1) / 2 - 0.04, -(caseDepth - 0.08) / 2 + 0.04],
          [0, -(caseHeight - 0.1) / 2 + 0.04, -(caseDepth - 0.08) / 2 + 0.04],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x - 0.005, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.015, 16]} />
            <meshStandardMaterial color="#aab4d0" metalness={1.0} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Internal Hardware Components */}
      {children}
    </group>
  )
}
