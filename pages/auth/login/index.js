
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GoogleLogin } from 'react-google-login'
import GoogleIcon from '@mui/icons-material/Google'
import AuthLayout from 'layout/authLayout'

import Button from 'components/button'
import Input from 'components/input'
import ControllerField from 'components/ControllerField'

import useSignIn from 'hooks/useSignIn'
import { loginInitValues, loginSchema } from 'schemas/auth'
import styles from '../auth.module.css'

export default function SignIn () {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...loginInitValues },
    resolver: yupResolver(loginSchema)
  })

  const { loginCrendentials, loginSocial, loading } = useSignIn()

  const responseGoogle = ({ profileObj = {} }) => {
    const { familyName: lastName, givenName: name, email, imageUrl: image } = profileObj
    loginSocial({ lastName, name, email, provider: 'google', image })
  }

  return (
    <AuthLayout onSubmit={handleSubmit(loginCrendentials)} title='Ingresa a tu cuenta'>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        render={({ onClick, disabled }) => (
          <Button
            variant='outlined' color='primary'
            onClick={onClick}
            loading={disabled}
            color='secondary'
          >
            <GoogleIcon sx={{ marginRight: '10px' }} /> Iniciar sesión con Google
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
    </AuthLayout>
  )
}

export async function getStaticProps () {
  return {
    props: {
      protected: true
    }
  }
}
