import { useCallback, useState } from 'react'
import useNotification from 'hooks/useNotification'
import { deleteCampign } from 'services/campaignServices'
import { useRouter } from 'next/router'

const useDeleteCampaign = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()
  const router = useRouter()

  const removeCampaign = useCallback(async (id) => {
    try {
      setLoading(true)
      const { data } = await deleteCampign(id)
      console.log({ data })
      setLoading(false)
      notify.success('Su campaña ha sido creada correctamente')
      // aqui deberia mutar la data
    } catch (error) {
      setLoading(false)
      notify.error('Algo salio mal por favor intente nuevamente')
    }
  }, [])

  return {
    removeCampaign,
    loading
  }
}

export default useDeleteCampaign
