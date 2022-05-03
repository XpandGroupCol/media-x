import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from 'components/button'
import Input from 'components/input'
import ControllerField from 'components/ControllerField'

import useSignUp from 'hooks/useSignUp'
import { defaultValues, schema } from './schema'
import styles from './register.module.css'
import useVerifySession from 'hooks/useVerifySession'
import LoadingPage from 'components/loadingPage'
import Link from 'next/link'
import { Typography } from '@mui/material'
const Register = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { register, loading } = useSignUp()

  const onSubmint = (data) => {
    register(data)
  }

  const isAuth = useVerifySession()

  if (isAuth) return <LoadingPage />

  return (
    <div className={styles.login}>
      <div className={styles.picture} />
      <div className={styles.containerForm}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmint)}>
          <div className={styles.titleContainer}>
            <h3>Media X</h3>
            <p>Bienvenido, ingresa a tu cuenta</p>
          </div>

          <div className={styles.boxForm}>
            <ControllerField
              name='name'
              label='Nombre'
              control={control}
              element={Input}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
            />
            <ControllerField
              name='lastName'
              label='Apellido'
              control={control}
              element={Input}
              error={Boolean(errors?.lastName?.message)}
              helperText={errors?.lastName?.message}
            />
            <ControllerField
              name='email'
              label='Contraseña'
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
              Crear cuenta
            </Button>
          </div>

          <p className={styles.register}>¿Ya tienes una cuenta?
            <Link href='/auth/login'>
              <a> Ingresa</a>
            </Link>
          </p>
        </form>
        <div className={styles.support}>
          <Typography>Si necesitas que te rescatemos, escribemos a </Typography>
          <a href='mailto:support@mediax.com'>support@mediax.com</a>
        </div>
      </div>

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

export default Register
