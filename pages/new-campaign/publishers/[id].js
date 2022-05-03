import { IconButton } from '@mui/material'
import Autocomplete from 'components/autocomplete'
import Button from 'components/button'
import Input from 'components/input'
import Typography from 'components/typography'

import styles from './publishers.module.css'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import classNames from 'classnames'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useLists from 'hooks/useLists'
import { useFieldArray, useForm } from 'react-hook-form'
import ControllerField from 'components/ControllerField'
import CurrencyInput from 'components/currencyInput'

const getRow = ({ id, label, device, formats }) => ({
  publisherId: id,
  publisher: label,
  device: device?.label,
  fotmat: [],
  share: '',
  value: '',
  objectiveGoal: '',
  formats
})

const Publishers = ({ campaign }) => {
  const [showSummary, setShowSummary] = useState(false)
  const { register, control, handleSubmit, reset, trigger, setError, setValue } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute
  })
  const { fields = [], remove, append, replace, update } = useFieldArray({
    control,
    name: 'publishers'
  })
  const router = useRouter()
  const { ages = [], devices = [], publisher = [], sex = [], locations = [] } = useLists()

  const [filterLocation, setFilterLocation] = useState(null)
  const [filterAge, setFilterAge] = useState(null)
  const [filterSex, setFilterSex] = useState(null)

  console.log({ publisher })

  const [rows, setRows] = useState([])

  const onSubmit = (values) => {
    console.log({ values })
  }

  const handleOnChangePublisher = (values) => {
    const valuesLength = values.length
    if (valuesLength === 0) {
      replace(values)
      setRows(values)
      return
    }

    if (valuesLength > fields.length) {
      append(getRow(values[valuesLength - 1]))
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

  const handleOnChangeFormat = (index) => (formats) => {
    let total = 0
    let subTotal = 0
    const devices = []

    console.log({ formats })

    formats.forEach((format) => {
      console.log('here')
      const { device, pricePerUnit, biddingModel } = format
      if (biddingModel === 'CPM') {
        subTotal += pricePerUnit
        total += pricePerUnit * 1000
      } else {
        subTotal += pricePerUnit
        total += pricePerUnit
      }

      devices.push(device)
    })

    update(index, { ...fields[index], device: devices.join('-'), value: subTotal, objectiveGoal: total, fotmat: formats })
  }

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
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={locations}
            fullWidth
            label='Lugar'
          />
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={ages}
            fullWidth
            label='Edad'
          />
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={sex}
            fullWidth
            label='Sexo'
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
                          name={`publishers.${index}.fotmat`}
                          id='format'
                          options={formats}
                          fullWidth
                          size='small'
                          label='Formatos'
                          multiple
                          element={Autocomplete}
                          onChange={handleOnChangeFormat(index)}
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
                          element={CurrencyInput}
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
          <Button size='large' variant='contained' onClick={handleSubmit(onSubmit)}>Continuar</Button>
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
            <Typography component='strong'>$6.875.477</Typography>
          </div>
          <div className={styles.summaryRow}>
            <Typography>Inversión en medios masivos (digital)</Typography>
            <Typography component='strong'>$6.875.477</Typography>
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
            <Typography component='strong'> $2.291.826</Typography>
          </div>
          <div className={classNames(styles.summaryRow, styles.mb20)}>
            <Typography>IVA</Typography>
            <Typography component='strong'>$4.789.916</Typography>
          </div>
          <div className={styles.summaryRow}>
            <Typography color='secondary'>Impresiones</Typography>
            <Typography color='secondary'>1.538.797</Typography>
          </div>
          <div className={styles.summaryRow}>
            <Typography color='secondary'>Reproducciones</Typography>
            <Typography color='secondary'>143.239</Typography>
          </div>
          <div className={classNames(styles.summaryRow, styles.mb20)}>
            <Typography color='secondary'>Clicks</Typography>
            <Typography color='secondary'>0</Typography>
          </div>

        </div>
        <div className={classNames(styles.summaryRow, styles.total)}>
          <Typography>TOTAL</Typography>
          <Typography>$30.000.000</Typography>
        </div>
      </div>
    </section>

  )
}

export default Publishers
