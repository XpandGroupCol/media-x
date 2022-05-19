import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'components/button'
import ControllerField from 'components/ControllerField'
import Input from 'components/input'
import inputFile from 'components/inputFile'
import PhoneInput from 'components/phoneInput'
import Typography from 'components/typography'
import useCompanyProfile from 'hooks/useCompanyProfile'
import { useForm } from 'react-hook-form'
import { companyValues, companydSchema } from 'schemas/profile'

const CompanyForm = ({ company = companyValues }) => {
  const { formState: { errors }, handleSubmit, control, setValue } = useForm({
    defaultValues: { ...company },
    resolver: yupResolver(companydSchema)
  })

  const { loading, updateCompanyProfile } = useCompanyProfile()

  const onSubmit = (values) => {
    const body = new window.FormData()

    Object.entries(values).forEach(([key, value]) => {
      body.append(key, value ?? '')
    })

    updateCompanyProfile(body)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography component='h3'>Perfil de empresa</Typography>
      <ControllerField
        name='company'
        label='Empresa'
        control={control}
        element={Input}
        size='small'
        error={Boolean(errors?.company?.message)}
        helperText={errors?.company?.message}
      />
      <ControllerField
        name='nit'
        label='Nit'
        control={control}
        element={Input}
        size='small'
        error={Boolean(errors?.nit?.message)}
        helperText={errors?.nit?.message}
      />
      <ControllerField
        name='phone'
        label='Telefono'
        control={control}
        element={PhoneInput}
        onChange={({ phone, dialCode }) => {
          setValue('phone', phone, { shouldValidate: true })
          setValue('phonePrefixed', dialCode, { shouldValidate: true })
        }}
        error={Boolean(errors?.phone?.message)}
        helperText={errors?.phone?.message}
      />
      <ControllerField
        name='address'
        label='Direccion'
        control={control}
        element={Input}
        size='small'
        error={Boolean(errors?.address?.message)}
        helperText={errors?.address?.message}
      />
      <ControllerField
        name='companyEmail'
        label='Correo electronico empresa'
        control={control}
        element={Input}
        size='small'
        error={Boolean(errors?.companyEmail?.message)}
        helperText={errors?.companyEmail?.message}
      />
      {company?.rut
        ? <a>Ver rut</a>
        : <ControllerField
            name='rut'
            label='subir el rut'
            control={control}
            element={inputFile}
            size='small'
            error={Boolean(errors?.rut?.message)}
            helperText={errors?.rut?.message}
          />}
      <Button loading={loading} type='submit'>
        Guardar
      </Button>
    </form>
  )
}

export default CompanyForm
