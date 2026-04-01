'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { benchmarks } from '@/data/benchmarks'

gsap.registerPlugin(ScrollTrigger)

export default function BenchmarkStats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical dividers (gap-px columns) — target the bg wrapper itself
      // We achieve the divider scaleY effect by animating pseudo-elements via wrapper divs
      const dividers = gridRef.current?.querySelectorAll<HTMLElement>('.stat-divider')
      if (dividers && dividers.length > 0) {
        gsap.fromTo(
          dividers,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Fade in stat blocks
      const blocks = gridRef.current?.querySelectorAll<HTMLElement>('.stat-block')
      if (blocks && blocks.length > 0) {
        gsap.fromTo(
          blocks,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{ backgroundColor: '#060606' }}
      className="py-32 px-6"
    >
      {/* Top label */}
      <p
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          color: '#555555',
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Why our methodology is built the way it is
      </p>

      {/* Centred heading */}
      <h2
        style={{
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: 'clamp(36px, 5vw, 64px)',
          color: '#f0f0f0',
          lineHeight: 1.05,
          textAlign: 'center',
          maxWidth: '640px',
          margin: '0 auto 4rem',
        }}
      >
        The numbers that shaped our process.
      </h2>

      {/* Stats grid wrapper — gap-px trick: bg is the border colour */}
      <div
        ref={gridRef}
        className="max-w-5xl mx-auto"
        style={{ position: 'relative' }}
      >
        {/*
          We use a flex row with manually inserted divider elements so we can
          animate their scaleY independently. On mobile (2-col) each column pair
          also gets a divider.
        */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          {benchmarks.map((benchmark, index) => (
            <div
              key={index}
              className="stat-block"
              style={{
                backgroundColor: '#060606',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Animated vertical divider on the right edge (except last in each row) */}
              {index !== benchmarks.length - 1 && (
                <span
                  className="stat-divider hidden md:block"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '10%',
                    right: 0,
                    width: '1px',
                    height: '80%',
                    backgroundColor: '#1a1a1a',
                    transformOrigin: 'top center',
                    display: 'block',
                  }}
                />
              )}

              {/* Animated number */}
              <div
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 'clamp(56px, 8vw, 96px)',
                  color: '#f0f0f0',
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter
                  value={benchmark.value}
                  suffix={benchmark.suffix}
                  duration={2}
                  className=""
                />
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  color: '#555555',
                  fontSize: '0.875rem',
                  marginTop: '0.75rem',
                  lineHeight: 1.4,
                }}
              >
                {benchmark.label}
              </p>

              {/* Source */}
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  color: '#555555',
                  fontSize: '0.75rem',
                  marginTop: '0.5rem',
                  fontStyle: 'italic',
                }}
              >
                [{benchmark.source}]
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footnote */}
      <p
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          color: '#555555',
          fontSize: '0.875rem',
          marginTop: '2rem',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        These are industry benchmarks. They&apos;re why we built our process the way we did — and why it works.
      </p>
    </section>
  )
}
