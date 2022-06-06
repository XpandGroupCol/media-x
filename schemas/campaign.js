import { MIN_INVESTMENT } from 'utils/config'
import { getFormatedNumber } from 'utils/transformData'
import * as yup from 'yup'

export const defaultValues = {
  logo: null,
  brand: '',
  name: '',
  startDate: new Date(),
  endDate: null,
  locations: [],
  target: null,
  sector: null,
  ages: [],
  sex: null,
  amount: null,
  url: ''
}

export const schema = yup.object({
  brand: yup.string().required('Marca es requerido'),
  name: yup.string().required('Campaña es requerido'),
  startDate: yup.date().required('Fecha inicio es requerido').nullable(),
  endDate: yup.date().required('Fecha final es requerido').min(yup.ref('startDate'), 'Fecha final no puede ser menor que la fecha inicio').nullable(),
  locations: yup.array().min(1, 'Ubicaciones es requerido').required('Ubicaciones es requerido'),
  target: yup.object().required('Obejtivo es requerido').nullable(),
  sector: yup.object().required('Obejtivo es requerido').nullable(),
  ages: yup.array().min(1, 'Rango de edades es requerido').required('Rango de edades es requerido'),
  sex: yup.object().required('Sexo es requerido').nullable(),
  amount: yup.number().integer().min(1000000, `La inversion minima es de ${getFormatedNumber(MIN_INVESTMENT)} COP`).required('Presupuesto es requerido').nullable(),
  url: yup.string().url('La url debe empezar con http:// o https://').required('La url es requerida')
}).required()
