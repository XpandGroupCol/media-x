import { getCampaignById } from 'services/campaignServices'

const Checkout = ({ campaign }) => {
  return (
    <section>
      <h1>Estado</h1>
      {JSON.stringify(campaign, 2, null)}
    </section>
  )
}

export async function getServerSideProps ({ req, query }) {
  const token = req.cookies?.sessionid || null

  const { id, status } = query

  if (!id || !status || !token) {
    return {
      redirect: {
        destination: '/campaigns',
        permanent: false
      }
    }
  }

  try {
    const { data: campaign } = await getCampaignById(id, token)
    const { user, ...restOfCampaign } = campaign
    return {
      props: {
        campaign: { ...restOfCampaign }
      }
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/campaigns',
        permanent: false
      }
    }
  }
}

export default Checkout
