import { useCallback, useState } from 'react'
import useNotification from 'hooks/useNotification'
import { addPublishers } from 'services/campaignServices'
import { useRouter } from 'next/router'
const useAddPublishers = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const notify = useNotification()

  const savePublishers = useCallback(async (id, publishers) => {
    try {
      setLoading(true)

      const { data } = await addPublishers({ id, publishers })
      const { id: campaignId } = data

      if (!campaignId) return notify({ message: 'Error mensaje', type: 'error' })
      setLoading(false)

      router.replace(`/new-campaign/${campaignId}/summary`)
    } catch (error) {
      setLoading(false)
      notify({ message: 'Error mensaje', type: 'error' })
    }
  }, [])

  return {
    savePublishers,
    loading
  }
}

export default useAddPublishers
