import * as yup from 'yup'

export const loginInitValues = {
  email: '',
  password: ''
}

export const loginSchema = yup.object({
  password: yup.string().required('Contraseña es requerido').min(8, 'Contraseña debe tener minimo 8 caracteres').max(15, 'Contraseña debe tener maximo 15 caracteres'),
  email: yup.string().email('Ingrese un correo valido').required('Correo electronico es requerido')
}).required()

export const registerInitValues = {
  name: '',
  lastName: '',
  email: '',
  password: ''
}

export const registerSchema = yup.object({
  name: yup.string().required('Nombre es requerido'),
  lastName: yup.string().required('Apellido es requerido'),
  password: yup.string().required('Contraseña es requerido').min(8, 'Contraseña debe tener minimo 8 caracteres').max(15, 'Contraseña debe tener maximo 15 caracteres'),
  email: yup.string().email('Ingrese un correo valido').required('Correo electronico es requerido')
}).required()

export const forgotInitValues = {
  email: ''
}

export const forgotSchema = yup.object({
  email: yup.string().email('Ingrese un correo valido').required('Correo electronico es requerido')
}).required()
