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

export const getPublisherRow = ({ id, publisherId, label, device, formats, target, groupBy, ...restOfdata }) => ({
  publisherId,
  publisher: groupBy,
  rowId: id,
  label,
  device,
  format: [],
  share: '',
  value: '',
  objectiveGoal: '',
  formats,
  category: target?.category || [],
  ...restOfdata
})

export const getSummaryInformation = ({ publishers }) => {
  let medio = 0
  let plataforma = 0
  let impresiones = 0
  let reproducciones = 0
  let clicks = 0

  publishers.forEach(({ category, publisherCategory, value, objectiveGoal }) => {
    const _value = parseFloat(value || 0)
    const _objetive = parseFloat(objectiveGoal || 0)

    if (publisherCategory === 'platform') {
      plataforma += _value
    } else {
      medio += _value
    }

    if (category.includes('reproductions')) {
      reproducciones += _objetive
    }

    if (category.includes('prints')) {
      impresiones += _objetive
    }

    if (category.includes('clicks')) { clicks += _objetive }
  })

  return {
    medio,
    plataforma,
    impresiones,
    reproducciones,
    clicks
  }
}

export const copyValues = (values) => JSON.parse(JSON.stringify(values))

export const getTotalShare = (publishers) => publishers.reduce((acc, current) => acc + parseFloat(current.share), 0)

export const getInversionValues = (value, percentage) => {
  const _percentage = percentage ? parseFloat(percentage / 100) : 0
  const _value = value ? parseFloat(value) : 0
  const serviceFee = value && _percentage ? value * _percentage : value
  const grossValue = _value - serviceFee
  return {
    grossValue,
    serviceFee
  }
}

export const getUserInformation = ({
  email,
  name,
  lastName,
  company,
  nit,
  phone,
  address,
  companyEmail,
  rut,
  avatar
}) => ({
  email,
  name,
  lastName,
  company,
  nit,
  phone,
  address,
  companyEmail,
  rut: rut ? { url: rut } : rut,
  avatar
})
