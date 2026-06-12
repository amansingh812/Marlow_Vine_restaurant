/**
 * Marlow & Vine — single source of truth for all site content.
 *
 * To re-skin this site for a new client, edit this file only.
 * No copy, prices, hours, images or links live inside components.
 */

export type DietaryTag = 'V' | 'VG' | 'GF'

export interface MenuItem {
  name: string
  description: string
  price: number // AUD
  tags: DietaryTag[]
}

export interface MenuCategory {
  id: string
  label: string
  items: MenuItem[]
}

export interface DayHours {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  /** 24h "HH:MM", or null when closed all day */
  open: string | null
  close: string | null
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface Review {
  quote: string
  author: string
  source: string
  rating: number // out of 5
}

export interface Faq {
  question: string
  answer: string
}

/** A headline fragment; accented segments render in italic serif. */
export interface HeadlineSegment {
  text: string
  accent?: boolean
}

export interface Producer {
  name: string
  /** Wrap a phrase in *asterisks* for italics. */
  description: string
  tag: string
  icon: 'farming' | 'viticulture' | 'baking'
}

/** Site navigation. Hash links scroll on the homepage; paths are routes. */
export const nav = [
  { to: '/#menu', label: 'Menu' },
  { to: '/#gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/#visit', label: 'Visit' },
  { to: '/#faq', label: 'FAQ' },
]

export const business = {
  name: 'Marlow & Vine',
  shortName: 'M&V',
  tagline: 'Café & Kitchen — Fitzroy',
  description:
    'A neighbourhood café and kitchen on Gertrude Street. Seasonal brunch, specialty coffee roasted across the river, and a sunlit courtyard out back.',
  address: '84 Gertrude St, Fitzroy VIC 3065',
  mapsUrl: 'https://maps.google.com/?q=84+Gertrude+St,+Fitzroy+VIC+3065',
  phone: '(03) 9417 6203',
  phoneHref: 'tel:+61394176203',
  instagram: '@marlowandvine',
  instagramUrl: 'https://instagram.com/marlowandvine',
  email: 'hello@marlowandvine.com.au',
  timezone: 'Australia/Melbourne',
  googleRating: { score: 4.9, count: 312, label: 'Google Reviews' },
}

/** Weekly hours, Monday first. Used to compute the "Open now" badge. */
export const hours: DayHours[] = [
  { day: 'Monday', open: '07:00', close: '15:00' },
  { day: 'Tuesday', open: '07:00', close: '15:00' },
  { day: 'Wednesday', open: '07:00', close: '15:00' },
  { day: 'Thursday', open: '07:00', close: '15:00' },
  { day: 'Friday', open: '07:00', close: '16:00' },
  { day: 'Saturday', open: '07:30', close: '16:00' },
  { day: 'Sunday', open: '08:00', close: '15:00' },
]

export const menu: MenuCategory[] = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    items: [
      {
        name: 'Ricotta Hotcakes',
        description: 'Lemon ricotta hotcakes, poached rhubarb, honeycomb butter, candied walnuts',
        price: 24,
        tags: ['V'],
      },
      {
        name: 'Gertrude St Benedict',
        description: 'Poached eggs, leg ham, burnt-butter hollandaise, toasted potato sourdough',
        price: 25,
        tags: [],
      },
      {
        name: 'Smashed Avo',
        description: 'Avocado, whipped feta, pickled radish, dukkah, lime on rye sourdough',
        price: 22,
        tags: ['V'],
      },
      {
        name: 'Coconut Chia Bowl',
        description: 'Coconut chia pudding, mango, passionfruit curd, toasted buckwheat',
        price: 19,
        tags: ['VG', 'GF'],
      },
      {
        name: 'Mushrooms on Toast',
        description: 'Pan-roasted king browns, cashew cream, thyme, hazelnut crumb, sourdough',
        price: 23,
        tags: ['VG'],
      },
      {
        name: 'The Full Fitzroy',
        description: 'Eggs your way, bacon, pork & fennel sausage, roast tomato, hash brown, toast',
        price: 29,
        tags: [],
      },
      {
        name: 'House Granola',
        description: 'Maple-baked oats, almonds, seeds, vanilla yoghurt, seasonal fruit',
        price: 18,
        tags: ['V'],
      },
      {
        name: 'Chilli Scrambled Eggs',
        description: 'Soft scrambled eggs, chilli crisp, spring onion, coriander, milk bun',
        price: 21,
        tags: ['V'],
      },
    ],
  },
  {
    id: 'lunch',
    label: 'Lunch',
    items: [
      {
        name: 'Crispy Chicken Sandwich',
        description: 'Buttermilk-fried chicken, slaw, pickles, gochujang mayo, milk bun, chips',
        price: 26,
        tags: [],
      },
      {
        name: 'Harissa Pumpkin Salad',
        description: 'Roast pumpkin, freekeh, pomegranate, mint, whipped tahini',
        price: 23,
        tags: ['VG'],
      },
      {
        name: 'Wagyu Cheeseburger',
        description: 'Wagyu patty, American cheddar, burger sauce, onion jam, brioche, chips',
        price: 27,
        tags: [],
      },
      {
        name: 'Miso Salmon Bowl',
        description: 'Miso-glazed salmon, brown rice, edamame, pickled ginger, sesame greens',
        price: 28,
        tags: ['GF'],
      },
      {
        name: 'Haloumi Burger',
        description: 'Grilled haloumi, portobello, rocket, smoky capsicum relish, brioche, chips',
        price: 24,
        tags: ['V'],
      },
      {
        name: 'Steak Frites',
        description: '200g porterhouse, café de Paris butter, watercress, shoestring fries',
        price: 34,
        tags: ['GF'],
      },
      {
        name: 'Spring Pea Risotto',
        description: 'Pea & lemon risotto, mascarpone, pecorino, mint oil',
        price: 25,
        tags: ['V', 'GF'],
      },
      {
        name: 'Fish of the Day',
        description: 'Market fish, charred lemon, salsa verde, kipfler potatoes',
        price: 32,
        tags: ['GF'],
      },
    ],
  },
  {
    id: 'drinks',
    label: 'Coffee & Drinks',
    items: [
      {
        name: 'Batch Brew',
        description: 'Rotating single origin, brewed on the hour',
        price: 5.5,
        tags: ['VG', 'GF'],
      },
      {
        name: 'Flat White',
        description: 'House espresso blend, St David Dairy milk',
        price: 5,
        tags: ['V', 'GF'],
      },
      {
        name: 'Magic',
        description: 'Double ristretto, three-quarter steamed milk — the Melbourne way',
        price: 5.5,
        tags: ['V', 'GF'],
      },
      {
        name: 'Iced Long Black',
        description: 'Double espresso over ice, filtered water, orange twist',
        price: 6,
        tags: ['VG', 'GF'],
      },
      {
        name: 'Matcha Latte',
        description: 'Ceremonial-grade matcha, oat milk, light honey',
        price: 6.5,
        tags: ['V', 'GF'],
      },
      {
        name: 'Turmeric Chai',
        description: 'House-spiced chai, turmeric, steamed almond milk',
        price: 6.5,
        tags: ['VG', 'GF'],
      },
      {
        name: 'Yuzu Soda',
        description: 'Yuzu, mint, sparkling water, house citrus syrup',
        price: 7,
        tags: ['VG', 'GF'],
      },
      {
        name: 'Cold-Pressed Green',
        description: 'Apple, celery, cucumber, kale, ginger, lemon',
        price: 9,
        tags: ['VG', 'GF'],
      },
    ],
  },
  {
    id: 'sweets',
    label: 'Sweets & Pastries',
    items: [
      {
        name: 'Burnt Basque Cheesecake',
        description: 'Caramelised top, vanilla bean, macerated strawberries',
        price: 12,
        tags: ['V', 'GF'],
      },
      {
        name: 'Almond Croissant',
        description: 'Twice-baked, frangipane, flaked almonds, dusted sugar',
        price: 8.5,
        tags: ['V'],
      },
      {
        name: 'Banana Bread',
        description: 'Toasted, espresso mascarpone, walnut praline',
        price: 9.5,
        tags: ['V'],
      },
      {
        name: 'Chocolate Babka',
        description: 'Dark chocolate swirl, orange zest, served warm',
        price: 8,
        tags: ['V'],
      },
      {
        name: 'Lamington',
        description: 'Raspberry jam, vanilla sponge, coconut, double cream',
        price: 7.5,
        tags: ['V'],
      },
      {
        name: 'Sticky Date Pudding',
        description: 'Butterscotch sauce, vanilla ice cream, pecan crumble',
        price: 13,
        tags: ['V'],
      },
      {
        name: 'Vegan Brownie',
        description: 'Fudgy dark chocolate, sea salt, raspberry dust',
        price: 7,
        tags: ['VG', 'GF'],
      },
      {
        name: 'Pavlova',
        description: 'Crisp meringue, passionfruit, kiwi, chantilly cream',
        price: 12.5,
        tags: ['V', 'GF'],
      },
    ],
  },
]

