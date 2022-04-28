import * as yup from 'yup'

export const defaultValues = {
  name: '',
  lastName: '',
  email: '',
  password: ''
}

export const schema = yup.object({
  name: yup.string().required('Nombre es requerido'),
  lastName: yup.string().required('Apellido es requerido'),
  password: yup.string().required('Contraseña es requerido').min(8, 'Contraseña debe tener minimo 8 caracteres').max(15, 'Contraseña debe tener maximo 15 caracteres'),
  email: yup.string().email('Ingrese un correo valido').required('Correo electronico es requerido')
}).required()
