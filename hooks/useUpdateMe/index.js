import useNotification from 'hooks/useNotification'
import { useCallback, useState } from 'react'
import { profileUpdateMe } from 'services/profileServices'

const useUpdateMe = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()

  const updateMe = useCallback(async (payload) => {
    try {
      setLoading(true)

      await profileUpdateMe(payload)
      setLoading(false)
      notify.success('El usuario a sido actualizado correctamente')
    } catch (e) {
      setLoading(false)
      notify.error('Algo salio mal, por favor intenta nuevamente')
    }
  }, [])

  return {
    loading,
    updateMe
  }
}

export default useUpdateMe
