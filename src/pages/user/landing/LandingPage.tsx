import CallToAction from "./CallToAction"
import FeaturesSection from "./Features"
import Footer from "./Footer"
import HeroSection from "./Hero"
import HowItWorks from "./HowItWorks"
import Testimonials from "./Testimonials"

const LandingPage = () => {
  return (
    <div>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorks/>
      <Testimonials/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default LandingPage