export const gallery: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=70',
    alt: 'Seasonal brunch plates on a timber table',
  },
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=70',
    alt: 'Flat white with latte art on the espresso bar',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=70',
    alt: 'Warm evening light across the dining room',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=70',
    alt: 'Café interior with bentwood chairs and greenery',
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=70',
    alt: 'Shared dishes passed across the table',
  },
  {
    src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=70',
    alt: 'Miso salmon bowl with sesame greens',
  },
  {
    src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=70',
    alt: 'Morning regulars at the window bench',
  },
  {
    src: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=70',
    alt: 'Poached eggs on sourdough with herbs',
  },
]

export const reviews: Review[] = [
  {
    quote:
      'The ricotta hotcakes are the best brunch in Fitzroy, full stop. Coffee is consistently excellent and the courtyard is a hidden gem.',
    author: 'Sophie L.',
    source: 'Google Reviews',
    rating: 5,
  },
  {
    quote:
      'Everything a neighbourhood café should be — warm staff, a menu that actually changes with the seasons, and a magic that rivals anywhere in Melbourne.',
    author: 'Daniel R.',
    source: 'Broadsheet reader review',
    rating: 5,
  },
  {
    quote:
      'Took my parents for Sunday lunch and the steak frites won them over instantly. Great gluten-free options too, which is rare for brunch spots.',
    author: 'Priya K.',
    source: 'Google Reviews',
    rating: 4,
  },
]

