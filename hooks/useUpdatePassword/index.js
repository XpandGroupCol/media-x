import { useCallback, useState } from 'react'
import useNotification from 'hooks/useNotification'
import { authChangePassword } from 'services/authServices'
import { useRouter } from 'next/router'

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()
  const { replace } = useRouter()

  const forgot = useCallback(async (payload) => {
    try {
      setLoading(true)
      await authChangePassword(payload)
      setLoading(false)
      replace('/auth/login')
      notify.success('la contraseña se ha cambiado exitosamente')
    } catch (error) {
      setLoading(false)
      notify.error('Algo salio mal por favor intente nuevamente')
    }
  }, [])

  return {
    forgot,
    loading
  }
}

export default useUpdatePassword
