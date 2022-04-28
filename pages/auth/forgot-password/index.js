
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'components/button'
import Input from 'components/input'

import { defaultValues, schema } from './schema'
import styles from './login.module.css'
import useSignIn from 'hooks/useSignIn'
import ControllerField from 'components/ControllerField'

export default function SignIn () {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { loginCrendentials, loginSocial, loading } = useSignIn()

  const handleSocialLogin = (provider) => () => loginSocial(provider)

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
          <Button
            variant='outlined' color='primary'
            onClick={handleSocialLogin('google')}
            loading={loading === 'google'}
          >
            Iniciar sesión con Google
          </Button>
          <Button
            variant='outlined'
            color='primary' onClick={handleSocialLogin('facebook')}
            loading={loading === 'facebook'}
          >
            Iniciar sesión con Facebook
          </Button>
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
