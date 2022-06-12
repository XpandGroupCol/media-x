import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { getAuth } from 'utils/cookie'
import { profileGetMe } from 'services/profileServices'

const SessionContext = createContext()

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const router = useRouter()

  const getMe = useCallback(() => {
    profileGetMe().then(({ data }) => {
      setUser(data)
    }).catch(() => {
      setUser(null)
      cookie.remove('sessionid')
    })
  }, [])

  useEffect(() => {
    if (!getAuth()) return setUser(null)
    getMe()
  }, [getMe])

  const setSession = useCallback(({ accessToken, refreshToken, ...user }) => {
    setUser(user)
    cookie.set('sessionid', accessToken)
  }, [])

  const logout = useCallback(() => {
    cookie.remove('sessionid')
    router.replace('/auth/login')
    setTimeout(() => setUser(null), 1000)
  }, [])

  const session = useMemo(() => user, [user])

  return (
    <SessionContext.Provider value={{ session, setSession, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)

export default SessionProvider
