import WebSite from 'webSite'

const Home = () => {
  return (
    <WebSite />
  )
}

export default Home

export async function getStaticProps () {
  return {
    props: {
      protected: true
    }
  }
}
