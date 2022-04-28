import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Autocomplete from 'components/autocomplete'
import Input from 'components/input'
import Modal from 'components/modal'
import ControllerField from 'components/ControllerField'
import Button from 'components/button'

import useMutateHandler from 'hooks/useMutateHandler'

import { ROL_LISTS } from 'database/config'
import { defaultValues, schema } from './schema'
import styles from './userForm.module.css'
// TODO: Solo se puede editar -> Role, status
// TODO: Si se elimina se desactiva pero no se borra
// TODO: Luego se van a crear unas jobs que borrer ciertos registros

const userForm = ({ open, onClose, user, onSubmit }) => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: user?._id ? { ...user } : { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { loading, mutateHandler } = useMutateHandler()

  useEffect(() => {
    if (open) reset(user?._id ? user : defaultValues)
  }, [open])

  const submitForm = ({ role, _id = null, ...values }) => {
    const path = _id ? `/api/users/${_id}` : '/api/users'
    const method = _id ? 'PUT' : 'POST'
    const body = JSON.stringify({ ...values, role: role.id })

    mutateHandler({ path, method, body, onSuccess: onSubmit })
  }

  return (
    <Modal open={open} onClose={onClose} title='Nuevo usuario'>
      <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
        <ControllerField
          name='name'
          label='Nombres'
          control={control}
          element={Input}
        />
        <ControllerField
          name='lastName'
          label='Apellidos'
          control={control}
          element={Input}
        />
        <ControllerField
          name='email'
          label='Correo electronico'
          control={control}
          element={Input}
        />
        <ControllerField
          name='phone'
          label='Telefono'
          control={control}
          element={Input}
        />
        <ControllerField
          name='company'
          label='Empresa'
          control={control}
          element={Input}
        />
        <ControllerField
          name='nit'
          label='Nit'
          control={control}
          element={Input}
        />
        <ControllerField
          name='role'
          label='Rol'
          control={control}
          element={Autocomplete}
          options={ROL_LISTS}
        />
        <Button type='submit' loading={loading}>
          enviar
        </Button>
      </form>
    </Modal>
  )
}

export default userForm
