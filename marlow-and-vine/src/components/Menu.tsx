import { useState } from 'react'
import { copy, menu } from '../data'
import type { DietaryTag } from '../data'
import { formatPrice } from '../lib/hours'
import Reveal from './Reveal'

const tagStyles: Record<DietaryTag, string> = {
  V: 'bg-sage/20 text-espresso',
  VG: 'bg-sage/35 text-espresso',
  GF: 'bg-terracotta/15 text-espresso',
}

export default function Menu() {
  const [activeId, setActiveId] = useState(menu[0].id)
  const active = menu.find((c) => c.id === activeId) ?? menu[0]
  const { menuSection } = copy

  return (
    <section id="menu" className="border-t border-espresso/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                {menuSection.eyebrow}
              </p>
              <h2 className="font-serif text-4xl font-semibold tracking-tight">{menuSection.heading}</h2>
              <p className="mt-3 text-lg text-espresso/60">{menuSection.sub}</p>
            </div>
            <p className="text-sm text-espresso/50">{menuSection.legend}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
            {menu.map((category) => (
              <button
                key={category.id}
                role="tab"
                aria-selected={category.id === activeId}
                onClick={() => setActiveId(category.id)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                  category.id === activeId
                    ? 'bg-espresso text-cream'
                    : 'border border-espresso/20 text-espresso/70 hover:bg-espresso/5'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-x-16 gap-y-7 md:grid-cols-2">
          {active.items.map((item) => (
            <li key={item.name}>
              <div className="flex items-baseline">
                <span className="font-serif text-lg font-semibold">{item.name}</span>
                {item.tags.length > 0 && (
                  <span className="ml-2.5 flex shrink-0 gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tagStyles[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
                <span className="relative -top-1.5 mx-4 flex-1 border-b-2 border-dotted border-espresso/20" aria-hidden="true" />
                <span className="tabular-nums">{formatPrice(item.price)}</span>
              </div>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-espresso/70">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
