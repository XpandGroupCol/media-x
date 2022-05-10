import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AuthLayout from 'layout/authLayout'

import Button from 'components/button'
import Input from 'components/input'
import ControllerField from 'components/ControllerField'

import { forgotInitValues, forgotSchema } from 'schemas/auth'
import styles from '../auth.module.css'
import useForgotpassword from 'hooks/useForgotpassword'

const ForgotPassword = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...forgotInitValues },
    resolver: yupResolver(forgotSchema)
  })

  const { forgot, loading } = useForgotpassword()

  const onSubmint = (data) => {
    forgot(data)
  }

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmint)} title='recupera tu contraseña'>
      <div className={styles.boxForm}>
        <ControllerField
          name='email'
          label='Email'
          control={control}
          element={Input}
          error={Boolean(errors?.email?.message)}
          helperText={errors?.email?.message}
        />
        <Button
          color='primary'
          type='submit'
          loading={loading === 'credentials'}
        >
          Recuperar contraseña
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

export async function getStaticProps (context) {
  return {
    props: {
      protected: true
    }
  }
}

export default ForgotPassword
