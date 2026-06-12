import { useEffect, useState } from 'react'
import { business, copy, hours } from '../data'
import { formatTime, isOpenNow, todayHours } from '../lib/hours'
import Reveal from './Reveal'

export default function BookingStrip() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(timer)
  }, [])

  const open = isOpenNow(hours, business.timezone, now)
  const today = todayHours(hours, business.timezone, now)
  const todayLine =
    today && today.open && today.close
      ? `Open today ${formatTime(today.open)}–${formatTime(today.close)}`
      : 'Closed today'

  return (
    <section className="bg-ink py-16 text-bone md:py-20">
      <Reveal className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:px-8 md:text-left">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
            {copy.booking.heading}
          </h2>
          <p className="mt-3 max-w-xl text-bone/65">{copy.booking.body}</p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <p className="flex items-center gap-2.5 text-sm font-medium">
            <span
              className={`h-2 w-2 rounded-full ${open ? 'bg-sage' : 'bg-terracotta'}`}
              aria-hidden="true"
            />
            {todayLine}
            <span className="text-bone/50">· {open ? 'Open now' : 'Closed now'}</span>
          </p>
          <a
            href={business.phoneHref}
            className="rounded-full bg-terracotta px-10 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            {copy.booking.cta}
          </a>
          <a href={business.phoneHref} className="text-sm text-bone/60 hover:text-bone">
            or call {business.phone}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
