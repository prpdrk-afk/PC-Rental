import { motion } from 'framer-motion'
import useScrollAnimation from '../hooks/useScrollAnimation'

const steps = [
  {
    step: '01',
    title: 'เลือกสเปกที่ต้องการ',
    desc: 'เลือกแพ็กเกจ Cloud PC จาก Basic (฿15/ชม.), Pro (฿25/ชม.) หรือ Ultra (฿40/ชม.) ตามประเภทการใช้งาน',
    icon: '🖥️',
    color: '#00f5ff',
  },
  {
    step: '02',
    title: 'เชื่อมต่อได้ทุกอุปกรณ์',
    desc: 'รองรับการรีโมทเข้าใช้งานผ่าน Laptop, Macbook, iPad หรือมือถือ ด้วยความหน่วงต่ำ (Ultra-low Latency)',
    icon: '⚡',
    color: '#7b2ff7',
  },
  {
    step: '03',
    title: 'เริ่มเล่นเกม & ทำงานทันที',
    desc: 'เข้าสู่โลกของเกมระดับ AAA, สตรีมมิ่ง, หรืองานตัดต่อ 4K ได้ทันทีโดยไม่ต้องซื้อการ์ดจอราคาแพง',
    icon: '🚀',
    color: '#ff6b35',
  },
]

export default function HowItWorks() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="how-it-works" className="how-it-works-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">✦ วิธีการใช้งาน</span>
          <h2 className="section-title">
            เริ่มต้นใช้งานง่ายๆ <span className="gradient-text">ใน 3 ขั้นตอน</span>
          </h2>
          <p className="section-subtitle">
            เปลี่ยนอุปกรณ์ธรรมดาของคุณให้กลายเป็น Supercomputer ได้ในไม่กี่วินาที
          </p>
        </motion.div>

        <div className="how-it-works-grid">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              className="how-it-works-card"
              style={{ '--step-color': s.color }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: idx * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="how-it-works-step">{s.step}</div>
              <div className="how-it-works-icon">{s.icon}</div>
              <h3 className="how-it-works-title">{s.title}</h3>
              <p className="how-it-works-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
