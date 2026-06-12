import Hero from '../components/Hero'
import IntroSplit from '../components/IntroSplit'
import Menu from '../components/Menu'
import BookingStrip from '../components/BookingStrip'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import FindUs from '../components/FindUs'
import Faq from '../components/Faq'

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroSplit />
      <Menu />
      <BookingStrip />
      <Gallery />
      <Reviews />
      <FindUs />
      <Faq />
    </main>
  )
}
