import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Story from './components/Story.jsx'
import Spotlight from './components/Spotlight.jsx'
import Collection from './components/Collection.jsx'
import ModelGallery from './components/ModelGallery.jsx'
import Sets from './components/Sets.jsx'
import Subscription from './components/Subscription.jsx'
import Materials from './components/Materials.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <Story />
        <Spotlight />
        <Collection />
        <ModelGallery />
        <Sets />
        <Subscription />
        <Materials />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
