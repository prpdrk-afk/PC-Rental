import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const detailedSpecs = {
  basic: {
    title: 'PC RENTAL BASIC',
    price: 15,
    tagline: 'Entry-level Gaming & Productivity Rig',
    color: '#00f5ff',
    glowColor: 'rgba(0, 245, 255, 0.35)',
    cpu: 'Intel Core i5 13600K',
    gpu: 'RTX 4060 8GB GDDR6',
    ram: '16GB DDR5 5600MHz',
    ssd: '512GB NVMe M.2',
    cooling: 'Tower Air Cooler (4x Copper Pipes)',
    power: '650W 80+ Bronze',
  },
  pro: {
    title: 'PC RENTAL PRO',
    price: 25,
    tagline: 'High-Performance Gaming & Streaming Rig',
    color: '#7b2ff7',
    glowColor: 'rgba(123, 47, 247, 0.4)',
    cpu: 'Intel Core i7 14700K',
    gpu: 'RTX 4070 Ti Super 16GB',
    ram: '32GB DDR5 6000MHz',
    ssd: '1TB NVMe Gen4 High-Speed',
    cooling: '240mm ARGB Liquid Cooling AIO',
    power: '750W 80+ Gold Fully Modular',
  },
  ultra: {
    title: 'PC RENTAL ULTRA',
    price: 40,
    tagline: 'Extreme-Performance Flagship Battle Station',
    color: '#ff6b35',
    glowColor: 'rgba(255, 107, 53, 0.45)',
    cpu: 'Ryzen 9 7950X',
    gpu: 'RTX 4080 Super 16GB',
    ram: '64GB DDR5 6400MHz',
    ssd: '2TB NVMe Gen4 Extreme',
    cooling: '360mm Liquid Cooling Loop',
    power: '850W 80+ Gold Platinum',
  },
}

export default function ShowroomInfoPanel({ pkg, onClose }) {
  const [rentConfirmed, setRentConfirmed] = useState(false)

  if (!pkg) return null

  const info = detailedSpecs[pkg.id] || detailedSpecs.basic

  return (
    <AnimatePresence>
      <motion.aside
        className="showroom-panel"
        style={{
          '--panel-accent': info.color,
          '--panel-glow': info.glowColor,
        }}
        initial={{ opacity: 0, x: 80, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 80, scale: 0.95 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
      >
        {/* Header with Close X */}
        <div className="showroom-panel__header">
          <div>
            <span className="showroom-panel__badge">
              ● SHOWROOM FOCUS
            </span>
            <h2 className="showroom-panel__title">{info.title}</h2>
            <div className="showroom-panel__tagline">{info.tagline}</div>
          </div>
          <button
            className="showroom-panel__close-btn"
            onClick={onClose}
            aria-label="Close panel and reset camera"
          >
            ✕
          </button>
        </div>

        {/* Price display */}
        <div className="showroom-panel__price-box">
          <span className="showroom-panel__price-currency">฿</span>
          <span className="showroom-panel__price-amount">{info.price}</span>
          <span className="showroom-panel__price-unit">/ HOUR</span>
        </div>

        {rentConfirmed ? (
          /* Confirmation State */
          <div className="showroom-panel__confirmed">
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🚀</div>
            <h3>จำลองการจองสำเร็จ!</h3>
            <p>
              ระบบกำลังจัดเตรียมสเปก <strong>{info.title}</strong> ให้คุณพร้อมใช้งาน
            </p>
            <button
              className="btn btn--primary"
              style={{ marginTop: '20px', width: '100%' }}
              onClick={() => {
                setRentConfirmed(false)
                onClose()
              }}
            >
              กลับสู่ภาพรวมโชว์รูม
            </button>
          </div>
        ) : (
          /* Hardware Specifications Grid */
          <>
            <div className="showroom-panel__specs-list">
              <div className="showroom-panel__spec-row">
                <span className="showroom-panel__spec-label">CPU</span>
                <span className="showroom-panel__spec-val">{info.cpu}</span>
              </div>

              <div className="showroom-panel__spec-row">
                <span className="showroom-panel__spec-label">GPU</span>
                <span className="showroom-panel__spec-val" style={{ color: info.color }}>
                  {info.gpu}
                </span>
              </div>

              <div className="showroom-panel__spec-row">
                <span className="showroom-panel__spec-label">RAM</span>
                <span className="showroom-panel__spec-val">{info.ram}</span>
              </div>

              <div className="showroom-panel__spec-row">
                <span className="showroom-panel__spec-label">SSD</span>
                <span className="showroom-panel__spec-val">{info.ssd}</span>
              </div>

              <div className="showroom-panel__spec-row">
                <span className="showroom-panel__spec-label">Cooling</span>
                <span className="showroom-panel__spec-val">{info.cooling}</span>
              </div>

              <div className="showroom-panel__spec-row">
                <span className="showroom-panel__spec-label">Power</span>
                <span className="showroom-panel__spec-val">{info.power}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="showroom-panel__actions">
              <button
                className="btn btn--primary btn--lg showroom-panel__rent-btn"
                style={{
                  background: `linear-gradient(135deg, ${info.color} 0%, #7b2ff7 100%)`,
                  boxShadow: `0 0 24px ${info.glowColor}`,
                }}
                onClick={() => setRentConfirmed(true)}
              >
                ⚡ RENT NOW
              </button>
              <button
                className="btn btn--ghost btn--lg showroom-panel__back-btn"
                onClick={onClose}
              >
                CLOSE
              </button>
            </div>
          </>
        )}
      </motion.aside>
    </AnimatePresence>
  )
}
