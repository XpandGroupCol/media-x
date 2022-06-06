import { useCallback, useState } from 'react'
import useNotification from 'hooks/useNotification'
import { newCampaign } from 'services/campaignServices'
import { useRouter } from 'next/router'

const useCreateCampaign = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()
  const router = useRouter()

  const createCampaign = useCallback(async (payload) => {
    try {
      setLoading(true)
      const { data } = await newCampaign(payload)
      notify.success('Su campaña ha sido creada correctamente')
      router.push(`/campaigns/${data?.id}/media`)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      notify.error('Algo salio mal por favor intente nuevamente')
    }
  }, [])

  return {
    createCampaign,
    loading
  }
}

export default useCreateCampaign
