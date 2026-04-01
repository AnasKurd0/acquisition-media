'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqs } from '@/data/faq';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(list.querySelectorAll<HTMLLIElement>('li'));
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: list,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-[#060606] py-32 px-6">
      {/* Headline */}
      <h2
        className="max-w-5xl mx-auto"
        style={{
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: 'clamp(48px, 7vw, 96px)',
          lineHeight: 1,
          color: '#f0f0f0',
        }}
      >
        Got questions?
      </h2>

      {/* Accordion */}
      <ul ref={listRef} className="max-w-3xl mx-auto mt-16 list-none p-0 m-0">
        {faqs.map(({ q, a }, index) => {
          const isOpen = openIndex === index;

          return (
            <li key={index} className="border-b border-[#1a1a1a]">
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center py-6 text-left cursor-pointer bg-transparent border-0 p-0"
                aria-expanded={isOpen}
              >
                <span className="text-[#f0f0f0] text-base font-semibold pr-6 leading-snug">
                  {q}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    flexShrink: 0,
                    fontSize: '1.5rem',
                    lineHeight: 1,
                    color: '#e8ff00',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    userSelect: 'none',
                  }}
                >
                  +
                </span>
              </button>

              {/* Answer panel */}
              <div
                style={{
                  maxHeight: isOpen ? '400px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}
                aria-hidden={!isOpen}
              >
                <p className="text-[#555555] text-sm leading-relaxed pb-6">{a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
