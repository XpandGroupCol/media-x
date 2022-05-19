import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from 'components/input'

import ControllerField from 'components/ControllerField'
import Button from 'components/button'

import { passwordValues, passwordSchema } from 'schemas/profile'
import styles from './changePassword.module.css'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import useChangePassword from 'hooks/useChangePassword'
import { useEffect } from 'react'

const ChangePassword = ({ open, onClose, onSubmit }) => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...passwordValues },
    resolver: yupResolver(passwordSchema)
  })

  useEffect(() => {
    if (!open) reset()
  }, [open])

  const { loading, updatePassword } = useChangePassword()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const onUpdatePassword = (values) => {
    updatePassword(values).then((values) => {
      if (values) onSubmit()
    })
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle id='responsive-dialog-title' className={styles.modalTitle}>
        Cambiar Contraseña
        <div className={styles.deleteIcon}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onUpdatePassword)} className={styles.modalForm}>
          <ControllerField
            name='password'
            label='Nueva contraseña'
            type='password'
            control={control}
            element={Input}
            error={Boolean(errors?.password?.message)}
            helperText={errors?.password?.message}
          />
        </form>
      </DialogContent>
      <DialogActions className={styles.buttons}>
        <Button variant='outlined' color='secondary' onClick={onClose}>
          Cancelar
        </Button>
        <Button type='submit' loading={loading} onClick={handleSubmit(onUpdatePassword)}>
          Guardar
        </Button>
      </DialogActions>

    </Dialog>

  )
}

export default ChangePassword
