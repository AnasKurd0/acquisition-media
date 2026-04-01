'use client'
import { useRef, ReactNode } from 'react'
import { gsap } from 'gsap'

interface Props {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  'data-cursor'?: string
}

export function MagneticButton({ children, className = '', onClick, href, 'data-cursor': dataCursor = 'CLICK' }: Props) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }

  const props = {
    ref: ref as React.RefObject<HTMLAnchorElement>,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    'data-cursor': dataCursor,
  }

  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
    >
      {children}
    </button>
  )
}
