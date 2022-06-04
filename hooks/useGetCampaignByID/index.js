import { campaignAtom } from 'globalState/campaignAtom'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { GET_CAMPAIGN_BY_ID } from 'utils/config'
import { setCamapign } from 'utils/transformData'

const useGetCampaignByID = () => {
  const { query } = useRouter()
  const [campaign, updateCampaign] = useAtom(campaignAtom)

  const { data, error } = useSWR(!query?.id || campaign?.id ? null : `${GET_CAMPAIGN_BY_ID}/${query.id}`, {
    onSuccess: ({ data }) => updateCampaign({ ...setCamapign(data) })
  })

  const campaignState = data?.data || campaign

  return {
    isLoading: !campaignState?.id && !error,
    error,
    campaignState,
    updateCampaign
  }
}

export default useGetCampaignByID
