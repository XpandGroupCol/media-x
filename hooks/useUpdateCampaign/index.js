import useNotification from 'hooks/useNotification'
import { useCallback, useState } from 'react'
import { updateCampaign } from 'services/campaignServices'

const useUpdateCampaign = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()

  const setCamapign = useCallback(async (id, payload) => {
    try {
      setLoading(true)
      const { data: campaign } = await updateCampaign(id, payload)
      setLoading(false)
      return Promise.resolve(campaign)
    } catch (e) {
      setLoading(false)
      notify.error('Algo salio mal, por favor intenta nuevamente')
    }
  }, [])

  return {
    loading,
    setCamapign
  }
}

export default useUpdateCampaign
