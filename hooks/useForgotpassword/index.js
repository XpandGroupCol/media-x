import { useCallback, useState } from 'react'
import { useNotification } from 'providers/notificationProvider'
import { forgotPassword } from 'services/authServices'

const useForgotpassword = () => {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()

  const forgot = useCallback(async (payload) => {
    try {
      setLoading(true)
      await forgotPassword(payload)
      setLoading(false)
      notify({ message: 'Si estás registrado en media x, recibirás un mensaje para restablecer la contraseña.', type: 'success' })
    } catch (error) {
      setLoading(false)
      notify({ message: 'Error mensaje', type: 'error' })
    }
  }, [])

  return {
    forgot,
    loading
  }
}

export default useForgotpassword
