'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function TrackBooking() {
  useEffect(() => {
    trackEvent('booking_confirmed', { event_category: 'conversion', value: 1, currency: 'GBP' })
  }, [])
  return null
}
