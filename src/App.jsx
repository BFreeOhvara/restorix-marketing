import Nav from './components/Nav'
import Hero from './components/Hero'
import Leak from './components/Leak'
import System from './components/System'
import Process from './components/Process'
import WhoItsFor from './components/WhoItsFor'
import Outcomes from './components/Outcomes'
import Testimonials from './components/Testimonials'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-base">
      <Nav />
      <main>
        <Hero />
        <Leak />
        <System />
        <Process />
        <WhoItsFor />
        <Outcomes />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
