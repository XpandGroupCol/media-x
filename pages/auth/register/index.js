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
    <div className={styles.register}>
      <div className={styles.picture} />
      <div className={styles.containerForm}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmint)}>
          <h3 className={styles.title}>registro</h3>
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
            error={Boolean(errors?.password?.message)}
            helperText={errors?.password?.message}
          />
          <Button color='primary' type='submit' loading={loading}>
            registrarme
          </Button>
        </form>
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
