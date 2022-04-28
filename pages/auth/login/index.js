
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
          <h3 className={styles.title}>iniciar sesión</h3>
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
        </form>
        <div className={styles.buttons}>

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
