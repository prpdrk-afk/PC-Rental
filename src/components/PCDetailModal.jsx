import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const specLabels = {
  cpu: { label: 'CPU Processor', icon: '🔲' },
  gpu: { label: 'Graphics Card', icon: '🎮' },
  ram: { label: 'Memory RAM', icon: '💾' },
  storage: { label: 'NVMe Storage', icon: '💿' },
  monitor: { label: 'Gaming Monitor', icon: '🖥️' },
  internet: { label: 'Fiber Network', icon: '🌐' },
}

export default function PCDetailModal({ pkg, onClose }) {
  const [rentConfirmed, setRentConfirmed] = useState(false)

  if (!pkg) return null

  return (
    <AnimatePresence>
      <motion.div
        className="pc-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="pc-modal-content"
          style={{
            '--modal-accent': pkg.color,
            '--modal-glow': pkg.glowColor,
          }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className="pc-modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>

          {rentConfirmed ? (
            /* Rent Success Simulation */
            <div className="pc-modal-success">
              <div className="pc-modal-success-icon">🚀</div>
              <h3>จำลองการจองสำเร็จ!</h3>
              <p>
                ระบบกำลังเตรียมเครื่อง <strong>{pkg.name} RIG</strong> สำหรับคุณ
                <br />
                <span style={{ fontSize: '0.88rem', color: '#8892b0' }}>
                  (ระบบจำลองสำหรับการนำเสนอ ไม่มีการตัดเงินจริง)
                </span>
              </p>
              <div
                style={{
                  background: 'rgba(0, 245, 255, 0.08)',
                  border: `1px solid ${pkg.color}`,
                  borderRadius: '12px',
                  padding: '16px',
                  marginTop: '16px',
                  width: '100%',
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                <div>อัตราค่าบริการ: <strong>฿{pkg.price} / ชั่วโมง</strong></div>
                <div>สถานะเครื่อง: <span style={{ color: '#00f5ff' }}>● พร้อมเชื่อมต่อทันที</span></div>
              </div>
              <button
                className="btn btn--primary btn--lg"
                style={{ marginTop: '24px', width: '100%' }}
                onClick={onClose}
              >
                เสร็จสิ้น
              </button>
            </div>
          ) : (
            /* Spec & Details Content */
            <>
              {/* Header */}
              <div className="pc-modal-header">
                <div className="pc-modal-badge" style={{ borderColor: pkg.color, color: pkg.color }}>
                  {pkg.icon} {pkg.popular ? 'POPULAR TIER' : 'ACTIVE TIER'}
                </div>
                <h2 className="pc-modal-title">
                  {pkg.name} <span style={{ color: pkg.color }}>RIG</span>
                </h2>
                <p className="pc-modal-tagline">{pkg.tagline}</p>
                <div className="pc-modal-price">
                  <span className="pc-modal-currency">฿</span>
                  <span className="pc-modal-amount">{pkg.price}</span>
                  <span className="pc-modal-unit">/ {pkg.unit}</span>
                </div>
              </div>

              {/* Hardware Specifications Grid */}
              <div className="pc-modal-specs-title">HARDWARE SPECIFICATIONS</div>
              <div className="pc-modal-specs-grid">
                {Object.entries(pkg.specs).map(([key, val]) => (
                  <div key={key} className="pc-modal-spec-item">
                    <span className="pc-modal-spec-icon">{specLabels[key]?.icon || '⚙️'}</span>
                    <div>
                      <div className="pc-modal-spec-label">{specLabels[key]?.label || key}</div>
                      <div className="pc-modal-spec-value">{val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Included Features */}
              <div className="pc-modal-specs-title" style={{ marginTop: '20px' }}>
                SERVICE FEATURES
              </div>
              <ul className="pc-modal-features">
                {pkg.features.map((feat) => (
                  <li key={feat}>
                    <span style={{ color: pkg.color }}>✓</span> {feat}
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="pc-modal-actions">
                <button
                  className="btn btn--primary btn--lg"
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${pkg.color} 0%, #7b2ff7 100%)`,
                    boxShadow: `0 0 24px ${pkg.glowColor}`,
                  }}
                  onClick={() => setRentConfirmed(true)}
                >
                  ⚡ RENT NOW
                </button>
                <button className="btn btn--ghost btn--lg" onClick={onClose}>
                  ย้อนกลับ
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
