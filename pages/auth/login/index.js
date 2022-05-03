
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GoogleLogin } from 'react-google-login'

import Button from 'components/button'
import Input from 'components/input'

import { defaultValues, schema } from './schema'
import styles from './login.module.css'
import useSignIn from 'hooks/useSignIn'
import ControllerField from 'components/ControllerField'
import useVerifySession from 'hooks/useVerifySession'
import LoadingPage from 'components/loadingPage'
import Typography from 'components/typography'
import Link from 'next/link'

export default function SignIn () {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { loginCrendentials, loginSocial, loading } = useSignIn()

  const isAuth = useVerifySession()

  if (isAuth) return <LoadingPage />

  const responseGoogle = ({ profileObj = {} }) => {
    const { familyName: lastName, givenName: name, email, imageUrl: image } = profileObj
    loginSocial({ lastName, name, email, provider: 'google', image })
  }

  return (
    <div className={styles.login}>
      <div className={styles.containerForm}>
        <form className={styles.form} onSubmit={handleSubmit(loginCrendentials)}>
          <div className={styles.titleContainer}>
            <h3>Media X</h3>
            <p>Bienvenido, ingresa a tu cuenta</p>
          </div>
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            render={({ onClick, disabled }) => (
              <Button
                variant='outlined' color='primary'
                onClick={onClick}
                loading={disabled}
              >
                Iniciar sesión con Google
              </Button>

            )}
            buttonText='Login'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy='single_host_origin'
          />
          <p className={styles.oSeparator}>O</p>
          <div className={styles.boxForm}>
            <ControllerField
              name='email'
              label='Correo electronico'
              control={control}
              element={Input}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
            <ControllerField
              name='password'
              label='Contraseña'
              control={control}
              element={Input}
              type='password'
              error={Boolean(errors?.password?.message)}
              helperText={errors?.password?.message}
            />
            <Button
              color='primary'
              type='submit'
              loading={loading === 'credentials'}
            >
              Iniciar sesión
            </Button>
          </div>

          <div className={styles.forgotPassword}>
            <Link href='/auth/forgot-password'>
              <a>¿Olvidaste tu contraseña?</a>
            </Link>
          </div>

          <p className={styles.register}>¿Aún no tienes cuenta?
            <Link href='/auth/register'>
              <a> Crear cuenta</a>
            </Link>
          </p>
        </form>
        <div className={styles.support}>
          <Typography>Si necesitas que te rescatemos, escribemos a </Typography>
          <a href='mailto:support@mediax.com'>support@mediax.com</a>
        </div>
      </div>
      <div className={styles.picture} />
    </div>
  )
}

export async function getStaticProps (context) {
  return {
    props: {
      protected: true
    }
  }
}
