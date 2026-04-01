'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { openCalendly } from '@/lib/calendly';

gsap.registerPlugin(ScrollTrigger);

const headlineLines: { text: string; color: string }[] = [
  { text: 'READY TO STOP', color: '#f0f0f0' },
  { text: 'GUESSING AND', color: '#f0f0f0' },
  { text: 'START GROWING?', color: '#e8ff00' },
];

export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const lines = lineRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { y: 100 },
        {
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleBooking = () => {
    openCalendly();
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="bg-[#0d0d0d] px-6"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        {/* Badge */}
        <span className="border border-[#e8ff00] text-[#e8ff00] px-3 py-1 text-xs font-bold tracking-widest inline-block mb-8">
          LIMITED — 4 FOUNDING SPOTS OPEN
        </span>

        {/* Headline with radial glow */}
        <div className="relative">
          {/* Glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 50% 40%, rgba(232,255,0,0.08) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          {/* Lines */}
          {headlineLines.map(({ text, color }, i) => (
            <div
              key={text}
              style={{ overflow: 'hidden', lineHeight: 1 }}
            >
              <div
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 'clamp(56px, 9vw, 140px)',
                  lineHeight: 1,
                  color,
                }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>

        {/* Sub-copy */}
        <p className="mt-6 text-[#555555] text-lg leading-relaxed max-w-xl mx-auto">
          30 minutes. A real growth plan for your business. Yours to keep whether you move forward or not.
          <br />
          No pitch. No pressure. No BS.
          <br />
          Just an honest conversation about what growth actually looks like for your business.
        </p>

        {/* CTA */}
        <div className="mt-12">
          <MagneticButton
            className="px-10 py-5 bg-[#e8ff00] text-[#060606] font-bold tracking-widest text-sm hover:scale-105 transition-transform"
            data-cursor="BOOK"
            onClick={handleBooking}
          >
            BOOK YOUR FREE STRATEGY CALL
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
