import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AuthLayout from 'layout/authLayout'

import Button from 'components/button'
import Input from 'components/input'
import ControllerField from 'components/ControllerField'

import styles from '../auth.module.css'
import { verifyForgotPassword } from 'services/authServices'
import { passwordSchema, passwordValues } from 'schemas/profile'
import useUpdatePassword from 'hooks/useUpdatePassword'

const ForgotPassword = ({ success, token }) => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...passwordValues },
    resolver: yupResolver(passwordSchema)
  })

  const { forgot, loading } = useUpdatePassword()

  const onSubmint = ({ password }) => {
    forgot({ password, token }, true)
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
          type='password'
        />
        <ControllerField
          name='passwordConfirmation'
          label='Confirmar contraseña'
          control={control}
          element={Input}
          error={Boolean(errors?.passwordConfirmation?.message)}
          helperText={errors?.passwordConfirmation?.message}
          type='password'
        />
        <Button
          color='primary'
          type='submit'
          loading={loading}
        >
          Guardar
        </Button>
      </div>
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
    success = true
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
