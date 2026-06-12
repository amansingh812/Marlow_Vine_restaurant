import { business, copy, hours } from '../data'
import { formatTime, todayHours } from '../lib/hours'
import Reveal from './Reveal'

export default function FindUs() {
  const today = todayHours(hours, business.timezone)
  const { findUs } = copy

  return (
    <section id="visit" className="mx-auto grid max-w-[1200px] gap-14 px-6 py-20 md:grid-cols-2 md:px-8 md:py-28">
      <Reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          {findUs.eyebrow}
        </p>
        <h2 className="font-serif text-4xl font-semibold tracking-tight">{findUs.heading}</h2>
        <address className="mt-8 space-y-4 not-italic text-espresso/80">
          <p className="font-serif text-xl">{business.address}</p>
          <p>
            <a href={business.phoneHref} className="underline decoration-terracotta/40 underline-offset-4 hover:decoration-terracotta">
              {business.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${business.email}`} className="hover:text-terracotta">
              {business.email}
            </a>
          </p>
          <p>
            <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-terracotta">
              {business.instagram}
            </a>
          </p>
        </address>
        <a
          href={business.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-full bg-terracotta px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-bone transition-colors hover:bg-espresso hover:text-cream"
        >
          {findUs.directionsCta}
        </a>
      </Reveal>
      <Reveal delay={0.12}>
        <h3 className="font-serif text-2xl font-semibold">Hours</h3>
        <table className="mt-6 w-full max-w-sm text-sm">
          <tbody>
            {hours.map((day) => {
              const isToday = day.day === today?.day
              return (
                <tr
                  key={day.day}
                  className={`border-b border-espresso/10 last:border-0 ${isToday ? 'font-semibold text-terracotta' : 'text-espresso/70'}`}
                >
                  <th scope="row" className="py-3 text-left font-[inherit]">
                    {day.day}
                  </th>
                  <td className="py-3 text-right tabular-nums">
                    {day.open && day.close ? `${formatTime(day.open)} – ${formatTime(day.close)}` : 'Closed'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Reveal>
    </section>
  )
}
