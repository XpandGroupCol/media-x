import useSWR from 'swr'
import { GET_CAMPAIGN_BY_USER } from 'utils/config'

const useGetCampaignsByUser = () => {
  const { data, error } = useSWR(GET_CAMPAIGN_BY_USER)

  const isLoading = !data && !error

  return {
    isLoading,
    error,
    campaigns: isLoading ? [1, 2, 3] : data?.data
  }
}

export default useGetCampaignsByUser
