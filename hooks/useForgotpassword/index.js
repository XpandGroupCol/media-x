import { useCallback, useState } from 'react'
import useNotification from 'hooks/useNotification'
import { forgotPassword } from 'services/authServices'

const useForgotpassword = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()

  const forgot = useCallback(async (payload) => {
    try {
      setLoading(true)
      await forgotPassword(payload)
      setLoading(false)
      notify.success('Si estás registrado en shrareflow, recibirás un mensaje para restablecer la contraseña.')
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

export default useForgotpassword
