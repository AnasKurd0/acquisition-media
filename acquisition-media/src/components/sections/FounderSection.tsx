'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { openCalendly } from '@/lib/calendly'

gsap.registerPlugin(ScrollTrigger)

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: leftRef.current, start: 'top 75%', once: true } }
        )
      }
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: rightRef.current, start: 'top 75%', once: true } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="founder"
      ref={sectionRef}
      style={{ background: '#0d0d0d', paddingTop: '128px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px', borderTop: '1px solid #1a1a1a' }}
    >
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px', alignItems: 'center' }}>

          {/* Left — Photo */}
          <div ref={leftRef} style={{ opacity: 0 }} className="founder-photo-col">
            <div style={{ position: 'relative', overflow: 'hidden', background: '#0d0d0d', border: '1px solid #1a1a1a', maxWidth: '380px', aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!imgError ? (
                <Image
                  src="/founder.jpg"
                  alt="Anas Agha — Founder, Acquisition Media"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority={false}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '32px' }}>
                  <p style={{ fontFamily: 'var(--font-bebas), sans-serif', fontSize: '1rem', color: '#333333', letterSpacing: '0.1em' }}>ANAS AGHA</p>
                  <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: '#333333', marginTop: '8px' }}>Add /public/founder.jpg</p>
                </div>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: '#e8ff00' }} />
            </div>
          </div>

          {/* Right — Copy */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 24px 0' }}>
              WHO YOU WORK WITH
            </p>
            <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.0, margin: '0 0 24px 0' }}>
              <span style={{ color: '#f0f0f0', display: 'block' }}>You don&apos;t hire</span>
              <span style={{ color: '#e8ff00', display: 'block' }}>an agency.</span>
              <span style={{ color: '#f0f0f0', display: 'block' }}>You work with Anas.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 20px 0' }}>
              Anas Agha. Founder of Acquisition Media. British-Kurdish entrepreneur, Head of International Relations at a global trade and consultancy firm operating across the Middle East, and creator. Built three ventures — including a £2M+ e-commerce platform and the ad methodology that generated 27 qualified leads for £200 in spend — all while studying GCSEs.
            </p>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 36px 0' }}>
              When you become a client, you don&apos;t talk to an account manager. You message Anas directly. He runs your campaigns. He reviews your creative. He calls you when results are good — and when they need fixing. That&apos;s not a promise. It&apos;s a structural fact.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <button
                type="button"
                onClick={openCalendly}
                style={{ background: '#e8ff00', color: '#060606', padding: '16px 36px', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', transition: 'opacity 0.2s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
              >
                BOOK A CALL WITH ANAS →
              </button>
              <a
                href="https://anasagha.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', textDecoration: 'underline', letterSpacing: '0.05em' }}
              >
                See Anas&apos;s personal site →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .founder-grid { grid-template-columns: 1fr 1.5fr !important; }
          .founder-photo-col { max-width: none; }
        }
      `}</style>
    </section>
  )
}
