import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import isBefore from 'date-fns/isBefore'

import Input from 'components/input'
import CurrencyInput from 'components/currencyInput'
import UploadFile from 'components/uploadFile'
import Autocomplete from 'components/autocomplete'
import DatePicker from 'components/datePicker'
import Button from 'components/button'
import Typography from 'components/typography'
import ControllerField from 'components/ControllerField'

import useNewCamapaign from 'hooks/useNewCamapaign'
import useLists from 'hooks/useLists'
import { defaultValues, schema } from 'schemas/campaign'
import styles from './newCampaign.module.css'

const NewCampaign = () => {
  const { targets = [], sectors = [], locations = [], sex = [], ages = [] } = useLists()

  const [preview, setPreview] = useState(null)

  const { formState: { errors }, handleSubmit, control, getValues, setValue } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { createCampaign, loading } = useNewCamapaign()

  const values = getValues()

  const onSubmit = ({ locations, ages, sector, target, sex, currency, ...restOfValues }) => {
    const payload = {
      ...restOfValues,
      locations: locations.map(({ id }) => id),
      ages: ages.map(({ id }) => id),
      sector: sector?.id,
      target: target?.id,
      sex: sex?.id,
      amount: currency
    }

    const data = new window.FormData()
    data.append('campaign', JSON.stringify(payload))

    if (preview?.image) {
      data.append('image', preview.image)
    }

    createCampaign(data)
  }

  const handleChangeStartDate = (date) => {
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
        name='locations'
        label='Ubicaciones'
        control={control}
        element={Autocomplete}
        options={locations}
        multiple
        error={Boolean(errors?.locations?.message)}
        helperText={errors?.locations?.message}
      />

      <ControllerField
        name='target'
        label='Objetivo Publicitario'
        control={control}
        element={Autocomplete}
        options={targets}
        error={Boolean(errors?.target?.message)}
        helperText={errors?.target?.message}
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

      <div className={styles.inputDates}>
        <ControllerField
          name='ages'
          label='Rangos de edad'
          control={control}
          element={Autocomplete}
          options={ages}
          multiple
          error={Boolean(errors?.ages?.message)}
          helperText={errors?.ages?.message}
        />

        <ControllerField
          name='sex'
          label='Sexo'
          control={control}
          element={Autocomplete}
          options={sex}
          error={Boolean(errors?.sex?.message)}
          helperText={errors?.sex?.message}
        />
      </div>

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
