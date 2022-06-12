import * as yup from 'yup'

export const companyValues = {
  company: '',
  nit: '',
  phone: '',
  address: '',
  companyEmail: '',
  rut: null
}

export const companySchema = yup.object().shape({
  company: yup.string().required('La compañia es requerida'),
  nit: yup.string().required('El Nit es requerido').min(10, 'El Nit debe tener 10 digitos').max(10, 'El Nit debe tener 10 digitos'),
  phone: yup.string().required('El telefono es requerido').min(10, 'El telefono debe tener 10 digitos').max(10, 'El telefono debe tener 10 digitos'),
  address: yup.string().required('La direccion es requerida'),
  companyEmail: yup.string().required('El correo de la empresa es requerido')
}).required()
