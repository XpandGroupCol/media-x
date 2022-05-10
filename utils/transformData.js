import { format } from 'date-fns'

export const percentageOptions = {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}

export const getCompanyValues = ({ address = '', company = '', companyEmail = '', nit = '', phone = '' }) =>
  ({ address, company, companyEmail, nit, phone })

export const getFormatedNumber = (number, locales = 'es', options = {}) =>
  Intl?.NumberFormat ? new Intl.NumberFormat(locales, options).format(number) : number

export const parseDate = (date) => date ? format(new Date(date), 'dd/MM/yyyy') : ''
