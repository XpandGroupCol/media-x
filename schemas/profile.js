import * as yup from 'yup'

export const passwordValues = {
  password: '',
  passwordConfirmation: ''
}

export const passwordSchema = yup.object({
  password: yup.string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener minimo 8 caracteres')
    .max(15, 'La contraseña debe tener minimo 8 caracteres'),
  passwordConfirmation: yup.string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener minimo 8 caracteres')
    .max(15, 'La contraseña debe tener minimo 8 caracteres')

    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
}).required()

export const profileValues = {
  email: '',
  name: '',
  lastName: '',
  company: '',
  nit: '',
  phone: '',
  address: '',
  companyEmail: '',
  rut: null
}

export const profileSchema = yup.object().shape({
  name: yup.string().required(),
  company: yup.string(),
  lastName: yup.string().required(),
  nit: yup.string().when({
    is: value => value.length > 0,
    then: yup.string().min(10, 'El Nit debe tener 10 digitos').max(10, 'El Nit debe tener 10 digitos')
  }).required(),
  phone: yup.string().when({
    is: value => value.length > 0,
    then: yup.string().min(10, 'El telefono debe tener 10 digitos').max(10, 'El telefono debe tener 10 digitos')
  }).required(),
  address: yup.string().required(),
  companyEmail: yup.string().required()
}).required()
