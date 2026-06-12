import { motion } from 'motion/react'
import { business, copy } from '../data'
import { unsplashSrcSet } from '../lib/unsplash'

export default function Hero() {
  const { hero } = copy

  return (
    <section id="top" className="relative flex h-[88vh] min-h-[600px] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero.image.src}
          srcSet={unsplashSrcSet(hero.image.src, [768, 1080, 1600, 1920])}
          sizes="100vw"
          alt={hero.image.alt}
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-ink/55" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-[1200px] px-6 text-center text-bone"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-bone/80">{hero.eyebrow}</p>
        <h1 className="mx-auto max-w-4xl font-serif text-4xl font-semibold leading-[1.15] tracking-tight md:text-6xl">
          {hero.headline.map((segment, i) =>
            segment.accent ? (
              <em key={i} className="font-normal italic text-terracotta brightness-150">
                {segment.text}
              </em>
            ) : (
              <span key={i}>{segment.text}</span>
            ),
          )}
        </h1>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={business.phoneHref}
            className="rounded-full bg-terracotta px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            {hero.primaryCta}
          </a>
          <a
            href="#menu"
            className="rounded-full border border-bone/70 px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            {hero.secondaryCta}
          </a>
        </div>
      </motion.div>

      {/* Floating Google rating badge */}
      <motion.div
        className="absolute bottom-8 right-6 z-10 md:bottom-12 md:right-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
      >
        <div className="rotate-2 rounded-2xl bg-cream/95 px-5 py-4 shadow-lg backdrop-blur">
          <p className="font-serif text-2xl font-semibold leading-none">
            {business.googleRating.score}
            <span className="ml-1.5 text-base text-terracotta" aria-hidden="true">
              ★★★★★
            </span>
          </p>
          <p className="mt-1.5 text-xs text-espresso/60">
            {business.googleRating.count} {business.googleRating.label}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
