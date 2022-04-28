import WebSite from 'webSite'

const Home = () => {
  return (
    <WebSite />
  )
}

export default Home

export async function getStaticProps (context) {
  return {
    props: {
      protected: true
    }
  }
}
