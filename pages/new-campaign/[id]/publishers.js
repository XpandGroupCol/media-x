import { IconButton } from '@mui/material'
import Autocomplete from 'components/autocomplete'
import Button from 'components/button'
import Input from 'components/input'
import Typography from 'components/typography'

import styles from './publishers.module.css'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import classNames from 'classnames'
import { useMemo, useState } from 'react'
import useLists from 'hooks/useLists'
import { useFieldArray, useForm } from 'react-hook-form'
import ControllerField from 'components/ControllerField'
import CurrencyInput from 'components/currencyInput'
import { defaultValues, publisherSchema } from 'schemas/publishers'
import { yupResolver } from '@hookform/resolvers/yup'
import useAddPublishers from 'hooks/useAddPublishers'
import { getCampaignById } from 'services/campaignServices'
import { getFormatedNumber } from 'utils/transformData'
import { useNotification } from 'providers/notificationProvider'

const getRow = ({ id, label, device, formats, category }) => ({
  publisherId: id,
  publisher: label,
  device: device?.label,
  format: [],
  share: '',
  value: '',
  objectiveGoal: '',
  formats,
  category
})

const BASE = 0.15

const getComision = (price) => BASE * price || 0

const getAmount = (price) => (price - BASE * price || 0)

const getIva = (price) => price * 0.19

