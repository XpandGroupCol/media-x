import { format } from 'date-fns'

export const percentageOptions = {
  style: 'currency',
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

export const getSummaryInformation = ({ publishers, amount, percentage }) => {
  const _percentage = percentage ? parseFloat(percentage / 100) : 0
  const value = amount ? parseFloat(amount) : 0
  const serviceFee = value && _percentage ? value * _percentage : value
  const grossValue = value - serviceFee

  let medium = 0
  let platform = 0
  let prints = 0
  let reproductions = 0
  let clicks = 0

  publishers.forEach(({ biddingModel, publisherCategory, value, objectiveGoal }) => {
    const _value = parseFloat(value || 0)
    const _objetive = parseFloat(objectiveGoal || 0)

    if (publisherCategory === 'platform') {
      platform += _value
    } else {
      medium += _value
    }

    if (biddingModel === 'CPV') {
      reproductions += _objetive
    }

    if (biddingModel === 'CPM') {
      prints += _objetive
    }

    if (biddingModel === 'CPC' || biddingModel === 'CPA') { clicks += _objetive }
  })

  return {
    medium,
    platform,
    prints,
    reproductions,
    clicks,
    serviceFee,
    grossValue,
    currency: 'COP',
    discount: 0
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

export const clearPublishers = ({
  formatId,
  publisherId,
  objectiveGoal,
  pricePerUnit,
  biddingModel,
  device,
  label,
  publisherCategory,
  share,
  media,
  value
}) => ({
  formatId,
  publisherId,
  objectiveGoal,
  pricePerUnit,
  biddingModel,
  device,
  label,
  publisherCategory,
  share,
  media,
  value
})

export const clearCampaign = ({
  ages,
  locations,
  sector,
  sex,
  target,
  publishers,
  brand,
  name,
  startDate,
  endDate,
  amount,
  url,
  percentage
}) => ({
  ages: ages.map(({ id }) => id),
  locations: locations.map(({ id }) => id),
  sector: sector?.id ?? '',
  sex: sex?.id ?? '',
  target: target?.id ?? '',
  publishers: publishers.map(clearPublishers),
  brand,
  name,
  startDate,
  endDate,
  amount,
  url,
  percentage
})
