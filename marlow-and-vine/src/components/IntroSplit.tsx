import { copy } from '../data'
import Reveal from './Reveal'

export default function IntroSplit() {
  const { intro } = copy
  const [first, second] = intro.polaroids

  return (
    <section className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-8 md:py-28">
      <Reveal>
        <h2 className="font-serif text-3xl font-semibold leading-snug tracking-tight md:text-4xl">
          {intro.heading}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-espresso/65">{intro.body}</p>
        <blockquote className="mt-8 border-l-2 border-terracotta pl-6 font-serif text-xl italic leading-relaxed">
          “{intro.quote}”
        </blockquote>
      </Reveal>
      <Reveal delay={0.15} className="relative h-[420px] md:h-[500px]">
        <figure className="absolute right-4 top-0 z-10 w-56 -rotate-3 rounded bg-white p-3 pb-8 shadow-md transition-transform duration-300 hover:z-30 hover:rotate-0 hover:scale-[1.02] md:right-10 md:w-64">
          <img
            src={first.src}
            alt={first.alt}
            className="aspect-[4/5] w-full rounded-sm object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <figure className="absolute bottom-0 left-2 z-20 w-64 rotate-[4deg] rounded bg-white p-3 pb-8 shadow-md transition-transform duration-300 hover:z-30 hover:rotate-0 hover:scale-[1.02] md:bottom-6 md:left-10 md:w-72">
          <img
            src={second.src}
            alt={second.alt}
            className="aspect-[4/5] w-full rounded-sm object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </Reveal>
    </section>
  )
}
