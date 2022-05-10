import Link from 'next/link'
import { useSession } from 'providers/sessionProvider'
import { useEffect } from 'react'
import { verifyEmail } from 'services/authServices'

const VerifyEmail = ({ session }) => {
  const { setSession } = useSession()

  useEffect(() => {
    if (session) setSession(session)
  }, [session])

  return (
    session
      ? (
        <div>
          <h1>todo ok</h1>
          <Link href='/campaigns'>
            <a>
              Go to the app
            </a>
          </Link>
        </div>)
      : <p>error </p>
  )
}

export async function getServerSideProps ({ query }) {
  if (!query.token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  let session = null

  try {
    const { data } = await verifyEmail(query.token)
    session = data
  } catch (e) {
    session = null
  }

  return {
    props: {
      protected: true,
      session
    }
  }
}

export default VerifyEmail
