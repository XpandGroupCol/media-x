import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import Button from 'components/button'
import ControllerField from 'components/ControllerField'
import Input from 'components/input'
import Modal from 'components/modal'
import Typography from 'components/typography'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from './changePasswordModal.module.css'
import InputFile from 'components/inputFile'
import { companySchema } from 'schemas/company'
import useUpdateCompanyProfile from 'hooks/useUpdateCompanyProfile'

const UpdateCompanyProfileModal = ({ open, onClose, initValues, showButton }) => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...initValues },
    resolver: yupResolver(companySchema)
  })

  const { loading, updateCompany } = useUpdateCompanyProfile()

  useEffect(() => {
    if (!open) reset(initValues)
  }, [open])

  const onSubmit = ({ checkRut, rut, ...restOfUser }) => {
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
    updateCompany(payload).then(response => {
      if (response) {
        onClose()
        showButton()
      }
    })
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
        >Perfil de empresa
        </Typography>
        <Typography sx={{
          textAlign: 'center',
          fontSize: '13px'
        }}
        >Es necesario que completes el siguiente formulario para poder continuar con la orden.
        </Typography>
        <Divider sx={{ margin: '10px 0 20px' }} />
        <div className={styles.fields}>
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
        </div>
        <div className={styles.buttons}>
          <Button type='button' onClick={onClose} variant='outlined' color='secondary'>Cancelar</Button>
          <Button type='submit' loading={loading}>Confimar</Button>
        </div>
      </form>
    </Modal>
  )
}

export default UpdateCompanyProfileModal
