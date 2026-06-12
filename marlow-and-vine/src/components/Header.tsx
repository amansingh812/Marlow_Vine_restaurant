import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { business, nav } from '../data'
import ThemeToggle from './ThemeToggle'

interface Props {
  onOpenBooking: () => void
}

export default function Header({ onOpenBooking }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  // Only the homepage has a dark hero behind the header.
  const solid = scrolled || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        solid
          ? 'border-b border-espresso/10 bg-cream/80 text-espresso shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent text-bone'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-4 md:px-8">
        <Link to="/" className="font-serif text-2xl font-semibold tracking-tight">
          {business.name}
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((link) => {
            const active = !link.to.includes('#') && pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors hover:text-terracotta ${
                  active
                    ? 'border-b-2 border-terracotta pb-0.5 font-semibold text-terracotta'
                    : solid
                      ? 'text-espresso/75'
                      : 'text-bone/90'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle onDark={!solid} />
          <button
            onClick={onOpenBooking}
            className="rounded-full bg-terracotta px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-bone transition-colors hover:bg-espresso hover:text-cream"
          >
            Book a Table
          </button>
        </div>
      </div>
    </header>
  )
}