export const faqs: Faq[] = [
  {
    question: 'Do you take bookings?',
    answer:
      'We take bookings for groups of 6 or more, seven days a week — call us on (03) 9417 6203. Smaller tables are walk-in only, and the queue moves fast on weekends.',
  },
  {
    question: 'Are you dog friendly?',
    answer:
      'Absolutely. Dogs are welcome in the courtyard and at our footpath tables, and we keep water bowls and house-baked dog treats behind the counter.',
  },
  {
    question: 'Do you cater for dietary requirements?',
    answer:
      'Most of the menu can be adapted — look for the V (vegetarian), VG (vegan) and GF (gluten-free) tags. Our kitchen handles gluten and nuts, so please let staff know about allergies.',
  },
  {
    question: 'Is there parking nearby?',
    answer:
      'Gertrude Street has metered street parking, and there is a Wilson car park on Smith Street a three-minute walk away. The 86 tram stops right outside our door.',
  },
  {
    question: 'Can you host private events?',
    answer:
      'Yes — the courtyard seats 30 and can be booked for evening events Thursday to Saturday. Email hello@marlowandvine.com.au for our functions pack.',
  },
  {
    question: 'Do you serve food all day?',
    answer:
      'Breakfast runs all day until close. The lunch menu kicks in from 11:30am, and pastries are baked fresh each morning until sold out.',
  },
]

