import useNotification from 'hooks/useNotification'
import { useCallback, useState } from 'react'
import { signUp } from 'services/authServices'

const useSignUp = () => {
  const [loading, setLoading] = useState()
  const notify = useNotification()

  const register = useCallback(async (payload) => {
    try {
      setLoading(true)
      await signUp(payload)
      setLoading(false)
      notify.success('Verifique el correo electronico')
    } catch (error) {
      setLoading(false)
      notify.error(error?.response?.data?.message || 'Algo salio mal por favor intente nuevamente')
    }
  }, [])

  return {
    register,
    loading
  }
}

export default useSignUp
