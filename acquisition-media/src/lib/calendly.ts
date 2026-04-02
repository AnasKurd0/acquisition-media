declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (opts: { url: string }) => void
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement; prefill?: Record<string, unknown>; utm?: Record<string, unknown> }) => void
    }
  }
}

export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL!

export function openCalendly() {
  if (typeof window !== 'undefined') {
    window.location.href = '/book'
  }
}
