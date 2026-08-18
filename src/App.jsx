import Nav from './components/Nav'
import Hero from './components/Hero'
import Leak from './components/Leak'
import System from './components/System'
import Process from './components/Process'
import WhoItsFor from './components/WhoItsFor'
import Outcomes from './components/Outcomes'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-base">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Leak />
        <System />
        <Process />
        <WhoItsFor />
        <Outcomes />
        <FinalCTA />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <ChatWidget />
    </div>
  )
}
