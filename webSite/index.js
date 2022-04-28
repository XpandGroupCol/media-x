import AboutAs from './aboutAs'
import ActionSection from './actionSection'
import Experiences from './experiences'
import Footer from './footer'
import Header from './header'
import Partners from './partners'
import Questons from './questions'

const WebSite = () => {
  const { media = [] } = {}
  return (
    <>
      <Header media={media} />
      <AboutAs />
      <Experiences />
      <Partners />
      <Questons />
      <ActionSection />
      <Footer />
    </>
  )
}

export default WebSite
