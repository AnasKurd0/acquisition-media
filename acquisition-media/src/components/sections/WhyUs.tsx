'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GridBlock {
  title: string;
  body: string;
}

const gridBlocks: GridBlock[] = [
  {
    title: 'THE 4-CLIENT MAXIMUM',
    body: "Large agencies carry 50–200+ clients. We cap at 4. A founding client gets more founder attention in one week than most agencies give their best clients in a quarter. This is arithmetic, not a promise.",
  },
  {
    title: 'WE GUARANTEE WHAT THEY WON\'T',
    body: "No 50-client agency can offer a 90-day results guarantee. Too many variables, too many clients, too little control. We can — because with a maximum of 4 clients, we control enough variables to guarantee the outcome and actually mean it.",
  },
  {
    title: 'WE LAUNCH IN 48 HOURS',
    body: "Big agency timeline: brief → account manager → strategy meeting → creative team → internal review → client approval → launch. Six weeks. We launch Google Ads in 48 hours. When a competitor wins your top keyword today, 48 hours matters.",
  },
  {
    title: 'WE HAVE MORE TO LOSE THAN ANY LARGE AGENCY DOES',
    body: "At a 50-client agency, one churned client is a rounding error. At Acquisition Media, your results are our case study, our portfolio, our proof. We are structurally more invested in your outcome than any large agency ever could be.",
  },
  {
    title: 'THE WEBSITE YOU\'RE ON IS OUR PORTFOLIO',
    body: "We built this. The Three.js particle engine, the GSAP animations, the conversion architecture, the custom component library — every element. If you hired us to build yours, this is the standard we work to.",
  },
  {
    title: 'FOUNDING RATE. LOCKED IN FOREVER.',
    body: "40% below standard market rate, locked in for life. In two years when we have 50 clients and raise prices, founding clients stay at this rate. No annual increases. No renegotiation. The earlier you join, the better the deal — permanently.",
  },
];

const trustBadges = [
  { label: '90-DAY RESULTS GUARANTEE', icon: '✓' },
  { label: 'WRITTEN CONTRACT BEFORE WE START', icon: '✓' },
  { label: 'MONTH-TO-MONTH AFTER 90 DAYS', icon: '✓' },
  { label: 'DIRECT FOUNDER ACCESS', icon: '✓' },
];

export default function WhyUs() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const blocks = gridRef.current.querySelectorAll<HTMLElement>('[data-block]');
        if (blocks.length > 0) {
          gsap.fromTo(
            blocks,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 75%',
                once: true,
              },
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-us"
      style={{
        background: '#0d0d0d',
        paddingTop: '128px',
        paddingBottom: '128px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      {/* Headline */}
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: 1.05,
            margin: 0,
            padding: 0,
          }}
        >
          <span style={{ color: '#555555', display: 'block' }}>Six reasons we win</span>
          <span style={{ color: '#f0f0f0', display: 'block' }}>where they can&apos;t.</span>
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            color: '#555555',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginTop: '16px',
            marginBottom: 0,
          }}
        >
          Not better at the same game. Structurally different — in ways large agencies physically cannot replicate.
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        style={{
          maxWidth: '1024px',
          margin: '80px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          gap: '1px',
          background: '#1a1a1a',
        }}
        className="md-grid-cols-2"
      >
        {gridBlocks.map((block, index) => (
          <div
            key={index}
            data-block
            style={{
              background: '#0d0d0d',
              padding: '32px',
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(20px, 2.5vw, 32px)',
                color: '#f0f0f0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px',
                margin: '0 0 12px 0',
                lineHeight: 1.1,
              }}
            >
              {block.title}
            </h3>
            <p
              style={{
                color: '#555555',
                fontSize: '0.875rem',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {block.body}
            </p>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div
        style={{
          maxWidth: '1024px',
          margin: '48px auto 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {trustBadges.map((badge) => (
          <div
            key={badge.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #1a1a1a',
              padding: '8px 16px',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              fontWeight: 700,
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            <span style={{ color: '#e8ff00' }}>{badge.icon}</span>
            <span style={{ color: '#f0f0f0' }}>{badge.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (min-width: 1024px) {
          .md-grid-cols-2 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </section>
  );
}
