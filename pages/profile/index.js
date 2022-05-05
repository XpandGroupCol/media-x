import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar } from '@mui/material'
import ControllerField from 'components/ControllerField'
import Input from 'components/input'
import Button from 'components/button'
import Typography from 'components/typography'
import { useForm } from 'react-hook-form'
import { loginInitValues, loginSchema } from 'schemas/auth'
import useSWR from 'swr'
import styles from './profile.module.css'
const Profile = () => {
  const { data = {}, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/users/profile`)

  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...loginInitValues },
    resolver: yupResolver(loginSchema)
  })

  if (!data?.data && !error) return <p>loading</p>

  const { data: user } = data

  return (
    <section className={styles.profile}>
      <div className={styles.information}>
        {user?.image
          ? <Avatar src={user?.image} sx={{ width: 100, height: 100 }} />
          : <Avatar sx={{ width: 100, height: 100 }}>{user?.name?.slice(0, 2)?.toUpperCase()}</Avatar>}

        <Typography component='h3'>{user.fullName}</Typography>
        <Typography component='h4'>{user.email}</Typography>
        <Typography>{user.role.label}</Typography>
        <div className={styles.containerForm}>
          <form className={styles.form}>
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
            <Button variant='outlined'>
              guardar
            </Button>
          </form>
        </div>
      </div>

    </section>
  )
}

export default Profile
