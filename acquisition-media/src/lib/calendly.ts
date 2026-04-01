declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL!

export function openCalendly() {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
  }
}
