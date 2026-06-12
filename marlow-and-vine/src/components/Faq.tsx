import { copy, faqs } from '../data'
import Reveal from './Reveal'

export default function Faq() {
  const { faqSection } = copy

  return (
    <section id="faq" className="border-t border-espresso/10 bg-white/50 py-20 dark:bg-white/[0.03] md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {faqSection.eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-semibold tracking-tight">{faqSection.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 divide-y divide-espresso/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="text-terracotta transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-espresso/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