const Publishers = ({ campaign }) => {
  const [showSummary, setShowSummary] = useState(false)
  const { control, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(publisherSchema)
  })

  const { fields = [], remove, append, replace, update } = useFieldArray({
    control,
    name: 'publishers'
  })

  const [state, setState] = useState({
    plataformas: 0,
    medios: 0,
    impresiones: 0,
    reproducciones: 0,
    clicks: 0
  })

  const { publisher = [] } = useLists()

  const [rows, setRows] = useState([])

  const { loading, savePublishers } = useAddPublishers()
  const { notify } = useNotification()

  const ammount = useMemo(() => getAmount(campaign?.amount), [campaign])

  const category = useMemo(() => campaign?.target?.category, [])

  const onSubmit = (values) => {
    const { publishers } = getValues()
    const totalValues = publishers.reduce((acc, { value }) => acc + parseFloat(value), 0)
    if (totalValues < ammount) return notify({ type: 'info', message: `El valor  de los medios ($${getFormatedNumber(totalValues)}) es mejor a la inversion que quieres realizar $${getFormatedNumber(ammount)}` })
    savePublishers(campaign?.id, values)
  }

  const handleOnChangePublisher = (values) => {
    const valuesLength = values.length
    if (valuesLength === 0) {
      replace(JSON.parse(JSON.stringify(values)))
      setRows(values)
      return
    }

    if (valuesLength > fields.length) {
      append(JSON.parse(JSON.stringify(getRow(values[valuesLength - 1]))))
    } else {
      const el = fields.findIndex(({ publisherId }) => !values.some(({ id }) => id === publisherId))
      remove(el)
    }
    setRows(values)
  }

  const handleDeleteRow = (index, publisherId) => () => {
    setRows(prevValue => [...prevValue.filter(({ id }) => id !== publisherId)])
    remove(index)
  }

  const handleChangeValor = (index) => () => {
    const values = getValues()
    const { publishers } = values
    const currentRow = publishers[index]

    const totalValues = publishers.reduce((acc, { value }) => acc + parseFloat(value), 0)
    const minIversion = currentRow?.format?.reduce((acc, { pricePerUnit }) => acc + parseFloat(pricePerUnit), 0)

    const lastValues = totalValues - parseFloat(currentRow.value)
    const maxValue = ammount - lastValues

    if (currentRow.value && currentRow.value < minIversion) {
      notify({ type: 'info', message: `La inversion  minima para los formatos seleccionados debe ser $${getFormatedNumber(minIversion)}` })
      update(index, { ...currentRow, value: '' })
      return
    }

    if (totalValues > ammount) {
      notify({ type: 'info', message: `El valor maximo disponible para el medio es de $${getFormatedNumber(maxValue)}` })
      update(index, { ...currentRow, value: '' })
      return
    }

    let goal = 0
    let share = 0

    const parseValue = parseFloat((parseFloat(currentRow.value) / currentRow.format.length).toFixed(2))
    currentRow?.format.forEach(({ biddingModel, pricePerUnit }) => {
      const base = (parseValue / pricePerUnit)
      share = (currentRow.value * 100) / ammount
      goal += biddingModel === 'CPM' ? base * 1000 : base
    })

    update(index, { ...currentRow, objectiveGoal: goal > 0 ? goal.toFixed(2) : 0, share: `${share.toFixed(2)}%` })

    updatedCard()
  }

  const updatedCard = () => {
    const values = getValues()
    let plataformas = 0
    let medios = 0

    values.publishers.forEach(({ value, category }) => {
      if (category === 'platform') {
        plataformas += parseFloat(value || 0)
      } else {
        medios += parseFloat(value || 0)
      }
    })

    setState(prev => ({ ...prev, plataformas, medios }))
  }

  const handleChangeFormats = (index) => () => {
    const values = getValues()
    const { publishers } = values

    const devices = []
    const currentRow = publishers[index]

    const minIversion = currentRow?.format?.reduce((acc, { pricePerUnit }) => acc + parseFloat(pricePerUnit), 0)
    const value = parseFloat(currentRow.value)

    const parseValue = parseFloat((parseFloat(currentRow.value) / currentRow.format.length).toFixed(2))

    if (value && minIversion > value) {
      notify({ type: 'info', message: `La inversion  minima para los formatos seleccionados debe ser $${getFormatedNumber(minIversion)}` })
      const format = currentRow?.format.slice(0, currentRow?.format.length - 1)
      update(index, { ...currentRow, format: [...format] })
      return
    }
    let goal = 0
    let share = 0

    currentRow?.format?.forEach(({ biddingModel, pricePerUnit, device, ...res }) => {
      if (!devices.includes(device)) devices.push(device)
      const base = (parseValue / pricePerUnit)
      share = (currentRow.value * 100) / ammount
      goal += biddingModel === 'CPM' ? base * 1000 : base
    })

    update(index, {
      ...currentRow,
      device: devices.join('-'),
      objectiveGoal: goal > 0 ? goal.toFixed(2) : 0,
      share: `${share.toFixed(2)}%`
    })

    updatedCard()
  }

  if (!campaign) return <p>error</p>

  return (
    <section className={styles.publishers}>
      <div className={styles.media}>
        <Typography className={styles.title}>{'Objetivo y Presupuesto >'} <strong>Medios y Formatos</strong></Typography>
        <div className={styles.filters}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={publisher}
            fullWidth
            label='Medios'
            multiple
            value={rows}
            onChange={handleOnChangePublisher}
          />
        </div>
        <Typography className={styles.subtitle} align='center'>Selecciona tu segmentación inicial para la campaña</Typography>
        <form className={styles.form}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th />
                  <th><Typography align='left'>Formatos</Typography></th>
                  <th><Typography align='left'>Dispositivo</Typography></th>
                  <th><Typography align='left'>Share</Typography></th>
                  <th><Typography align='left'>Valor</Typography></th>
                  <th><Typography align='left'>Meta objetiva</Typography></th>
                  <th />
                </tr>
              </thead>
              <tbody>

                {
                  fields.map(({ id, publisher, formats, device, publisherId }, index) => (
                    <tr key={id}>
                      <td width='25%'>
                        <ControllerField
                          control={control}
                          name={`publishers.${index}.publisher`}
                          id='format'
                          fullWidth
                          size='small'
                          label='Publisher'
                          element={Input}
                          readOnly
                          value={publisher}
                          inputProps={
                            { readOnly: true }
                          }
                        />
                      </td>
                      <td width='20%'>
                        <ControllerField
                          control={control}
                          name={`publishers.${index}.format`}
                          id='format'
                          options={formats}
                          fullWidth
                          size='small'
                          label='Formatos'
                          multiple
                          element={Autocomplete}
                          onBlur={handleChangeFormats(index)}
                        />
                      </td>
                      <td width='15%'>
                        <ControllerField
                          control={control}
                          name={`publishers.${index}.device`}
                          id='format'
                          fullWidth
                          size='small'
                          label='Dispositivo'
                          element={Input}
                          value={device}
                          inputProps={
                            { readOnly: true }
                          }
                        />

                      </td>

                      <td width='8%'>
                        <ControllerField
                          control={control}
                          name={`publishers.${index}.share`}
                          id='format'
                          options={formats}
                          fullWidth
                          size='small'
                          label='Share'
                          element={Input}
                          inputProps={
                            { readOnly: true }
                          }
                        />
                      </td>
                      <td width='14%'>
                        <ControllerField
                          control={control}
                          name={`publishers.${index}.value`}
                          id='format'
                          options={formats}
                          fullWidth
                          size='small'
                          label='Valor'
                          element={CurrencyInput}
                          onBlur={handleChangeValor(index)}
                        />
                      </td>
                      <td width='14%'>

                        <ControllerField
                          control={control}
                          name={`publishers.${index}.objectiveGoal`}
                          id='format'
                          options={formats}
                          fullWidth
                          size='small'
                          label='Meta objetiva'
                          element={Input}
                          inputProps={
                            { readOnly: true }
                          }
                        />
                      </td>
                      <td width='4%'>
                        <IconButton size='small' className={styles.deleteIcon} onClick={handleDeleteRow(index, publisherId)}>
                          <CloseIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className={styles.actions}>
            <Input size='small' label='url' />
            <Button variant='outlined'>Subir multimedia</Button>
          </div>
          <Button size='large' variant='contained' onClick={handleSubmit(onSubmit)} loading={loading}>Continuar</Button>
        </form>
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryHeader}>
          <Typography><strong>Marca:</strong> {campaign?.brand}</Typography>
          <Typography><strong>Campaña:</strong> {campaign?.name}</Typography>
          <Typography><strong>Fecha:</strong> 01/01/21 a 31/03/21</Typography>
          <IconButton className={styles.arrowButton} size='small' onClick={() => setShowSummary(prev => !prev)}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
        <div className={classNames(styles.content, { [styles.showContent]: showSummary })}>
          <div className={styles.summaryRow}>
            <Typography>Inversión en plataformas digitales</Typography>
            <Typography component='strong'>${getFormatedNumber(state.plataformas)}</Typography>
          </div>
          <div className={styles.summaryRow}>
            <Typography>Inversión en medios masivos (digital)</Typography>
            <Typography component='strong'>${getFormatedNumber(state.medios)}</Typography>
          </div>
          <div className={styles.summaryRow}>
            <Typography>Moneda</Typography>
            <Typography component='strong'>COP</Typography>
          </div>
          <div className={styles.summaryRow}>
            <Typography>Descuentos aplicados</Typography>
            <Typography component='strong'>N/A</Typography>
          </div>
          <div className={styles.summaryRow}>
            <Typography>Comisión plataforma tecnológica</Typography>
            <Typography component='strong'> ${getFormatedNumber(getComision(campaign.amount))}</Typography>
          </div>
          <div className={classNames(styles.summaryRow, styles.mb20)}>
            <Typography>IVA</Typography>
            <Typography component='strong'>${getFormatedNumber(getIva(campaign.amount))}</Typography>
          </div>
          <div className={styles.summaryRow}>
            <Typography color='secondary'>Impresiones</Typography>
            <Typography color='secondary'>{getFormatedNumber(state.impresiones)}</Typography>
          </div>
          <div className={styles.summaryRow}>
            <Typography color='secondary'>Reproducciones</Typography>
            <Typography color='secondary'>{getFormatedNumber(state.reproducciones)}</Typography>
          </div>
          <div className={classNames(styles.summaryRow, styles.mb20)}>
            <Typography color='secondary'>Clicks</Typography>
            <Typography color='secondary'>{getFormatedNumber(state.clicks)}</Typography>
          </div>

        </div>
        <div className={classNames(styles.summaryRow, styles.total)}>
          <Typography>TOTAL</Typography>
          <Typography>${getFormatedNumber(campaign.amount)}</Typography>
        </div>
      </div>
    </section>

  )
}

export async function getServerSideProps ({ req, query }) {
  const user = req.cookies?.user || null
  const token = user ? JSON.parse(user)?.accessToken : null

  if (!query.id || !token) {
    return {
      redirect: {
        destination: '/campaigns',
        permanent: false
      }
    }
  }

  try {
    const { data } = await getCampaignById(query.id, token)
    return { props: { campaign: data } }
  } catch (e) {
    return { props: { campaign: null } }
  }
}

export default Publishers
