import { copy, reviews } from '../data'
import Reveal from './Reveal'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-terracotta" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      <span className="text-espresso/15">{'★'.repeat(5 - rating)}</span>
    </div>
  )
}

export default function Reviews() {
  const { reviewsSection } = copy

  return (
    <section id="reviews" className="border-y border-espresso/10 bg-white/50 py-20 dark:bg-white/[0.03] md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {reviewsSection.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-semibold tracking-tight">{reviewsSection.heading}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.author} delay={i * 0.12}>
              <figure className="flex h-full flex-col rounded-2xl bg-cream p-8 dark:bg-white/5">
                <Stars rating={review.rating} />
                <blockquote className="mt-6 flex-1 font-serif text-xl italic leading-relaxed text-espresso/85 md:text-2xl">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="font-semibold">{review.author}</span>
                  <span className="text-espresso/45"> — {review.source}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
