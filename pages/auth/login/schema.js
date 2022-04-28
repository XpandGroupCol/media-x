import * as yup from 'yup'

export const defaultValues = {
  email: '',
  password: ''
}

export const schema = yup.object({
  password: yup.string().required('Contraseña es requerido').min(8, 'Contraseña debe tener minimo 8 caracteres').max(15, 'Contraseña debe tener maximo 15 caracteres'),
  email: yup.string().email('Ingrese un correo valido').required('Correo electronico es requerido')
}).required()
