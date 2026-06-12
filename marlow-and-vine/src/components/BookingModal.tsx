import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { business, hours as venueHours, type DayHours } from '../data'
import { formatTime } from '../lib/hours'

// ── helpers ────────────────────────────────────────────────────────────────

/** Today's date string (YYYY-MM-DD) in Melbourne timezone. */
function melbourneToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne' }).format(new Date())
}

/** Current time of day in Melbourne, minutes since midnight. */
function melbourneNowMinutes(): number {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Melbourne',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date())
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return h * 60 + m
}

/** Day-of-week name from a YYYY-MM-DD string. */
function dayOfWeek(dateStr: string): DayHours['day'] {
  const [y, mo, d] = dateStr.split('-').map(Number)
  const names: DayHours['day'][] = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ]
  return names[new Date(y, mo - 1, d, 12).getDay()]
}

/** 30-min slots from `open` to `close − 60 min` (last seating). */
function generateSlots(open: string, close: string): string[] {
  const [oh, om] = open.split(':').map(Number)
  const [ch, cm] = close.split(':').map(Number)
  const lastSeating = ch * 60 + cm - 60
  const slots: string[] = []
  let cur = oh * 60 + om
  while (cur <= lastSeating) {
    const h = Math.floor(cur / 60)
    const mn = cur % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(mn).padStart(2, '0')}`)
    cur += 30
  }
  return slots
}

/** Human-readable date: "Friday 12 June 2026" */
function formatDisplayDate(dateStr: string): string {
  const [y, mo, d] = dateStr.split('-').map(Number)
  return new Date(y, mo - 1, d).toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ── icons ──────────────────────────────────────────────────────────────────

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-terracotta" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </svg>
  )
}

// ── component ──────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: Props) {
  const today = melbourneToday()

  const [partySize, setPartySize] = useState(2)
  const [date, setDate] = useState(today)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  // Derive time slots for the selected day
  const dayEntry = venueHours.find((h) => h.day === dayOfWeek(date))
  const slots =
    dayEntry?.open && dayEntry?.close ? generateSlots(dayEntry.open, dayEntry.close) : []
  const nowMin = melbourneNowMinutes()
  const isToday = date === today

  function isSlotDisabled(slot: string) {
    if (!isToday) return false
    const [h, m] = slot.split(':').map(Number)
    return h * 60 + m <= nowMin + 30 // require ≥30 min notice
  }

  // Deselect if selected slot becomes unavailable after date change
  useEffect(() => {
    if (selectedTime && isSlotDisabled(selectedTime)) setSelectedTime(null)
  }, [date]) // eslint-disable-line react-hooks/exhaustive-deps

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  function handleConfirm() {
    if (!selectedTime) return
    setConfirmed(true)
  }

  function handleClose() {
    onClose()
    // Reset form after the exit animation
    setTimeout(() => {
      setConfirmed(false)
      setPartySize(2)
      setDate(melbourneToday())
      setSelectedTime(null)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
    }, 400)
  }

  const canConfirm = !!selectedTime && firstName.trim() !== '' && email.trim() !== ''

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-t-[32px] bg-cream shadow-2xl sm:rounded-[32px]"
            style={{ maxHeight: 'min(92vh, 900px)' }}
            initial={{ y: 48, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            {/* Inner flex column — required for sticky header/footer inside max-height */}
            <div className="flex max-h-[inherit] flex-col">
              <AnimatePresence mode="wait">
                {!confirmed ? (
                  <motion.div
                    key="form"
                    className="flex min-h-0 flex-col"
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* ── Modal header ── */}
                    <div className="flex shrink-0 items-center justify-between border-b border-espresso/10 bg-cream px-8 pb-6 pt-8">
                      <h2
                        id="booking-modal-title"
                        className="font-serif text-2xl font-semibold text-espresso"
                      >
                        Reserve a Table
                      </h2>
                      <button
                        onClick={handleClose}
                        aria-label="Close modal"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-espresso/55 transition-colors hover:bg-espresso/10 hover:text-espresso"
                      >
                        <IconClose />
                      </button>
                    </div>

                    {/* ── Scrollable body ── */}
                    <div className="modal-scroll flex flex-1 flex-col gap-10 overflow-y-auto p-8">

                      {/* Party size */}
                      <section className="flex flex-col gap-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/50">
                          Party Size
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <button
                              key={n}
                              onClick={() => setPartySize(n)}
                              className={`h-12 w-12 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 ${
                                partySize === n
                                  ? 'border-terracotta bg-terracotta text-bone shadow-sm'
                                  : 'border-espresso/25 text-espresso hover:border-terracotta hover:text-terracotta'
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </section>

                      {/* Date & time */}
                      <section className="flex flex-col gap-6 sm:flex-row sm:gap-10">
                        {/* Date */}
                        <div className="flex flex-1 flex-col gap-4">
                          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/50">
                            Date
                          </span>
                          <div className="relative">
                            <input
                              type="date"
                              value={date}
                              min={today}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full appearance-none border-0 border-b border-espresso bg-transparent py-3 pl-0 pr-10 text-base text-espresso transition-all focus:border-b-2 focus:border-terracotta focus:outline-none"
                            />
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-espresso/55">
                              <IconCalendar />
                            </span>
                          </div>
                        </div>

                        {/* Time slots */}
                        <div className="flex flex-[1.5] flex-col gap-4">
                          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/50">
                            Available Times
                          </span>
                          {slots.length === 0 ? (
                            <p className="text-sm italic text-espresso/55">
                              Closed on this day — please choose another date.
                            </p>
                          ) : (
                            <div className="flex flex-wrap gap-3">
                              {slots.map((slot) => {
                                const disabled = isSlotDisabled(slot)
                                return (
                                  <button
                                    key={slot}
                                    disabled={disabled}
                                    onClick={() => setSelectedTime(slot)}
                                    className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 ${
                                      disabled
                                        ? 'cursor-not-allowed border-espresso/10 text-espresso/30'
                                        : selectedTime === slot
                                          ? 'border-terracotta bg-terracotta text-bone shadow-sm'
                                          : 'border-espresso/25 text-espresso hover:border-terracotta hover:text-terracotta'
                                    }`}
                                  >
                                    {formatTime(slot)}
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </section>

                      {/* Guest details */}
                      <section className="flex flex-col gap-6 border-t border-espresso/10 pt-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/50">
                          Guest Details
                        </span>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border-0 border-b border-espresso/40 bg-transparent py-3 px-0 text-base text-espresso placeholder-espresso/35 transition-all focus:border-b-2 focus:border-terracotta focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border-0 border-b border-espresso/40 bg-transparent py-3 px-0 text-base text-espresso placeholder-espresso/35 transition-all focus:border-b-2 focus:border-terracotta focus:outline-none"
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-0 border-b border-espresso/40 bg-transparent py-3 px-0 text-base text-espresso placeholder-espresso/35 transition-all focus:border-b-2 focus:border-terracotta focus:outline-none sm:col-span-2"
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border-0 border-b border-espresso/40 bg-transparent py-3 px-0 text-base text-espresso placeholder-espresso/35 transition-all focus:border-b-2 focus:border-terracotta focus:outline-none sm:col-span-2"
                          />
                        </div>
                      </section>
                    </div>

                    {/* ── Modal footer ── */}
                    <div className="flex shrink-0 justify-end border-t border-espresso/10 bg-cream px-8 py-6">
                      <button
                        onClick={handleConfirm}
                        disabled={!canConfirm}
                        className="group flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-8 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-bone transition-colors hover:bg-espresso hover:text-cream disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                      >
                        Confirm Reservation
                        <IconArrow />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Confirmation state ── */
                  <motion.div
                    key="confirmed"
                    className="flex flex-col items-center justify-center px-10 py-14 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.1 }}
                  >
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-espresso/15 bg-espresso/5">
                      <IconCheck />
                    </div>
                    <h2 className="font-serif text-2xl font-medium italic text-espresso">
                      We've saved your table.
                    </h2>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-espresso/60">
                      A confirmation email has been sent to you. We look forward to hosting you at{' '}
                      {business.name}.
                    </p>

                    {/* Booking summary */}
                    <div className="mt-8 w-full rounded-2xl bg-espresso/5 p-6">
                      {[
                        { label: 'Date', value: formatDisplayDate(date) },
                        { label: 'Time', value: formatTime(selectedTime!) },
                        { label: 'Guests', value: `${partySize} ${partySize === 1 ? 'Person' : 'People'}` },
                      ].map((row, i, arr) => (
                        <div
                          key={row.label}
                          className={`flex items-center justify-between py-2.5 ${
                            i < arr.length - 1 ? 'border-b border-espresso/10' : ''
                          }`}
                        >
                          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/50">
                            {row.label}
                          </span>
                          <span className="text-sm font-medium text-espresso">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleClose}
                      className="mt-8 w-full rounded-full border border-espresso/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-espresso transition-colors hover:bg-espresso/8"
                    >
                      Return to Site
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
