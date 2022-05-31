import useNotification from 'hooks/useNotification'
import { useCallback, useState } from 'react'
import { getPublishersByTarget } from 'services/campaignServices'

const useGetPublishersByTarget = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()

  const getPublushers = useCallback(async (target, miniBudget) => {
    try {
      setLoading(true)
      const { data: publishers, user } = await getPublishersByTarget(target, miniBudget)
      setLoading(false)
      return Promise.resolve({ publishers, percentage: user?.percentage || 15 })
    } catch (e) {
      setLoading(false)
      notify.error('Algo salio mal, por favor intenta nuevamente')
    }
  }, [])

  return {
    loading,
    getPublushers
  }
}

export default useGetPublishersByTarget
