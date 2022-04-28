import { useRouter } from 'next/router'
import { useNotification } from 'providers/notificationProvider'
import { useCallback, useState } from 'react'
import { newCampaign } from 'services/campaignServices'

const useNewCamapaign = () => {
  const [loading, setLoading] = useState()
  const { notify } = useNotification()
  const router = useRouter()

  const createCampaign = useCallback(async (payload) => {
    try {
      setLoading(true)
      const { data: id } = await newCampaign(payload)
      setLoading(false)
      router.push(`/new-campaign/publishers/${id}`)
    } catch (e) {
      setLoading(false)
      notify({ message: 'Error mensaje', type: 'error' })
    }
  }, [])

  return {
    createCampaign,
    loading
  }
}

export default useNewCamapaign
