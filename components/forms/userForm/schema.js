
import * as yup from 'yup'

export const defaultValues = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  nit: '',
  role: null
}

export const schema = yup.object({
  name: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  company: yup.string().required(),
  nit: yup.string().required(),
  role: yup.object().required().nullable()
}).required()
