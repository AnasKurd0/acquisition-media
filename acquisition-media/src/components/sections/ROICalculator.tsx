'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openCalendly } from '@/lib/calendly';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function formatCurrency(value: number): string {
  return '£' + value.toLocaleString('en-GB');
}

interface SliderProps {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function Slider({ label, value, displayValue, min, max, step, onChange }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <span style={{ color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 600 }}>
          {label}
        </span>
        <span style={{ color: '#e8ff00', fontSize: '0.875rem', fontWeight: 700, transition: 'all 0.2s ease' }}>
          {displayValue}
        </span>
      </div>
      <div style={{ position: 'relative', height: '4px' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '9999px', background: '#1a1a1a' }} />
        <div
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: `${percentage}%`,
            borderRadius: '9999px',
            background: '#e8ff00',
            transition: 'width 0.1s ease',
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: 'absolute', inset: 0, width: '100%',
            opacity: 0, cursor: 'pointer', height: '100%',
            margin: 0, padding: 0, zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute', top: '50%', left: `${percentage}%`,
            transform: 'translate(-50%, -50%)',
            width: '18px', height: '18px',
            borderRadius: '50%', background: '#e8ff00',
            border: '2px solid #060606', boxShadow: '0 0 0 2px #e8ff00',
            transition: 'left 0.1s ease', pointerEvents: 'none', zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

interface ResultRowProps {
  label: string;
  value: string;
  accent?: boolean;
  large?: boolean;
  isLast?: boolean;
}

function ResultRow({ label, value, accent, large, isLast }: ResultRowProps) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', paddingBottom: '16px' }}>
        <span style={{ color: '#555555', fontSize: '0.875rem', fontWeight: 500 }}>{label}</span>
        <span
          style={{
            color: accent ? '#e8ff00' : '#f0f0f0',
            fontSize: large ? '1.875rem' : '1.5rem',
            fontWeight: 700,
            transition: 'all 0.2s ease',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </span>
      </div>
      {!isLast && <div style={{ height: '1px', background: '#1a1a1a' }} />}
    </>
  );
}

const industryPresets = [
  { label: 'Dental', adSpend: 2500, conversionRate: 25, clientValue: 3500, cpl: 20 },
  { label: 'Legal', adSpend: 3500, conversionRate: 15, clientValue: 6000, cpl: 30 },
  { label: 'Trades', adSpend: 1800, conversionRate: 30, clientValue: 2000, cpl: 8 },
  { label: 'Wellness', adSpend: 2000, conversionRate: 20, clientValue: 1200, cpl: 15 },
];

export default function ROICalculator() {
  const [adSpend, setAdSpend] = useState(1500);
  const [conversionRate, setConversionRate] = useState(20);
  const [clientValue, setClientValue] = useState(1500);
  const [cpl, setCpl] = useState(7.25);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const { leads, clients, monthlyRevenue, annualRevenue } = useMemo(() => {
    const leads = Math.round(adSpend / cpl);
    const clients = Math.round(leads * conversionRate / 100);
    const monthlyRevenue = clients * clientValue;
    const annualRevenue = monthlyRevenue * 12;
    return { leads, clients, monthlyRevenue, annualRevenue };
  }, [adSpend, conversionRate, clientValue, cpl]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: leftColRef.current, start: 'top 70%', once: true } }
        );
      }
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rightColRef.current, start: 'top 70%', once: true } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const applyPreset = (preset: typeof industryPresets[0]) => {
    setActivePreset(preset.label);
    setAdSpend(preset.adSpend);
    setConversionRate(preset.conversionRate);
    setClientValue(preset.clientValue);
    setCpl(preset.cpl);
  };

  return (
    <section
      id="roi-calculator"
      style={{ background: '#0d0d0d', paddingTop: '128px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1.05,
              margin: 0,
              padding: 0,
            }}
          >
            <span style={{ color: '#555555', display: 'block' }}>What could your business</span>
            <span style={{ color: '#f0f0f0', display: 'block' }}>actually make?</span>
          </h2>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '48px', marginTop: '64px' }}
          className="lg:grid-cols-2"
        >
          {/* Left column — controls */}
          <div ref={leftColRef}>
            {/* Industry preset buttons */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ color: '#555555', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Quick fill by industry:
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {industryPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      border: '1px solid',
                      borderColor: activePreset === preset.label ? '#e8ff00' : '#1a1a1a',
                      background: activePreset === preset.label ? '#e8ff00' : 'transparent',
                      color: activePreset === preset.label ? '#060606' : '#555555',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {preset.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <Slider
              label="Monthly Ad Spend"
              value={adSpend}
              displayValue={formatCurrency(adSpend)}
              min={500}
              max={8000}
              step={100}
              onChange={(v) => { setActivePreset(null); setAdSpend(v); }}
            />
            <Slider
              label="Cost Per Lead (£)"
              value={cpl}
              displayValue={'£' + cpl.toFixed(2)}
              min={3}
              max={50}
              step={0.25}
              onChange={(v) => { setActivePreset(null); setCpl(v); }}
            />
            <Slider
              label="Avg. Lead-to-Client %"
              value={conversionRate}
              displayValue={`${conversionRate}%`}
              min={5}
              max={40}
              step={1}
              onChange={(v) => { setActivePreset(null); setConversionRate(v); }}
            />
            <Slider
              label="Average Client Value (£)"
              value={clientValue}
              displayValue={formatCurrency(clientValue)}
              min={500}
              max={8000}
              step={100}
              onChange={(v) => { setActivePreset(null); setClientValue(v); }}
            />
          </div>

          {/* Right column — results */}
          <div ref={rightColRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#060606', border: '1px solid #1a1a1a', padding: '32px' }}>
              <p style={{ color: '#555555', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 24px 0' }}>
                Your Projected Return
              </p>

              <ResultRow label="Estimated monthly leads" value={leads.toString()} />
              <ResultRow label="Estimated new clients/month" value={clients.toString()} />
              <ResultRow label="Projected monthly revenue" value={formatCurrency(monthlyRevenue)} accent />
              <ResultRow label="Projected annual revenue" value={formatCurrency(annualRevenue)} accent large isLast />

              <p style={{ color: '#555555', fontSize: '0.75rem', marginTop: '16px', fontStyle: 'italic', lineHeight: 1.5 }}>
                Default CPL of £7.25 is based on our real campaign data — 27 qualified leads for £200 ad spend. Adjust to your industry. Results vary by niche, location, and competition.
              </p>
            </div>

            <button
              type="button"
              onClick={openCalendly}
              style={{
                display: 'block',
                width: '100%',
                background: '#e8ff00',
                color: '#060606',
                paddingTop: '16px',
                paddingBottom: '16px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                fontSize: '0.875rem',
                textAlign: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
            >
              BOOK A STRATEGY CALL →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #roi-calculator .lg\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
