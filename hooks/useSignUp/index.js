import { useNotification } from 'providers/notificationProvider'
import { useCallback, useState } from 'react'
import { signUp } from 'services/authServices'

const useSignUp = () => {
  const [loading, setLoading] = useState()
  const { notify } = useNotification()

  const register = useCallback(async (payload) => {
    try {
      setLoading(true)
      await signUp(payload)
      setLoading(false)
      notify({ message: 'Verifique el correo electronico', type: 'success' })
    } catch (error) {
      setLoading(false)
      notify({ message: 'Error mensaje', type: 'error' })
    }
  }, [])

  return {
    register,
    loading
  }
}

export default useSignUp
