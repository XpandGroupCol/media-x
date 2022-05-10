import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'components/button'
import ControllerField from 'components/ControllerField'
import Input from 'components/input'
import Typography from 'components/typography'
import useChangePassword from 'hooks/useChangePassword'
import { useForm } from 'react-hook-form'
import { passwordSchema, passwordValues } from 'schemas/profile'

const ChangePassword = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...passwordValues },
    resolver: yupResolver(passwordSchema)
  })

  const { loading, updatePassword } = useChangePassword()

  const onSubmit = (values) => {
    updatePassword(values)
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>Cambiar contraseña</Typography>
      <ControllerField
        name='password'
        label='Nueva contraseña'
        control={control}
        element={Input}
        type='password'
        size='small'
        error={Boolean(errors?.password?.message)}
        helperText={errors?.password?.message}
      />
      <Button type='submit' variant='outlined' loading={loading}>
        guardar
      </Button>
    </form>
  )
}

export default ChangePassword
