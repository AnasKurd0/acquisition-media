'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { openCalendly } from '@/lib/calendly'

const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Results', href: '/#social-proof' },
  { label: 'The Offer', href: '/#grand-slam-offer' },
  { label: 'Guarantee', href: '/#guarantee' },
  { label: 'FAQ', href: '/#faq' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuOpen && overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (menuOpen) {
      gsap.set(overlay, { display: 'flex' })
      gsap.fromTo(overlay, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power3.inOut' })
      gsap.fromTo(overlay.querySelectorAll('.nav-link'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, delay: 0.2, duration: 0.5, ease: 'power2.out' })
    } else {
      gsap.to(overlay, { clipPath: 'inset(0 0 100% 0)', duration: 0.4, ease: 'power3.inOut', onComplete: () => { gsap.set(overlay, { display: 'none' }) } })
    }
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#060606]/90 backdrop-blur-md border-b border-[#1a1a1a]' : 'bg-transparent'
        }`}
        style={{ top: '36px' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span
              className="w-2 h-2 rounded-full bg-[#e8ff00] group-hover:scale-150 transition-transform duration-300"
            />
            <span
              style={{ fontFamily: 'var(--font-bebas), Bebas Neue, sans-serif' }}
              className="text-xl text-[#f0f0f0] tracking-wider"
            >
              ACQUISITION MEDIA
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[#555555] hover:text-[#f0f0f0] transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton
              onClick={openCalendly}
              data-cursor="BOOK"
              className="px-5 py-2.5 bg-[#e8ff00] text-[#060606] text-sm font-bold tracking-wider hover:scale-105 transition-transform duration-200"
            >
              Book a Free Call
            </MagneticButton>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#f0f0f0] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#f0f0f0] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#f0f0f0] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        style={{ display: 'none', clipPath: 'inset(0 0 100% 0)' }}
        className="fixed inset-0 z-40 bg-[#060606] flex-col items-center justify-center gap-8 md:hidden"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link text-4xl font-display text-[#f0f0f0] tracking-widest hover:text-[#e8ff00] transition-colors"
            style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <button
          className="nav-link mt-4 px-8 py-4 bg-[#e8ff00] text-[#060606] font-bold tracking-widest"
          onClick={() => { setMenuOpen(false); openCalendly() }}
        >
          BOOK A FREE CALL
        </button>
      </div>
    </>
  )
}
