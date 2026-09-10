import { useState } from 'react'
import { motion } from 'framer-motion'
import HeroScene from '../components/three/HeroScene'
import ShowroomScene from '../components/three/ShowroomScene'
import ShowroomInfoPanel from '../components/ShowroomInfoPanel'
import PackageCard from '../components/PackageCard'
import HowItWorks from '../components/HowItWorks'
import PCDetailModal from '../components/PCDetailModal'
import { packages } from '../data/packages'
import useScrollAnimation from '../hooks/useScrollAnimation'
import assetUrl from '../utils/assetUrl'

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const features = [
  {
    icon: '⚡',
    title: 'ประสิทธิภาพสูงสุด',
    desc: 'ฮาร์ดแวร์ระดับ Professional อัปเดตล่าสุด พร้อมให้คุณทำงานและเล่นเกมได้อย่างเต็มสมรรถนะ',
    color: '#00f5ff',
  },
  {
    icon: '🔒',
    title: 'ปลอดภัย & เป็นส่วนตัว',
    desc: 'ระบบล้างข้อมูลอัตโนมัติหลังใช้งาน ข้อมูลส่วนบุคคลจะไม่ถูกจัดเก็บบนเครื่อง Cloud',
    color: '#7b2ff7',
  },
  {
    icon: '🕐',
    title: 'บริการ 24/7',
    desc: 'เปิดให้บริการตลอด 24 ชั่วโมง 7 วันต่อสัปดาห์ พร้อมทีมงานซัพพอร์ตคอยดูแลระบบอย่างใกล้ชิด',
    color: '#ff6b35',
  },
  {
    icon: '🌐',
    title: 'เครือข่ายความเร็วสูง',
    desc: 'เชื่อมต่อ Fiber Optic ความเร็วสูงสุด 1 Gbps Ultra-low latency ลื่นไหลทุกการสตรีมมิ่ง',
    color: '#00f5ff',
  },
  {
    icon: '🖥️',
    title: 'จอภาพคุณภาพสูง',
    desc: 'รองรับการแสดงผลคมชัดสูงสุดระดับ 4K 240Hz และรองรับการตั้งค่า Multi-Monitor',
    color: '#7b2ff7',
  },
  {
    icon: '💳',
    title: 'ยืดหยุ่น ไม่มีสัญญาผูกมัด',
    desc: 'คิดราคาเป็นรายชั่วโมง เริ่มต้น 15 บาท ไม่มีค่าสมาชิกรายเดือน จ่ายตามเวลาที่ใช้จริง',
    color: '#ff6b35',
  },
]

/* ─── 1. Hero Section ─── */
function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      {/* 3D Realistic Futuristic Server Room Background */}
      <HeroScene />

      {/* Overlay content */}
      <div className="hero-section__content container">
        <motion.div
          className="hero-section__badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          ✦ PC RENTAL • NEXT-GEN CLOUD SHOWROOM
        </motion.div>

        <motion.h1
          className="hero-section__title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          YOUR CLOUD PC.
          <br />
          <span className="gradient-text">ANYWHERE.</span>
        </motion.h1>

        <motion.p
          className="hero-section__subtitle"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          สัมผัสประสบการณ์เช่าคอมพิวเตอร์สเปกเทพผ่านระบบคลาวด์โชว์รูม 3D เสมือนจริง
          เล่นเกมระดับ AAA, ตัดต่อ 4K, หรืองาน AI เรนเดอร์กราฟิก เริ่มต้นเพียง <strong>15 บาท/ชั่วโมง</strong>
        </motion.p>

        <motion.div
          className="hero-section__actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a
            className="btn btn--primary btn--lg"
            href="#showroom"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#showroom')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            🚀 EXPLORE SHOWROOM
          </a>
          <a
            className="btn btn--ghost btn--lg"
            href="#packages"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            📋 VIEW PACKAGES
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-section__stats"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          {[
            { value: '500+', label: 'ผู้ใช้งานจริง' },
            { value: '99.9%', label: 'Uptime Cloud' },
            { value: '24/7', label: 'Online Support' },
            { value: '3', label: 'ระดับประสิทธิภาพ' },
          ].map((s) => (
            <div key={s.label} className="hero-section__stat">
              <span className="hero-section__stat-value">{s.value}</span>
              <span className="hero-section__stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-section__scroll"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        ↓
      </motion.div>
    </section>
  )
}

