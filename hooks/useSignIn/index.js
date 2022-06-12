import { useRouter } from 'next/router'
import useNotification from 'hooks/useNotification'
import { useSession } from 'providers/sessionProvider'
import { useCallback, useMemo, useState } from 'react'
import { signIn, signInSocial } from 'services/authServices'

const useSignIn = () => {
  const notify = useNotification()
  const { setSession } = useSession()

  const [loading, setLoading] = useState(null)

  const { replace, query } = useRouter()

  const redirectTo = useMemo(() => query.q || '/campaigns', [query])

  const loginCrendentials = useCallback(async ({ email, password }) => {
    try {
      setLoading('credentials')
      const { data } = await signIn({ email, password })
      setSession(data)
      replace(`/${redirectTo}`)
    } catch (error) {
      notify.error(error?.response?.data?.message || 'Algo salio mal por favor intente nuevamente')
      setLoading(null)
    }
  }, [replace, redirectTo])

  const loginSocial = useCallback(async (provider) => {
    try {
      setLoading('social')
      const { data } = await signInSocial(provider)
      setSession(data)
      replace(`/${redirectTo}`)
    } catch (error) {
      notify.error(error?.response?.data?.message || 'Algo salio mal por favor intente nuevamente')
      setLoading(null)
    }
  }, [replace, redirectTo])

  const logout = useCallback(() => {

  }, [])

  return {
    loginCrendentials,
    loginSocial,
    logout,
    loading
  }
}

export default useSignIn
