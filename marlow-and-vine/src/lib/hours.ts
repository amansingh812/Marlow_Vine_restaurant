import type { DayHours } from '../data'

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const

interface LocalTime {
  day: DayHours['day']
  minutes: number // minutes since midnight
}

/** Current weekday + time-of-day in the venue's timezone, regardless of the visitor's. */
function nowIn(timezone: string, at: Date = new Date()): LocalTime {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: timezone,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(at)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = DAY_NAMES.find((d) => d === get('weekday')) ?? 'Monday'
  // "24" can appear for midnight with hour12: false
  const hour = Number(get('hour')) % 24
  return { day, minutes: hour * 60 + Number(get('minute')) }
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function todayHours(hours: DayHours[], timezone: string, at?: Date): DayHours | undefined {
  const { day } = nowIn(timezone, at)
  return hours.find((h) => h.day === day)
}

export function isOpenNow(hours: DayHours[], timezone: string, at?: Date): boolean {
  const { day, minutes } = nowIn(timezone, at)
  const today = hours.find((h) => h.day === day)
  if (!today || today.open === null || today.close === null) return false
  return minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)
}

/** "07:30" -> "7:30am", "15:00" -> "3pm" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h < 12 ? 'am' : 'pm'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return m === 0 ? `${hour12}${suffix}` : `${hour12}:${String(m).padStart(2, '0')}${suffix}`
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price)
}