/* ─── 2. 3D Product Showroom Section (Centerpiece Experience) ─── */
function ShowroomSection({ selectedStation, onSelectStation, onCloseStation }) {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="showroom" className="showroom-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">✦ 3D PRODUCT SHOWROOM</span>
          <h2 className="section-title">
            โชว์รูม 3D เสมือนจริง <span className="gradient-text">PC RENTAL STATIONS</span>
          </h2>
          <p className="section-subtitle">
            คลิกเลือกสถานี PC เพื่อเคลื่อนกล้องโฟกัสอัตโนมัติ (Cinematic Camera) และตรวจสอบสเปกจำลองอย่างละเอียด
          </p>
        </motion.div>

        {/* Showroom Interactive 3D Wrapper */}
        <motion.div
          className="showroom-wrapper"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ShowroomScene
            selectedPkg={selectedStation}
            onSelectPkg={onSelectStation}
          />

          {/* Docked Glassmorphism Information Panel */}
          {selectedStation && (
            <ShowroomInfoPanel
              pkg={selectedStation}
              onClose={onCloseStation}
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── 3. Packages Section ─── */
function PackagesSection({ onSelectPkg }) {
  const { ref, inView } = useScrollAnimation({ threshold: 0.05 })

  return (
    <section id="packages" className="packages-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">✦ CLOUD PC PACKAGES</span>
          <h2 className="section-title">
            เลือกแพ็กเกจที่ <span className="gradient-text">ตอบโจทย์คุณ</span>
          </h2>
          <p className="section-subtitle">
            คิดราคาเป็นรายชั่วโมง ไม่มีค่าสมาชิก ไม่มีค่าซ่อนเร้น คลิกที่แพ็กเกจเพื่อดูรายละเอียด
          </p>
        </motion.div>

        <div className="packages-grid">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} onSelect={onSelectPkg} />
          ))}
        </div>

        <motion.p
          className="packages-note"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          * ราคาข้างต้นรวมภาษีมูลค่าเพิ่มแล้ว • สำหรับสถานศึกษาหรือองค์กร?{' '}
          <a href="#contact">ติดต่อขอรับราคาพิเศษ</a>
        </motion.p>
      </div>
    </section>
  )
}

/* ─── 4. Features Section ─── */
function FeaturesSection() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="features" className="features-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">✦ ทำไมต้องเลือก PC RENTAL</span>
          <h2 className="section-title">
            ครบครัน ทันสมัย <span className="gradient-text">ในที่เดียว</span>
          </h2>
          <p className="section-subtitle">
            เราคัดสรรอุปกรณ์และบริการที่ดีที่สุดเพื่อประสบการณ์การใช้งานที่สมบูรณ์แบบ
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-card"
              style={{ '--feat-color': f.color }}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 5. How It Works Section ─── */
// Imported from components/HowItWorks

/* ─── 6. CTA Section ─── */
function CtaSection() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-section__bg" />
      <div className="container">
        <motion.div
          className="cta-section__content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>พร้อมแล้วหรือยัง?</h2>
          <p>เปิดประสบการณ์เล่นเกมและทำงานระดับซูเปอร์คอมพิวเตอร์กับ PC RENTAL วันนี้</p>
          <div className="cta-section__actions">
            <a
              className="btn btn--primary btn--lg"
              href="#packages"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              เลือกแพ็กเกจเลย
            </a>
            <a className="btn btn--ghost btn--lg" href="#contact">
              ติดต่อสอบถาม
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   7. PLACEHOLDER SECTIONS
   เตรียม ID anchor ไว้สำหรับ 6 เมนูใน Navigation Bar
   (เนื้อหาจริงจะใส่ในภายหลังตามคำสั่งของผู้ใช้)
══════════════════════════════════════════════════════════ */

