import ListOfCampaings from 'components/listOfCampaings'
import useGetCampaignsByUser from 'hooks/useGetCampaignsByUser'

const Site = () => {
  const { campaigns, error, isLoading } = useGetCampaignsByUser()

  if (error) return <p>error</p>

  return (
    <div>
      <ListOfCampaings data={campaigns} isLoading={isLoading} />
    </div>

  )
}

export default Site
