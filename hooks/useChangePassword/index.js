import { useCallback, useState } from 'react'
import useNotification from 'hooks/useNotification'
import { profileUpdatePassword } from 'services/profileServices'

const useChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()

  const updatePassword = useCallback(async (payload) => {
    try {
      setLoading(true)
      await profileUpdatePassword(payload)
      setLoading(false)
      notify.success('Contraseña cambiada exitosamente')
      return Promise.resolve(true)
    } catch (error) {
      setLoading(false)
      notify.error('Algo salio mal por favor intente nuevamente')
    }
  }, [])

  return {
    updatePassword,
    loading
  }
}

export default useChangePassword
