import useSWR from 'swr'
import { BASE_URL } from 'utils/config'
import ListOfCampaings from 'components/listOfCampaings'

const Site = () => {
  const { data = {}, error } = useSWR(`${BASE_URL}/campaigns/byUser`)

  const { data: campaigns = [] } = data || {}

  if (error) return <p>error</p>

  return (
    <div>
      <ListOfCampaings error={false} data={campaigns} />
    </div>

  )
}

export default Site
