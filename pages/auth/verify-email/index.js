import useVerifyEmail from 'hooks/useVerifyEmail'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const VerifyEmail = () => {
  const { query } = useRouter()

  const { loading, error, success, startSession } = useVerifyEmail()

  useEffect(() => {
    if (query?.token) startSession(query?.token)
  }, [query?.token, startSession])

  if (loading) return <p>Loading...</p>

  if (success) {
    return (
      <div>
        <h1>todo ok</h1>
        <Link href={success}>
          <a>
            Go to the app
          </a>
        </Link>
      </div>
    )
  }

  if (error) return <p>error xxxx</p>
}

export async function getStaticProps (context) {
  return {
    props: {
      protected: true
    }
  }
}

export default VerifyEmail
