import styles from './profile.module.css'

import { Avatar } from '@mui/material'
import Button from 'components/button'
import { useEffect, useState } from 'react'
import ControllerField from 'components/ControllerField'
import Input from 'components/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema, profileValues } from 'schemas/profile'
import ChangePasswordModal from 'components/changePasswordModal'
import useGetProfile from 'hooks/useGetProfile'
import useUpdateMe from 'hooks/useUpdateMe'
import { getUserInformation } from 'utils/transformData'
import InputFile from 'components/inputFile'

const Profile = () => {
  const { user, error, isLoading } = useGetProfile()
  const { updateMe, loading } = useUpdateMe()
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...profileValues },
    resolver: yupResolver(profileSchema)
  })

  useEffect(() => {
    if (user) reset(getUserInformation(user))
  }, [user])

  if (isLoading) return <p>loading...</p>

  const onSubmit = ({ avatar, rut, ...restOfUser }) => {
    const payload = new window.FormData()

    if (rut?.url) {
      payload.append('rut', rut?.url)
    } else if (rut === null) {
      payload.append('rut', '')
    } else {
      payload.append('image', rut)
    }

    Object.entries(restOfUser).forEach(([key, value]) => {
      payload.append(key, value)
    })
    updateMe(payload)
  }

  const handleOnClose = () => {
    setChangePasswordModal(false)
  }

  const handleOpen = () => {
    setChangePasswordModal(true)
  }

  if (error) return <p>Error page</p>

  return (
    <section className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar src={user?.avatar} sx={{ width: '100px', height: '100px' }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
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
          disabled
        />

        <ControllerField
          name='company'
          label='Empresa'
          control={control}
          element={Input}
          error={Boolean(errors?.company?.message)}
          helperText={errors?.company?.message}
        />
        <ControllerField
          name='companyEmail'
          label='Correo electronico empresa'
          control={control}
          element={Input}
          error={Boolean(errors?.companyEmail?.message)}
          helperText={errors?.companyEmail?.message}
        />
        <ControllerField
          name='nit'
          label='Nit'
          control={control}
          element={Input}
          type='number'
          error={Boolean(errors?.nit?.message)}
          helperText={errors?.nit?.message}
        />
        <ControllerField
          name='phone'
          label='Telefono'
          control={control}
          element={Input}
          type='number'
          error={Boolean(errors?.phone?.message)}
          helperText={errors?.phone?.message}
        />
        <ControllerField
          name='address'
          label='Direccion'
          control={control}
          element={Input}
          error={Boolean(errors?.address?.message)}
          helperText={errors?.address?.message}
        />

        <ControllerField
          name='rut'
          label='Subir rut'
          control={control}
          element={InputFile}
          error={Boolean(errors?.address?.message)}
          helperText={errors?.address?.message || 'El rut debe estar en un formato de PDF'}
        />

        <div className={styles.buttons}>
          <Button type='submit' loading={loading}>
            Actualizar perfil
          </Button>
          <Button type='button' variant='outlined' onClick={handleOpen}>
            Cambiar contraseña
          </Button>
        </div>
      </form>
      <ChangePasswordModal open={changePasswordModal} onClose={handleOnClose} />
    </section>
  )
}

export default Profile
