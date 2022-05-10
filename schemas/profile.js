import * as yup from 'yup'

export const passwordValues = {
  password: ''
}

export const passwordSchema = yup.object({
  password: yup.string().required('Contraseña es requerido').min(8, 'Contraseña debe tener minimo 8 caracteres').max(15, 'Contraseña debe tener maximo 15 caracteres')
}).required()

export const companyValues = {
  company: '',
  nit: '',
  phone: '',
  address: '',
  companyEmail: ''
}

export const companydSchema = yup.object({
  company: yup.string().required('Empresa es requerido'),
  nit: yup.string().required('Nit es requerido'),
  phone: yup.string().required('Telefono es requerido'),
  address: yup.string().required('Direccion es requerido'),
  companyEmail: yup.string().required('correo electronico es requerido')
}).required()
