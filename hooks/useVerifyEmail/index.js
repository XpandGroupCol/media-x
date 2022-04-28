import { useCallback, useState } from 'react'
import { useSession } from 'providers/sessionProvider'
import { verifyEmail } from 'services/authServices'

const useVerifyEmail = () => {
  const { setSession } = useSession()

  const [state, setState] = useState({ error: null, loading: true, success: false })

  const startSession = useCallback(async (token) => {
    try {
      if (!token) return setState({ error: true, loading: false, success: false })
      const { data } = await verifyEmail(token)
      setSession(data)
      setState({ error: null, loading: false, success: '/campaigns' })
    } catch (error) {
      setState({ error: Boolean(error), loading: false, success: false })
    }
  }, [])

  return {
    startSession,
    ...state
  }
}

export default useVerifyEmail
