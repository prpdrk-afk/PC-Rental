import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────────────────
   Nav link definitions
   HOME → scroll to top (#hero)
   Others → placeholder sections (content added later)
───────────────────────────────────────────────────────── */
const navLinks = [
  { label: 'HOME',          href: '#hero',          icon: '⌂' },
  { label: 'AI IMAGE',      href: '#ai-image',      icon: '🤖' },
  { label: 'DESMOS',        href: '#desmos',         icon: '📈' },
  { label: 'MERMAID AI',    href: '#mermaid-ai',    icon: '🧩' },
  { label: 'LATEX',         href: '#latex',          icon: '∑' },
  { label: 'NOTEBOOK LM',   href: '#notebook-lm',   icon: '📓' },
  { label: 'PRESENTATION',  href: '#presentation',  icon: '🎯' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeHref, setActiveHref] = useState('#hero')

  /* ── Scroll listener: glass effect + active section detection ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // Detect which section is currently in view
      let current = '#hero'
      for (const link of navLinks) {
        const el = document.querySelector(link.href)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120) current = link.href
      }
      setActiveHref(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ── Close mobile menu on resize to desktop ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* ── Smooth scroll handler ── */
  const handleNav = useCallback((e, href) => {
    e.preventDefault()
    setMenuOpen(false)

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveHref('#hero')
      return
    }

    const el = document.querySelector(href)
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80 // navbar height
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }, [])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar__inner">

        {/* ── Logo ── */}
        <a
          className="navbar__logo"
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
          aria-label="PC RENTAL — กลับหน้าหลัก"
        >
          <span className="navbar__logo-icon">⬡</span>
          <span className="navbar__logo-text">
            PC<span className="navbar__logo-accent"> RENTAL</span>
            <span className="navbar__logo-sub"> RENTAL</span>
          </span>
        </a>

        {/* ── Desktop links ── */}
        <ul className="navbar__links" role="menubar">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href
            return (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  role="menuitem"
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                  onClick={(e) => handleNav(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="navbar__link-icon">{link.icon}</span>
                  <span className="navbar__link-label">{link.label}</span>
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.span
                      className="navbar__link-indicator"
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* ── Hamburger ── */}
        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <ul className="navbar__mobile-list">
              {navLinks.map((link, i) => {
                const isActive = activeHref === link.href
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                  >
                    <a
                      href={link.href}
                      className={`navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
                      onClick={(e) => handleNav(e, link.href)}
                    >
                      <span className="navbar__mobile-icon">{link.icon}</span>
                      <span>{link.label}</span>
                      {isActive && <span className="navbar__mobile-dot" />}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