const placeholderSections = [
  {
    id: 'ai-image',
    content: 'สร้างภาพประชาสัมพันธ์ PC RENTAL ซึ่งเป็นบริการเช่าคอมพิวเตอร์ออนไลน์สำหรับ Gamer นักเรียน นักศึกษา และ Content Creator ใช้สไตล์ Modern Technology และ Cyberpunk โทนสีดำและน้ำเงิน มี Gaming PC ประสิทธิภาพสูงและองค์ประกอบเกี่ยวกับ Cloud Computing ภาพดูทันสมัย Premium และน่าเชื่อถือ เหมาะสำหรับใช้เป็น Banner เว็บไซต์',
    image: assetUrl('images/ai-image-showcase.png'),
    label: 'AI IMAGE',
    icon: '🤖',
    color: '#00f5ff',
    desc: 'เครื่องมือสร้างภาพและกราฟิกด้วย AI ความละเอียดสูง — พื้นที่เตรียมข้อมูล',
  },
  {
    id: 'desmos',
    content: 'แบบจำลองรายได้: Basic ราคา 15 บาทต่อชั่วโมง, Pro ราคา 25 บาทต่อชั่วโมง และ Ultra ราคา 40 บาทต่อชั่วโมง สร้างสมการสำหรับแต่ละ Package และใช้จำนวนชั่วโมงตั้งแต่ 0–24 ชั่วโมงเพื่อเปรียบเทียบรายได้',
    image: assetUrl('images/desmos-revenue.png'),
    label: 'DESMOS',
    icon: '📈',
    color: '#7b2ff7',
    desc: 'ระบบพล็อตกราฟคณิตศาสตร์และแบบจำลองเชิงคำนวณ — พื้นที่เตรียมข้อมูล',
  },
  {
    id: 'mermaid-ai',
    content: 'สร้าง Flowchart แสดงขั้นตอนการเช่าคอมออนไลน์ผ่านเว็บไซต์ โดยให้บริการผ่าน Remote Desktop เช่น AnyDesk, Parsec, Moonlight, Chrome Remote Desktop และ TeamViewer: เลือก Package → เลือกเวลา → ชำระเงิน → ตรวจสอบการชำระเงิน → จัดสรรเครื่อง → Remote เข้าเครื่อง → หมดเวลา → ปิด Session',
    image: assetUrl('images/mermaid-flowchart.png'),
    label: 'MERMAID AI',
    icon: '🧩',
    color: '#00f5ff',
    desc: 'เครื่องมือสร้าง Diagram, Flowchart และ Architecture อัตโนมัติ — พื้นที่เตรียมข้อมูล',
  },
  {
    id: 'latex',
    label: 'OVERLEAF',
    content: 'สร้างบทความเกี่ยวกับร้านเช่าคอมออนไลน์: 1. Introduction — บทนำ 2. Business Concept — แนวคิดธุรกิจ 3. Target Customers — กลุ่มลูกค้า 4. Packages — Package 5. Pricing — ราคา 6. Hardware — Hardware 7. System Operation — ระบบการทำงาน 8. Revenue — รายได้ 9. Risk — ความเสี่ยง 10. Conclusion — สรุป',
    link: 'https://www.overleaf.com/project/6aa0e53d579c11293c9f6950',
    icon: '∑',
    color: '#ff6b35',
    desc: 'ระบบเขียนสมการและเรียบเรียงเอกสารงานวิจัยวิชาการ — พื้นที่เตรียมข้อมูล',
  },
  {
    id: 'notebook-lm',
    content: 'จากข้อมูลของ PC RENTAL ช่วยวิเคราะห์โครงการโดยแบ่งเป็น แนวคิดธุรกิจ กลุ่มลูกค้า บริการและราคา จุดแข็ง จุดอ่อน โอกาส ความเสี่ยง รูปแบบรายได้ และแนวทางพัฒนา โดยใช้ภาษากระชับและเหมาะสำหรับนำไปทำ Presentation และตกแต่งสไลด์อย่างสวยงามตามธีมรูปภาพที่กำหนดให้',
    image: assetUrl('images/notebook-analysis.png'),
    label: 'NOTEBOOK LM',
    icon: '📓',
    color: '#7b2ff7',
    desc: 'สมุดบันทึกอัจฉริยะช่วยสรุปและวิเคราะห์ข้อมูลสำหรับงานวิจัย — พื้นที่เตรียมข้อมูล',
  },
  {
    id: 'presentation',
    link: 'https://canva.link/fbi10jrmxvuhxoj',
    label: 'PRESENTATION',
    icon: '🎯',
    color: '#ff6b35',
    desc: 'เทมเพลตและชุดสไลด์นำเสนอผลงานระดับพรีเมียม — พื้นที่เตรียมข้อมูล',
  },
]

