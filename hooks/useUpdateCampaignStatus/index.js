import useNotification from 'hooks/useNotification'
import { useCallback, useState } from 'react'
import { updateCampaignState } from 'services/campaignServices'

const useUpdateCampaignStatus = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()

  const setCampaignStatus = useCallback(async (id, status) => {
    try {
      setLoading(true)
      const { data: campaign } = await updateCampaignState(id, status)
      setLoading(false)
      return Promise.resolve(campaign)
    } catch (e) {
      setLoading(false)
      notify.error('Algo salio mal, por favor intenta nuevamente')
    }
  }, [])

  return {
    loading,
    setCampaignStatus
  }
}

export default useUpdateCampaignStatus
