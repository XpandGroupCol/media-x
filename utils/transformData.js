import { format } from 'date-fns'
import { jsPDF as JsPDF } from 'jspdf'
import { CAMPAING_STATUS } from './config'
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
  share: '',
  value: '',
  objectiveGoal: '',
  formats,
  ...restOfdata
})

export const getSummaryInformation = ({ publishers, amount, userPercentage }) => {
  const _percentage = userPercentage ? parseFloat(userPercentage / 100) : 0
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
  publisher,
  label,
  publisherCategory,
  share,
  imageUrl,
  value,
  width,
  mimetype,
  height
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
  imageUrl,
  value,
  width,
  mimetype,
  publisher,
  height
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
  userPercentage,
  logo
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
  userPercentage,
  logo
})

export const setCamapign = ({ startDate, endDate, publishers, ...rest }) => ({
  ...rest,
  endDate: new Date(endDate),
  startDate: new Date(startDate),
  publishers: publishers?.map(({ publisherId, formatId, ...rest }) => ({ rowId: `${publisherId}-${formatId}`, publisherId, formatId, ...rest }))
})

export const compareFiles = (publishers = [], files = []) => {
  const _publishers = publishers.filter((i) => Boolean(i?.imageUrl))
  const _files = files.filter((i) => Boolean(i?.imageUrl))

  return _publishers.length === _files.length
}

export const handleDownload = (campaign) => () => {
  const doc = new JsPDF('p', 'pt', 'a4')

  const { summary, publishers, target } = campaign

  const getPublishers = (publishers) => publishers.map(({ _id, label, objectiveGoal, biddingModel, pricePerUnit, share, publisher, value, summary }) => `
  <tr>
  <td>${publisher}</td>
  <td>${target?.label}</td>
  <td>${label}</td>
  <td >${share}%</td>
  <td >${getFormatedNumber(pricePerUnit)}</td>
  <td >${getFormatedNumber(objectiveGoal)}</td>
  <td >${biddingModel}</td>
  <td >${getFormatedNumber(value)}</td>
</tr>
`)

  const body = `<table>
   <thead>
     <tr>
       <th >Medio</th>
       <th >Objetivo publicitario</th>
       <th >Formato</th>
       <th >Share</th>
       <th >C/U</th>
       <th >KPI</th>
       <th>Tipo de compra</th>
       <th >Total</th>
     </tr>
   </thead>
   <tbody>
     ${getPublishers(publishers)}
     <tr>
       <td />
       <td>Valor bruto:</td>
       <td align='right'>${getFormatedNumber(summary?.grossValue)}</td>
     </tr>
     <tr>
       <td />
       <td>Inpuesto:</td>

       <td align='right'>${getFormatedNumber(summary?.serviceFee)}</td>
     </tr>
     <tr>
       <td />
       <td>Total:</td>
       <td>${getFormatedNumber(summary?.grossValue + summary?.serviceFee)}</td>
     </tr>
   </tbody>
 </table>`

  const html = `<div>
            <div>
              <p>Campaña:</p>
              <p>${campaign?.name}</p>
            </div>
            <div>
              <p>Marca:</p>
              <p>${campaign?.brand}</p>
            </div>
            <div>
              <p>Fechas</p>
              <p>${parseDate(campaign?.startDate)} - ${parseDate(campaign?.endDate)}</p>
            </div>
            <div>
              <p>Estado:</p>
              <p>${CAMPAING_STATUS[campaign?.status]}</p>
            </div>
 </div>
  ${body}`

  doc.html(html, {
    callback: function (doc) {
      doc.save('order.pdf')
    }
  })
}
