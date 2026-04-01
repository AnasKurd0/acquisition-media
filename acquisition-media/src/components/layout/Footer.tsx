'use client'
import { openCalendly } from '@/lib/calendly'

const serviceLinks = [
  { label: 'Performance Websites', href: '#services' },
  { label: 'Google Ads', href: '#services' },
  { label: 'Meta Ads', href: '#services' },
  { label: 'TikTok Ads', href: '#services' },
  { label: 'Local SEO', href: '#services' },
]

export function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#1a1a1a] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#e8ff00]" />
              <span
                className="text-2xl text-[#f0f0f0] tracking-wider"
                style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
              >
                ACQUISITION MEDIA
              </span>
            </div>
            <p className="text-[#555555] text-sm leading-relaxed">
              We build. We grow. We deliver.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#f0f0f0] text-xs font-bold tracking-widest mb-4 uppercase">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-[#555555] text-sm hover:text-[#f0f0f0] transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#f0f0f0] text-xs font-bold tracking-widest mb-4 uppercase">Contact</h4>
            <a href="mailto:hello@acquisitionmedia.co.uk" className="text-[#555555] text-sm hover:text-[#e8ff00] transition-colors block mb-3">
              hello@acquisitionmedia.co.uk
            </a>
            <button
              type="button"
              onClick={openCalendly}
              className="inline-block px-4 py-2 bg-[#e8ff00] text-[#060606] text-xs font-bold tracking-wider hover:scale-105 transition-transform"
            >
              Book a Free Strategy Call
            </button>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#555555] text-xs">
            © 2026 Acquisition Media. All rights reserved.
          </p>
          <p className="text-[#555555] text-xs">
            Built with ❤️ using Next.js, Three.js &amp; GSAP
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-[#555555] text-xs hover:text-[#f0f0f0] transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-[#555555] text-xs hover:text-[#f0f0f0] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
