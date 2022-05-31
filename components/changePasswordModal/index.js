import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import Button from 'components/button'
import ControllerField from 'components/ControllerField'
import Input from 'components/input'
import Modal from 'components/modal'
import Typography from 'components/typography'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { passwordSchema, passwordValues } from 'schemas/profile'
import styles from './changePasswordModal.module.css'
import useChangePassword from 'hooks/useChangePassword'

const ChangePasswordModal = ({ open, onClose }) => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...passwordValues },
    resolver: yupResolver(passwordSchema)
  })

  const { loading, updatePassword } = useChangePassword()

  useEffect(() => {
    if (!open) reset(passwordValues)
  }, [open])

  const onSubmit = ({ password }) => {
    updatePassword({ password })
      .then((response) => response && onClose())
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.changePasswordForm}>
        <Typography sx={{
          fontSize: '20px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textAlign: 'center'
        }}
        >Cambiar contraseña
        </Typography>
        <Divider sx={{ margin: '10px 0 20px' }} />
        <div className={styles.fields}>
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
            label='Confirmar la contraseña'
            control={control}
            element={Input}
            error={Boolean(errors?.passwordConfirmation?.message)}
            helperText={errors?.passwordConfirmation?.message}
            type='password'
          />
        </div>
        <div className={styles.buttons}>
          <Button type='button' onClick={onClose} variant='outlined' color='secondary'>Cancelar</Button>
          <Button type='submit' loading={loading}>Confimar</Button>
        </div>
      </form>
    </Modal>
  )
}

export default ChangePasswordModal
