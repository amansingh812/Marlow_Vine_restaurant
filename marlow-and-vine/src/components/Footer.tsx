import { business, copy, hours } from '../data'
import { formatTime } from '../lib/hours'

export default function Footer() {
  const openDays = hours.filter((d) => d.open && d.close)
  const hoursSummary =
    openDays.length > 0
      ? `Hours: ${formatTime(openDays[0].open!)} — ${formatTime(
          openDays.reduce((latest, d) => (d.close! > latest.close! ? d : latest), openDays[0]).close!,
        )}`
      : 'Hours vary'

  return (
    <footer className="bg-ink pb-28 pt-16 text-bone md:pb-16">
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-10 px-6 md:flex-row md:px-8">
        <div className="max-w-sm">
          <p className="font-serif text-3xl font-semibold">{business.name}</p>
          <p className="mt-5 text-sm leading-relaxed text-bone/55">{copy.footer.blurb}</p>
          <p className="mt-8 text-sm text-bone/60">
            © {new Date().getFullYear()} {business.name}. Fitzroy, Melbourne.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-bone/60">Details</h4>
          <p className="text-bone/70">{hoursSummary}</p>
          <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="text-bone/70 transition-colors hover:text-terracotta">
            {business.address}
          </a>
          <a href={business.phoneHref} className="text-bone/70 transition-colors hover:text-terracotta">
            {business.phone}
          </a>
          <a href={`mailto:${business.email}`} className="text-bone/70 transition-colors hover:text-terracotta">
            {business.email}
          </a>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-bone/60">Social</h4>
          <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="text-bone/70 transition-colors hover:text-terracotta">
            Instagram {business.instagram}
          </a>
          <a href={business.phoneHref} className="mt-3 font-semibold text-terracotta brightness-125">
            Book a Table
          </a>
        </div>
      </div>
    </footer>
  )
}
