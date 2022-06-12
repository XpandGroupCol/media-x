import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { getAuth } from 'utils/cookie'

const SessionContext = createContext()

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const router = useRouter()

  const getMe = useCallback(() => {
    setUser({
      address: 'sabaneta',
      checkRut: true,
      company: 'globant',
      companyEmail: 'diego.contreras1219@gmail.com',
      email: 'diego.contreras@globant.com',
      id: '629dead7c5fcf44615892127',
      name: 'Diego Contreras',
      nit: '1234567890',
      phone: '3138637341',
      role: 'Client'
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
