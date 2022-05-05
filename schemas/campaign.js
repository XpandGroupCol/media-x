import * as yup from 'yup'

export const defaultValues = {
  brand: '',
  name: '',
  startDate: new Date(),
  endDate: null,
  locations: [],
  objective: null,
  sector: null,
  ages: [],
  sex: null,
  currency: null
}

export const schema = yup.object({
  brand: yup.string().required('Marca es requerido'),
  name: yup.string().required('Campaña es requerido'),
  startDate: yup.date().required('Fecha inicio es requerido').nullable(),
  endDate: yup.date().required('Fecha final es requerido').min(yup.ref('startDate'), 'Fecha final no puede ser menor que la fecha inicio').nullable(),
  locations: yup.array().min(1, 'Ubicaciones es requerido').required('Ubicaciones es requerido'),
  objective: yup.object().required('Obejtivo es requerido').nullable(),
  sector: yup.object().required('Obejtivo es requerido').nullable(),
  ages: yup.array().min(1, 'Rango de edades es requerido').required('Rango de edades es requerido'),
  sex: yup.object().required('Sexo es requerido').nullable(),
  currency: yup.number().required('Presupuesto es requerido').nullable()
}).required()