import { business, copy } from '../data'

interface Props {
  onOpenBooking: () => void
}

/** Mobile-only persistent booking bar pinned to the bottom of the viewport. */
export default function StickyBookBar({ onOpenBooking }: Props) {
  return (
    <nav className="fixed bottom-0 z-50 flex w-full items-center gap-3 bg-cream px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
      <a
        href={business.phoneHref}
        aria-label={`Call ${business.name} on ${business.phone}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-espresso/25 text-espresso"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
        </svg>
      </a>
      <button
        onClick={onOpenBooking}
        className="flex h-12 flex-1 items-center justify-center rounded-full bg-terracotta text-xs font-semibold uppercase tracking-[0.15em] text-bone"
      >
        {copy.booking.cta}
      </button>
    </nav>
  )
}
