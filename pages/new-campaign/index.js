import { useState } from 'react'
import isBefore from 'date-fns/isBefore'

import Input from 'components/input'
import styles from './newCampaign.module.css'
import CurrencyInput from 'components/currencyInput'
import Autocomplete from 'components/autocomplete'
import DatePicker from 'components/datePicker'
import Button from 'components/button'
import Typography from 'components/typography'
import Link from 'next/link'
import ControllerField from 'components/ControllerField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { defaultValues, schema } from './schema'
import useNewCamapaign from 'hooks/useNewCamapaign'
import useLists from 'hooks/useLists'
import UploadFile from 'components/uploadFile'

const setPayload = ({ sector, objective, image, currency, ...values }) => {
  return ({
    ...values,
    logo: image,
    sector: sector?.id,
    objective: objective?.id,
    amount: currency
  })
}

const NewCampaign = () => {
  const { objectives = [], sectors = [] } = useLists()
  const [preview, setPreview] = useState(null)

  const { formState: { errors }, handleSubmit, control, getValues, setValue } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { createCampaign, loading } = useNewCamapaign()

  const values = getValues()

  const onSubmit = (values) => {
    const payload = setPayload(values)
    if (preview?.image) payload.image = preview?.image
    const body = new window.FormData()

    Object.entries(payload).forEach(([key, value]) => {
      body.append(key, value)
    })
    createCampaign(body)
  }

  const handleChangeStartDate = (date) => {
    console.log(isBefore(values.endDate, date))
    if (values.endDate && isBefore(values.endDate, date)) {
      setValue('endDate', null, { shouldValidate: true })
    }
    setValue('startDate', date)
  }

  return (

    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={styles.title} align='center'>Objetivo y Presupuesto</Typography>
      <UploadFile preview={preview?.url} setPreview={setPreview} />
      <ControllerField
        name='brand'
        label='Marca'
        placeholder='Ingresa el nombre de tu marca'
        control={control}
        element={Input}
        error={Boolean(errors?.brand?.message)}
        helperText={errors?.brand?.message}
      />
      <ControllerField
        name='name'
        label='Campaña'
        placeholder='Ingresa el nombre de tu campaña'
        control={control}
        element={Input}
        error={Boolean(errors?.name?.message)}
        helperText={errors?.name?.message}
      />

      <div className={styles.inputDates}>
        <ControllerField
          name='startDate'
          label='Fecha Inicio'
          control={control}
          element={DatePicker}
          minDate={new Date()}
          error={Boolean(errors?.startDate?.message)}
          helperText={errors?.startDate?.message}
          onChange={handleChangeStartDate}
        />

        <ControllerField
          name='endDate'
          label='Fecha Final'
          control={control}
          element={DatePicker}
          minDate={values.startDate || null}
          error={Boolean(errors?.endDate?.message)}
          helperText={errors?.endDate?.message}
        />
      </div>

      <ControllerField
        name='objective'
        label='Objetivo Publicitario'
        control={control}
        element={Autocomplete}
        options={objectives}
        error={Boolean(errors?.objective?.message)}
        helperText={errors?.objectivez?.message}
      />

      <ControllerField
        name='sector'
        label='Sector Economico'
        control={control}
        element={Autocomplete}
        options={sectors}
        error={Boolean(errors?.sector?.message)}
        helperText={errors?.sector?.message}
      />

      <span className={styles.divider} />
      <Typography className={styles.amountTitle} align='left'>Presupuesto Publicitario</Typography>
      <ControllerField
        name='currency'
        label='Presupuesto'
        control={control}
        element={CurrencyInput}
        error={Boolean(errors?.currency?.message)}
        helperText={errors?.currency?.message || 'Ingresa el presupuesto que esperas invertir en esta campaña'}
      />
      <div className={styles.buttons}>
        <Link href='/campaigns'>
          <a>
            <Button variant='outlined' color='secondary' size='large' className={styles.button}>
              Cancelar
            </Button>
          </a>
        </Link>

        <Button loading={loading} type='submit' variant='contained' color='primary' size='large' className={styles.button}>
          Continuar
        </Button>
      </div>
    </form>

  )
}

export default NewCampaign
