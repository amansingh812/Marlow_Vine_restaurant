import { useEffect } from 'react'
import { aboutPage, business } from '../data'
import type { Producer } from '../data'
import Reveal from '../components/Reveal'

/** Renders *asterisk-wrapped* phrases as italics. */
function withEmphasis(text: string) {
  return text.split('*').map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))
}

const producerIcons: Record<Producer['icon'], React.ReactNode> = {
  farming: (
    // sprout
    <path d="M12 20v-8m0 0c0-3.5-2.5-6-6-6 0 3.5 2.5 6 6 6Zm0 0c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6Z" />
  ),
  viticulture: (
    // wine glass
    <path d="M8 3h8c0 5-1.5 8-4 8s-4-3-4-8Zm4 8v7m-4 3h8" />
  ),
  baking: (
    // bread loaf
    <path d="M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 2 7.5V20H6v-4.5A4 4 0 0 1 4 12Zm6 0v3m4-3v3" />
  ),
}

export default function About() {
  useEffect(() => {
    const previous = document.title
    document.title = aboutPage.title
    return () => {
      document.title = previous
    }
  }, [])

  const { hero, vision, quote, producers, cta } = aboutPage

  return (
    <main className="pt-32 md:pt-40">
      {/* Hero split */}
      <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-20 md:grid-cols-12 md:gap-8 md:px-8 md:pb-28">
        <Reveal className="md:col-span-7">
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso/65">{hero.body}</p>
        </Reveal>
        <Reveal delay={0.15} className="md:col-span-5">
          <figure className="mx-auto w-full max-w-md rotate-2 rounded bg-white p-3 pb-10 shadow-md transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              className="aspect-[4/3] w-full rounded-sm object-cover md:aspect-square"
              loading="eager"
              decoding="async"
            />
          </figure>
        </Reveal>
      </section>

      {/* The Vision — offset split */}
      <section className="mx-auto grid max-w-[1200px] gap-12 px-6 py-12 md:grid-cols-12 md:gap-8 md:px-8 md:py-20">
        <Reveal className="md:col-span-5 md:col-start-2">
          <figure className="-rotate-1 rounded bg-white p-3 pb-10 shadow-md transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]">
            <img
              src={vision.image.src}
              alt={vision.image.alt}
              className="aspect-[4/5] w-full rounded-sm object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </Reveal>
        <Reveal delay={0.12} className="flex flex-col justify-center md:col-span-5 md:col-start-8">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">{vision.heading}</h2>
          {vision.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-6 leading-relaxed text-espresso/65">
              {withEmphasis(paragraph)}
            </p>
          ))}
        </Reveal>
      </section>

      {/* Pull quote */}
      <Reveal>
        <section className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <span className="font-serif text-5xl italic text-terracotta" aria-hidden="true">
            ”
          </span>
          <blockquote className="mt-4 font-serif text-2xl italic leading-relaxed md:text-3xl">
            “{quote.text}”
          </blockquote>
          <cite className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] not-italic text-espresso/55">
            — {quote.attribution}
          </cite>
        </section>
      </Reveal>

      {/* Producers */}
      <section className="mx-auto max-w-[1200px] px-6 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight">
            {producers.heading}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {producers.items.map((producer, i) => (
            <Reveal key={producer.name} delay={i * 0.1}>
              <div className="flex h-full flex-col items-start rounded-2xl bg-white/50 p-8 transition-colors hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-5 h-8 w-8 text-terracotta"
                  aria-hidden="true"
                >
                  {producerIcons[producer.icon]}
                </svg>
                <h3 className="font-serif text-lg font-semibold">{producer.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso/65">
                  {withEmphasis(producer.description)}
                </p>
                <span className="mt-5 rounded-full bg-sage px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">
                  {producer.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <Reveal>
        <section className="mx-auto max-w-[1200px] px-6 pb-20 md:px-8 md:pb-28">
          <div className="relative overflow-hidden rounded-2xl bg-ink p-12 text-center md:p-24">
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
              style={{ backgroundImage: `url(${cta.backgroundImage})` }}
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-bone md:text-4xl">
                {cta.heading}
              </h2>
              <a
                href={business.phoneHref}
                className="mt-8 inline-block rounded-full bg-terracotta px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-bone transition-colors hover:bg-bone hover:text-ink"
              >
                {cta.button}
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  )
}
