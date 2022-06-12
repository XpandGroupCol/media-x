import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AuthLayout from 'layout/authLayout'

import Button from 'components/button'
import Input from 'components/input'
import ControllerField from 'components/ControllerField'

import useSignUp from 'hooks/useSignUp'
import { registerInitValues, registerSchema } from 'schemas/auth'
import styles from '../auth.module.css'

const Register = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...registerInitValues },
    resolver: yupResolver(registerSchema)
  })

  const { register, loading } = useSignUp()

  const onSubmint = (data) => {
    register(data)
  }

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmint)} title='crea tu cuenta'>
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
          label='Email'
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
    </AuthLayout>

  )
}

export async function getServerSideProps ({ req, query }) {
  const token = req.cookies?.sessionid || null

  if (token) {
    return {
      redirect: {
        destination: '/campaigns',
        permanent: false
      }
    }
  }

  return {
    props: {
      protected: true
    }
  }
}

export default Register
