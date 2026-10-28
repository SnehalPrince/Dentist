// src/lib/hours.ts
// Computes the live open/closed status from hours.json
// Per 02_DATA_SOURCE_OF_TRUTH.md § 5 and 04_SITEMAP_AND_CONTENT.md

import type { WeeklyHours, DayKey, OpenStatus } from '@/types'
import { formatTime } from './utils'

const DAY_KEYS: DayKey[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

/**
 * Given a WeeklyHours object, computes whether the practice is currently open.
 * Returns an OpenStatus with a human-readable label and a verified flag.
 *
 * NEVER returns a hardcoded "Closed" string — always computed from current time.
 */
export function getOpenStatus(hours: WeeklyHours): OpenStatus {
  const now = new Date()
  const dayIndex = now.getDay() // 0=Sun, 1=Mon, ..., 6=Sat
  const dayKey = DAY_KEYS[dayIndex]
  const todayHours = hours[dayKey]

  // If hours are not verified, show a placeholder label
  if (!hours._verified || !todayHours.verified) {
    return {
      isOpen: false,
      label: 'Hours not yet verified — call (818) 347-8444',
      hoursVerified: false,
    }
  }

  if (!todayHours.open) {
    // Closed today — find next opening day
    const nextOpenLabel = getNextOpenLabel(hours, dayIndex)
    return {
      isOpen: false,
      label: nextOpenLabel ? `Closed · Opens ${nextOpenLabel}` : 'Closed today',
      hoursVerified: true,
    }
  }

  const [openHour, openMin] = todayHours.open.split(':').map(Number)
  const [closeHour, closeMin] = (todayHours.close ?? '00:00').split(':').map(Number)

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const openMinutes = openHour * 60 + openMin
  const closeMinutes = closeHour * 60 + closeMin

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes

  if (isOpen) {
    return {
      isOpen: true,
      label: `Open now · Closes at ${formatTime(todayHours.close)}`,
      hoursVerified: true,
    }
  } else if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      label: `Closed · Opens at ${formatTime(todayHours.open)}`,
      hoursVerified: true,
    }
  } else {
    const nextOpenLabel = getNextOpenLabel(hours, dayIndex)
    return {
      isOpen: false,
      label: nextOpenLabel ? `Closed · Opens ${nextOpenLabel}` : 'Closed for today',
      hoursVerified: true,
    }
  }
}

function getNextOpenLabel(hours: WeeklyHours, currentDayIndex: number): string | null {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  for (let i = 1; i <= 7; i++) {
    const nextIndex = (currentDayIndex + i) % 7
    const nextKey = DAY_KEYS[nextIndex]
    const nextHours = hours[nextKey]

    if (nextHours.open) {
      const label = i === 1 ? `tomorrow at ${formatTime(nextHours.open)}` : `${dayNames[nextIndex]} at ${formatTime(nextHours.open)}`
      return label
    }
  }

  return null
}

/** Get full display hours for the hours table in footer / contact page */
export function getDisplayHours(hours: WeeklyHours): { day: string; display: string; verified: boolean }[] {
  const dayLabels: { key: DayKey; label: string }[] = [
    { key: 'monday',    label: 'Monday' },
    { key: 'tuesday',   label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday',  label: 'Thursday' },
    { key: 'friday',    label: 'Friday' },
    { key: 'saturday',  label: 'Saturday' },
    { key: 'sunday',    label: 'Sunday' },
  ]

  return dayLabels.map(({ key, label }) => {
    const d = hours[key]
    if (!d.verified) {
      return { day: label, display: `${formatTime(d.open)} – [Verify hours]`, verified: false }
    }
    if (!d.open) {
      return { day: label, display: 'Closed', verified: true }
    }
    return { day: label, display: `${formatTime(d.open)} – ${formatTime(d.close)}`, verified: true }
  })
}
