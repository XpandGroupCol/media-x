import { useRouter } from 'next/router'
import { useSession } from 'providers/sessionProvider'
import { useEffect } from 'react'

const useVerifySession = () => {
  const { session } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (session) router.replace('/campaigns')
  }, [session, router])

  return session !== null
}

export default useVerifySession
