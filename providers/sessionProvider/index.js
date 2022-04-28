import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { getSession } from 'utils/cookie'

const SessionContext = createContext()

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const router = useRouter()

  useEffect(() => {
    setUser(getSession())
  }, [])

  const setSession = useCallback((user) => {
    setUser(user)
    cookie.set('user', JSON.stringify(user))
  }, [])

  const logout = useCallback(() => {
    cookie.remove('user')
    router.reload()
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
