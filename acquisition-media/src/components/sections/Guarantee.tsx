'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openCalendly } from '@/lib/calendly';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const checklistItems = [
  'Baseline established on day 1 — lead volume, enquiry rate, or revenue benchmark',
  'Target agreed in writing before a single pound is spent',
  'Weekly reporting — every Monday, plain English, no graphs that say nothing',
  'Direct access to the person doing the work — not an account manager',
  'No lock-in after month 3 — stay because it works, not because you signed',
  'If we miss the 90-day target, that month\'s fee is waived and we keep working',
];

export default function Guarantee() {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 70%',
              once: true,
              onEnter: () => {
                if (borderBarRef.current) {
                  gsap.fromTo(
                    borderBarRef.current,
                    { scaleY: 0 },
                    {
                      scaleY: 1,
                      duration: 0.7,
                      ease: 'power3.out',
                      delay: 0.2,
                    }
                  );
                }
              },
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="guarantee"
      style={{
        background: '#060606',
        paddingTop: '128px',
        paddingBottom: '128px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      {/* Headline */}
      <div
        style={{
          maxWidth: '896px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
            THREE GUARANTEES. IN WRITING.
          </p>
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(56px, 8vw, 120px)',
            lineHeight: 1.0,
            margin: 0,
            padding: 0,
          }}
        >
          <span style={{ color: '#f0f0f0', display: 'block' }}>
            Zero risk.
          </span>
          <span style={{ color: '#e8ff00', display: 'block' }}>
            On paper.
          </span>
        </h2>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        style={{
          maxWidth: '768px',
          margin: '64px auto 0',
          border: '1px solid #e8ff00',
          background: '#0d0d0d',
          padding: 'clamp(40px, 5vw, 56px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(232,255,0,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Animated left border bar */}
        <div
          ref={borderBarRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            background: '#e8ff00',
            transformOrigin: 'top center',
            transform: 'scaleY(0)',
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Body */}
          <p
            style={{
              color: '#f0f0f0',
              fontSize: '1.125rem',
              lineHeight: 1.75,
              marginBottom: '24px',
              margin: '0 0 24px 0',
            }}
          >
            We put a specific lead number in your contract before a single pound is spent — and we hit it within 90 days, or we keep working without charge until we do.
          </p>

          {/* Sub line */}
          <p
            style={{
              color: '#e8ff00',
              fontWeight: 700,
              letterSpacing: '0.08em',
              fontSize: '0.875rem',
              marginBottom: '32px',
              margin: '0 0 32px 0',
            }}
          >
            Not a marketing line. A number. In your contract. Before we start.
          </p>

          {/* How it works paragraph */}
          <p
            style={{
              color: '#555555',
              lineHeight: 1.75,
              marginBottom: '32px',
              margin: '0 0 32px 0',
            }}
          >
            On day one, we set a written baseline — your current lead volume, enquiry rate, or revenue figure. A specific target is agreed and written into the contract before any work begins. At day 90, we measure against it. No ambiguity. No moving goalposts. Either the number is in the contract and it was hit — or we keep working at no cost until it is.
          </p>

          {/* Checklist */}
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {checklistItems.map((item) => (
              <li
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: '#f0f0f0',
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    color: '#e8ff00',
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Guaranteed in writing badge */}
          <div style={{ marginTop: '28px' }}>
            <span
              style={{
                display: 'inline-block',
                border: '1px solid #e8ff00',
                color: '#e8ff00',
                padding: '5px 14px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              GUARANTEED IN WRITING
            </span>
          </div>

          {/* Fast-Start Guarantee */}
          <div
            style={{
              marginTop: '28px',
              borderTop: '1px solid #1a1a1a',
              paddingTop: '24px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                border: '1px solid #e8ff00',
                color: '#e8ff00',
                padding: '5px 14px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                marginBottom: '14px',
              }}
            >
              FAST-START GUARANTEE
            </span>
            <p
              style={{
                color: '#f0f0f0',
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: '0 0 8px 0',
              }}
            >
              First qualified enquiry from your Google Ads within 48 hours of campaign launch — or we pause billing until it happens.
            </p>
            <p
              style={{
                color: '#555555',
                fontSize: '0.875rem',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Google Ads, built properly, delivers results within 24–48 hours. We&apos;re confident enough in our process to put it in writing.
            </p>
          </div>

          {/* 30-Day Exit Guarantee */}
          <div
            style={{
              marginTop: '28px',
              borderTop: '1px solid #1a1a1a',
              paddingTop: '24px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                border: '1px solid #e8ff00',
                color: '#e8ff00',
                padding: '5px 14px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                marginBottom: '14px',
              }}
            >
              30-DAY WORRY-FREE EXIT
            </span>
            <p
              style={{
                color: '#f0f0f0',
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: '0 0 8px 0',
              }}
            >
              If you are unhappy with anything in your first 30 days — the communication, the direction, the creative — we refund your first month&rsquo;s retainer in full.
            </p>
            <p
              style={{
                color: '#555555',
                fontSize: '0.875rem',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              No clauses. No minimum spend threshold. No questions. Full refund. We are confident enough in the process that we do not need to trap you in it.
            </p>
          </div>

          {/* Footer note */}
          <p
            style={{
              color: '#555555',
              fontSize: '0.875rem',
              marginTop: '24px',
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}
          >
            We only take {`${2}`} more founding clients. That&rsquo;s not a sales tactic.
            It&rsquo;s precisely how we can guarantee the outcome — fewer clients means more control over each one.
          </p>

          {/* CTA */}
          <div style={{ marginTop: '32px' }}>
            <button
              type="button"
              onClick={openCalendly}
              style={{
                background: '#e8ff00',
                color: '#060606',
                padding: '14px 28px',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
            >
              CLAIM YOUR FOUNDING SPOT →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
