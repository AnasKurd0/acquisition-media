'use client'

import { useState } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

type Step = 1 | 2 | 3 | 4 | 5

interface Answers {
  businessType: string
  monthlyRevenue: string
  adBudget: string
  prevAds: string
  biggestChallenge: string
}

const DISQUALIFY_BUDGET = 'Under £500/month'

function qualifies(answers: Partial<Answers>): boolean {
  return answers.adBudget !== DISQUALIFY_BUDGET
}

export default function QualifyPage() {
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [disqualified, setDisqualified] = useState(false)

  function choose(field: keyof Answers, value: string) {
    const updated = { ...answers, [field]: value }
    setAnswers(updated)

    if (field === 'adBudget' && value === DISQUALIFY_BUDGET) {
      setDisqualified(true)
      trackEvent('qualify_disqualified', { event_category: 'qualification', budget: value })
      return
    }

    const nextStep = (step + 1) as Step
    if (nextStep > 5) {
      // All answered — go to book
      trackEvent('qualify_passed', { event_category: 'qualification' })
      window.location.href = '/book'
    } else {
      setStep(nextStep)
    }
  }

  if (disqualified) {
    return <DisqualifiedView answers={answers} />
  }

  return (
    <div style={{ background: '#060606', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ width: '100%', maxWidth: '560px' }}>

        {/* Back */}
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#333333', textDecoration: 'none', textTransform: 'uppercase', display: 'inline-block', marginBottom: '48px' }}
        >
          ← Acquisition Media
        </Link>

        {/* Progress */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '48px' }}>
          {([1, 2, 3, 4, 5] as Step[]).map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: '2px',
                background: s <= step ? '#e8ff00' : '#1a1a1a',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Step label */}
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
          QUESTION {step} OF 5
        </p>

        {/* Questions */}
        {step === 1 && (
          <Question
            q="What does your business do?"
            hint="Helps us prepare before we get on the call."
            options={[
              'Local trades or home services',
              'Health, wellness or fitness',
              'Legal, finance or professional services',
              'E-commerce or retail',
              'Other service business',
            ]}
            onSelect={(v) => choose('businessType', v)}
          />
        )}

        {step === 2 && (
          <Question
            q="What's your approximate monthly revenue right now?"
            hint="No wrong answer — we work with businesses at different stages."
            options={[
              'Pre-revenue / just starting',
              'Under £5,000/month',
              '£5,000–£15,000/month',
              '£15,000–£50,000/month',
              '£50,000+/month',
            ]}
            onSelect={(v) => choose('monthlyRevenue', v)}
          />
        )}

        {step === 3 && (
          <Question
            q="What monthly budget could you allocate to paid advertising?"
            hint="This is ad spend — separate from any management fee. Our recommended minimum is £1,500/month."
            options={[
              'Under £500/month',
              '£500–£1,500/month',
              '£1,500–£3,000/month',
              '£3,000–£6,000/month',
              '£6,000+/month',
            ]}
            onSelect={(v) => choose('adBudget', v)}
          />
        )}

        {step === 4 && (
          <Question
            q="Have you run paid ads before?"
            hint="Helps us calibrate the conversation — no experience needed."
            options={[
              "No — this would be our first time",
              "Yes — boosted posts only, nothing proper",
              "Yes — we ran campaigns but got poor results",
              "Yes — we have active campaigns running now",
            ]}
            onSelect={(v) => choose('prevAds', v)}
          />
        )}

        {step === 5 && (
          <Question
            q="What's your biggest marketing challenge right now?"
            hint="We'll make sure the call addresses this directly."
            options={[
              "Not enough leads coming in",
              "Leads come in but don't convert",
              "No idea which channel to invest in",
              "Been burned by agencies before",
              "Need to scale what's already working",
            ]}
            onSelect={(v) => choose('biggestChallenge', v)}
          />
        )}

      </div>
    </div>
  )
}

function Question({ q, hint, options, onSelect }: {
  q: string
  hint: string
  options: string[]
  onSelect: (v: string) => void
}) {
  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', color: '#f0f0f0', lineHeight: 1.1, margin: '0 0 12px 0', letterSpacing: '0.02em' }}>
        {q.toUpperCase()}
      </h1>
      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.875rem', lineHeight: 1.6, margin: '0 0 32px 0' }}>
        {hint}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            style={{
              background: '#0d0d0d',
              border: '1px solid #1a1a1a',
              color: '#f0f0f0',
              padding: '16px 20px',
              textAlign: 'left',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '0.9375rem',
              lineHeight: 1.5,
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = '#e8ff00'
              el.style.background = 'rgba(232,255,0,0.04)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = '#1a1a1a'
              el.style.background = '#0d0d0d'
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function DisqualifiedView({ answers }: { answers: Partial<Answers> }) {
  return (
    <div style={{ background: '#060606', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ width: '100%', maxWidth: '560px' }}>
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#333333', textDecoration: 'none', textTransform: 'uppercase', display: 'inline-block', marginBottom: '48px' }}
        >
          ← Acquisition Media
        </Link>

        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
          HONEST ANSWER
        </p>

        <h1 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, margin: '0 0 24px 0' }}>
          <span style={{ color: '#f0f0f0', display: 'block' }}>We might not be</span>
          <span style={{ color: '#e8ff00', display: 'block' }}>the right fit yet.</span>
        </h1>

        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 24px 0' }}>
          Paid advertising works best when there is enough budget for the algorithm to learn. Below £500/month, the data comes in too slowly to optimise — meaning results take longer and cost more to achieve.
        </p>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 40px 0' }}>
          We'd rather tell you this now than take your money and underdeliver. That's not a business we want to run.
        </p>

        <div style={{ border: '1px solid #1a1a1a', background: '#0d0d0d', padding: '32px', marginBottom: '32px' }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
            WHAT WE RECOMMEND INSTEAD
          </p>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: '0 0 16px 0' }}>
            Read the free playbook. It shows exactly how we generated 27 leads for £200 — the same methodology you could apply manually or with a small budget test. When you're ready to scale, we'll be here.
          </p>
          <a
            href="/playbook"
            style={{ display: 'inline-block', background: '#e8ff00', color: '#060606', padding: '14px 28px', fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', textDecoration: 'none', transition: 'opacity 0.2s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
          >
            READ THE FREE PLAYBOOK →
          </a>
        </div>

        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.8125rem', lineHeight: 1.65 }}>
          If your situation changes, the strategy call is always open.{' '}
          <a href="/book" style={{ color: '#555555', textDecoration: 'underline' }}>Book here.</a>
        </p>
      </div>
    </div>
  )
}