/** All section copy for the homepage — edit here, never in components. */
export const copy = {
  hero: {
    eyebrow: 'Specialty coffee · Seasonal kitchen · Open 7 days',
    headline: [
      { text: 'All-day ' },
      { text: 'brunch', accent: true },
      { text: ' & natural ' },
      { text: 'wine', accent: true },
      { text: ' in the heart of Fitzroy' },
    ] as HeadlineSegment[],
    image: {
      // Also referenced by the <link rel="preload"> in index.html — keep in sync.
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=60',
      alt: 'Sunlit café interior with timber tables and greenery',
    },
    primaryCta: 'Book a Table',
    secondaryCta: 'View Menu',
  },
  intro: {
    heading: 'A space designed for slow mornings and spirited evenings.',
    body: 'Rooted in the vibrant culture of Fitzroy, Marlow & Vine is a celebration of local produce, mindful sourcing, and the simple joy of gathering around a table.',
    quote: 'Our kitchen is guided by the seasons, pouring natural wines that tell a story of their terroir.',
    polaroids: [gallery[1], gallery[4]],
  },
  menuSection: {
    eyebrow: 'The Menu',
    heading: 'Morning & Midday',
    sub: 'A seasonal menu focused on local provenance.',
    legend: 'V vegetarian · VG vegan · GF gluten free',
  },
  booking: {
    heading: 'Join us at the table',
    body: "Whether it's a quiet morning coffee or a spirited evening over a bottle of wine, we'd love to have you.",
    cta: 'Book a Table',
  },
  gallerySection: {
    eyebrow: 'Gallery',
    heading: 'From the floor',
    instagramCta: 'Follow us on Instagram',
  },
  reviewsSection: {
    eyebrow: 'Reviews',
    heading: 'Kind words',
  },
  findUs: {
    eyebrow: 'Visit',
    heading: 'Find us',
    directionsCta: 'Get Directions',
  },
  faqSection: {
    eyebrow: 'FAQ',
    heading: 'Good to know',
  },
  footer: {
    blurb: 'A boutique hospitality experience blending morning light and evening warmth.',
  },
}

/** About page content. Wrap a phrase in *asterisks* for italics. */
export const aboutPage = {
  title: 'About — Marlow & Vine',
  hero: {
    heading: 'A love letter to Fitzroy.',
    body: 'Born from a desire to capture the rhythm of our neighbourhood, Marlow & Vine is a space that breathes with the day. We blend the ritual of morning coffee culture with the unhurried intimacy of an evening wine bar.',
    image: {
      src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=70',
      alt: 'Barista pouring coffee at the espresso bar',
    },
  },
  vision: {
    heading: 'The Vision',
    paragraphs: [
      'We saw a gap between the bustling morning cafe and the secluded evening restaurant. Our vision was to create a continuous thread — a place where you could linger from a morning espresso to an afternoon pet-nat without breaking the spell.',
      'Our approach is rooted in *mindful sourcing*. Every bottle on our shelf and every ingredient on our plates tells a story of local Victorian produce. We champion small-scale artisans who prioritise soil health and minimal intervention, ensuring that what you taste is a true reflection of the region.',
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=70',
      alt: 'A glass of natural red wine in warm evening light',
    },
  },
  quote: {
    text: 'We wanted to create a room that feels like a shared living space for the neighbourhood.',
    attribution: 'The Owners',
  },
  producers: {
    heading: 'The Producers',
    items: [
      {
        name: 'Daylesford Organics',
        description:
          'Providing our seasonal heirloom vegetables and herbs, cultivated with regenerative farming practices.',
        tag: 'Farming',
        icon: 'farming',
      },
      {
        name: 'Yarra Valley Minimalists',
        description:
          'Our partners in low-intervention wines, focusing on native yeast fermentations and zero additions.',
        tag: 'Viticulture',
        icon: 'viticulture',
      },
      {
        name: 'Fitzroy Sourdough Co.',
        description:
          'Baking daily using heritage grains milled right here in Melbourne for our morning service.',
        tag: 'Baking',
        icon: 'baking',
      },
    ] as Producer[],
  },
  cta: {
    heading: 'Join us for brunch or a glass of wine.',
    button: 'Make a Reservation',
    backgroundImage:
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=50',
  },
}
