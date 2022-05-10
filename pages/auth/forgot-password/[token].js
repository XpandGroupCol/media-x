import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AuthLayout from 'layout/authLayout'

import Button from 'components/button'
import Input from 'components/input'
import ControllerField from 'components/ControllerField'

import styles from '../auth.module.css'
import useChangePassword from 'hooks/useChangePassword'
import { verifyForgotPassword } from 'services/authServices'
import { passwordSchema, passwordValues } from 'schemas/profile'

const ForgotPassword = ({ success, token }) => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...passwordValues },
    resolver: yupResolver(passwordSchema)
  })

  const { updatePassword, loading } = useChangePassword()

  const onSubmint = ({ password }) => {
    updatePassword({ password, token }, true)
  }

  if (!success) return <p>El link ha expirado.</p>

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmint)} title='cambia tu contraseña'>
      <div className={styles.boxForm}>
        <ControllerField
          name='password'
          label='Nueva contraseña'
          control={control}
          element={Input}
          error={Boolean(errors?.password?.message)}
          helperText={errors?.password?.message}
        />
        <Button
          color='primary'
          type='submit'
          loading={loading}
        >
          Cambiar contraseña
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

export async function getServerSideProps ({ query }) {
  if (!query.token) {
    return {
      redirect: {
        destination: '/auth/forgot-password',
        permanent: false
      }
    }
  }

  let success = false

  try {
    await verifyForgotPassword(query.token)
    success = true
  } catch (e) {
    success = false
  }

  return {
    props: {
      protected: true,
      success,
      token: query.token
    }
  }
}

export default ForgotPassword
