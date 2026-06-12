import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import StickyBookBar from './components/StickyBookBar'
import BookingModal from './components/BookingModal'
import { lazy, Suspense } from 'react'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))

/** Scrolls to the hash target after route changes, or to the top for plain paths. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <BrowserRouter>
      <ScrollManager />
      <Header onOpenBooking={() => setBookingOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-[#FAF9F6] text-[#4A5D23]">Loading...</div>}>
              <About />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
      <StickyBookBar onOpenBooking={() => setBookingOpen(true)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </BrowserRouter>
  )
}

export default App
