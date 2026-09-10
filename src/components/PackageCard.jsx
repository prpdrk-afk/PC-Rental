import { useState } from 'react'
import { motion } from 'framer-motion'

const specIcons = {
  cpu: '🔲',
  ram: '💾',
  gpu: '🎮',
  storage: '💿',
  monitor: '🖥️',
  internet: '🌐',
}

const specLabels = {
  cpu: 'CPU',
  ram: 'RAM',
  gpu: 'GPU',
  storage: 'Storage',
  monitor: 'Monitor',
  internet: 'Internet',
}

/**
 * PackageCard — displays a single rental tier with specs, features, and price.
 * Accepts a `pkg` object from src/data/packages.js and `onSelect`.
 * Shows a "ยอดนิยม" badge when pkg.popular is true.
 */
export default function PackageCard({ pkg, index, onSelect }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`pkg-card ${pkg.popular ? 'pkg-card--popular' : ''}`}
      style={{
        '--card-color': pkg.color,
        '--card-glow': pkg.glowColor,
        cursor: 'pointer',
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onSelect && onSelect(pkg)}
    >
      {pkg.popular && (
        <div className="pkg-card__badge">⭐ ยอดนิยม</div>
      )}

      {/* Header */}
      <div className="pkg-card__header">
        <span className="pkg-card__icon">{pkg.icon}</span>
        <h3 className="pkg-card__name">{pkg.name}</h3>
        <p className="pkg-card__tagline">{pkg.tagline}</p>
      </div>

      {/* Price */}
      <div className="pkg-card__price">
        <span className="pkg-card__currency">฿</span>
        <span className="pkg-card__amount">{pkg.price}</span>
        <span className="pkg-card__unit">/ {pkg.unit}</span>
      </div>

      {/* Divider */}
      <div className="pkg-card__divider" />

      {/* Specs */}
      <ul className="pkg-card__specs">
        {Object.entries(pkg.specs).map(([key, val]) => (
          <li key={key}>
            <span className="pkg-card__spec-icon">{specIcons[key]}</span>
            <span className="pkg-card__spec-label">{specLabels[key]}</span>
            <span className="pkg-card__spec-value">{val}</span>
          </li>
        ))}
      </ul>

      {/* Features */}
      <ul className="pkg-card__features">
        {pkg.features.map((f) => (
          <li key={f}>
            <span className="pkg-card__check">✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.button
        className="btn btn--card"
        animate={hovered ? { boxShadow: `0 0 24px ${pkg.glowColor}` } : {}}
        whileTap={{ scale: 0.96 }}
        onClick={(e) => {
          e.stopPropagation()
          if (onSelect) onSelect(pkg)
        }}
      >
        เลือกแพ็กเกจนี้
      </motion.button>
    </motion.div>
  )
}
