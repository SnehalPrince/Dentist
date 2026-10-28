// src/hooks/useOpenStatus.ts
import { useState, useEffect } from 'react'
import type { OpenStatus } from '@/types'
import type { WeeklyHours } from '@/types'
import { getOpenStatus } from '@lib/hours'

export function useOpenStatus(hours: WeeklyHours): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(() => getOpenStatus(hours))

  useEffect(() => {
    // Re-compute every minute to keep badge accurate
    const interval = setInterval(() => {
      setStatus(getOpenStatus(hours))
    }, 60_000)
    return () => clearInterval(interval)
  }, [hours])

  return status
}
