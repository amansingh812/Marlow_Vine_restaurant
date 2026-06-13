import { useState } from 'react'

function currentlyDark(): boolean {
  return document.documentElement.classList.contains('dark')
}

interface Props {
  /** Header is transparent over the dark hero — render light icon/borders. */
  onDark?: boolean
}

/** Sun/moon switch. The pre-paint script in index.html sets the initial class. */
export default function ThemeToggle({ onDark = false }: Props) {
  const [dark, setDark] = useState(currentlyDark)

  // No system theme listener, we respect the user's manual preference and default to light.

  function toggle() {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setDark(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
        onDark
          ? 'border-bone/40 text-bone hover:bg-bone/15'
          : 'border-espresso/25 text-espresso/80 hover:bg-espresso/10'
      }`}
    >
      {dark ? (
        // sun
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-[18px] w-[18px]" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // moon
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  )
}
