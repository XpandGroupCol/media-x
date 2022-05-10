import { useCallback, useState } from 'react'
import { useNotification } from 'providers/notificationProvider'
import { changePassword } from 'services/profileServices'
import { useRouter } from 'next/router'
import { authChangePassword } from 'services/authServices'

const useChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { notify } = useNotification()

  const updatePassword = useCallback(async (payload, isAuth = false) => {
    try {
      setLoading(true)
      const fn = isAuth ? authChangePassword : changePassword
      await fn(payload)
      setLoading(false)
      notify({ message: 'Su contraseña ha sido actualizada correctamente', type: 'success' })
      isAuth && router.replace('/auth/login')
    } catch (error) {
      console.log({ error })
      setLoading(false)
      notify({ message: 'Error mensaje', type: 'error' })
    }
  }, [])

  return {
    updatePassword,
    loading
  }
}

export default useChangePassword
