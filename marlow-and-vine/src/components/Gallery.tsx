import { business, copy, gallery } from '../data'
import Reveal from './Reveal'

// Alternating aspect ratios give the masonry columns their rhythm
// while keeping explicit dimensions (no layout shift on image load).
const aspects = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[4/3]']

export default function Gallery() {
  const { gallerySection } = copy

  return (
    <section id="gallery" className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              {gallerySection.eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-semibold tracking-tight">{gallerySection.heading}</h2>
          </div>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="self-start rounded-full border border-espresso/25 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-espresso hover:text-cream md:self-auto"
          >
            {gallerySection.instagramCta}
          </a>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 columns-2 gap-4 md:columns-4 [&>img]:mb-4">
          {gallery.map((image, i) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className={`w-full break-inside-avoid rounded-2xl object-cover ${aspects[i % aspects.length]}`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