function PlaceholderSection({ section }) {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      id={section.id}
      className="placeholder-section"
      ref={ref}
      style={{ '--ph-color': section.color }}
    >
      <div className="container">
        <motion.div
          className="placeholder-section__inner"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="placeholder-section__accent" />
          <div className="placeholder-section__icon">{section.icon}</div>
          <h2 className="placeholder-section__title">{section.label}</h2>
          {section.id === 'presentation' && (
            <a className="presentation-link-button" href={section.link} target="_blank" rel="noreferrer">
              <span>🎯</span> เปิดงาน Presentation ใน Canva <span>↗</span>
            </a>
          )}
          <div className={`placeholder-section__cards ${section.id === 'presentation' ? 'placeholder-section__cards--presentation-hidden' : ''}`}>
            <article className="placeholder-section__card">
              <h3>CONTENT</h3>
              <p>{section.content || 'พื้นที่สำหรับใส่รายละเอียดของหัวข้อนี้'}</p>
            </article>
            <article className="placeholder-section__card placeholder-section__card--image">
              <h3>ผลลัพธ์</h3>
              {section.link ? (
                <a className="placeholder-section__link-button" href={section.link} target="_blank" rel="noreferrer">เปิดงานบน Overleaf</a>
              ) : section.image ? (
                <img className="placeholder-section__image" src={section.image} alt={`ผลงาน ${section.label}`} />
              ) : (
                <div className="placeholder-section__image-placeholder">วางรูปภาพของคุณที่นี่</div>
              )}
            </article>
          </div>
          <div className="placeholder-section__cards placeholder-section__cards--legacy">
            <article className="placeholder-section__card">
              <h3>PROMPT</h3>
              <p>สร้างภาพประชาสัมพันธ์ PC RENTAL ซึ่งเป็นบริการเช่าคอมพิวเตอร์ออนไลน์สำหรับ Gamer นักเรียน นักศึกษา และ Content Creator ใช้สไตล์ Modern Technology และ Cyberpunk โทนสีดำและน้ำเงิน มี Gaming PC ประสิทธิภาพสูงและองค์ประกอบเกี่ยวกับ Cloud Computing ภาพดูทันสมัย Premium และน่าเชื่อถือ เหมาะสำหรับใช้เป็น Banner เว็บไซต์</p>
            </article>
            <article className="placeholder-section__card placeholder-section__card--image">
              <h3>ผลลัพธ์</h3>
              <img className="placeholder-section__image" src={assetUrl('images/ai-image-showcase.png')} alt="ภาพประชาสัมพันธ์ PC RENTAL" />
            </article>
          </div>
          <div className="placeholder-section__badge">
            <span className="placeholder-section__badge-dot" />
            Coming Soon
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Main Page ─── */
export default function Home() {
  const [selectedStation, setSelectedStation] = useState(null)
  const [modalPkg, setModalPkg] = useState(null)

  const handleSelectStation = (pkg) => {
    setSelectedStation(pkg)
  }

  const handleCloseStation = () => {
    setSelectedStation(null)
  }

  const handleSelectPackageCard = (pkg) => {
    // Select station and scroll smoothly to showroom
    setSelectedStation(pkg)
    document.querySelector('#showroom')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* 1. Hero with Server Room Environment */}
      <HeroSection />

      {/* 2. 3D Product Showroom with Cinematic Camera */}
      <ShowroomSection
        selectedStation={selectedStation}
        onSelectStation={handleSelectStation}
        onCloseStation={handleCloseStation}
      />

      {/* 3. Packages */}
      <PackagesSection onSelectPkg={handleSelectPackageCard} />

      {/* 4. Features */}
      <FeaturesSection />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Call To Action */}
      <CtaSection />

      {/* 7. Preserved 6 Navbar Anchors */}
      {placeholderSections.map((s) => (
        <PlaceholderSection key={s.id} section={s} />
      ))}

      {/* Modal fallback */}
      <PCDetailModal pkg={modalPkg} onClose={() => setModalPkg(null)} />
    </>
  )
}
