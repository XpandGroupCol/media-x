import Button from 'components/button'
import Typography from 'components/typography'
import Link from 'next/link'
import { useSession } from 'providers/sessionProvider'
import { useEffect } from 'react'
import { verifyEmail } from 'services/authServices'
import styles from './verifyEmail.module.css'
const VerifyEmail = ({ session }) => {
  const { setSession } = useSession()

  useEffect(() => {
    if (session) setSession(session)
  }, [session])

  return (
    session
      ? (
        <div className={styles.successPage}>
          <Typography sx={{
            fontSize: '18px',
            fontWeight: 'bold'
          }}
          >Bienvenido a
          </Typography>
          <Typography
            color='primary'
            sx={{
              fontSize: '40px',
              fontWeight: 'bold',
              lineHeight: 1,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}
          >Shareflow.me
          </Typography>
          <Typography sx={{
            fontSize: '14px',
            marginBottom: '30px',
            maxWidth: '300px',
            textAlign: 'center'
          }}
          >En unos minutos sera redireccionado a nuesta app o haga click en el siguiente enlace
          </Typography>
          <Link href='/campaigns'>
            <Button component='a' variant='outlined' size='small'>
              Ir a la app
            </Button>
          </Link>
        </div>)
      : (
        <div className={styles.successPage}>
          <Typography sx={{
            fontSize: '18px',
            fontWeight: 'bold'
          }}
          >Lo sentimos
          </Typography>
          <Typography
            color='error'
            sx={{
              fontSize: '30px',
              fontWeight: 'bold',
              lineHeight: 1,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}
          >Parece que algo salio mal
          </Typography>
          <Typography sx={{
            fontSize: '14px',
            marginBottom: '30px',
            maxWidth: '300px',
            textAlign: 'center'
          }}
          >Por favor conmunicate con :  <a href='mailto:support@mediax.com'>support@mediax.com</a>
          </Typography>
        </div>
        )
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
