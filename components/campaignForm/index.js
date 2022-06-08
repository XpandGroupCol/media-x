import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import isBefore from 'date-fns/isBefore'

import { Avatar, Divider } from '@mui/material'
import Input from 'components/input'
import CurrencyInput from 'components/currencyInput'
import UploadFile from 'components/uploadFile'
import Autocomplete from 'components/autocomplete'
import DatePicker from 'components/datePicker'
import Button from 'components/button'
import Typography from 'components/typography'
import ControllerField from 'components/ControllerField'
import BackButton from 'components/backButton'

import useLists from 'hooks/useLists'
import { schema } from 'schemas/campaign'
import { MIN_INVESTMENT } from 'utils/config'
import styles from './campaignForm.module.css'
import { getFormatedNumber } from 'utils/transformData'

const CampaignForm = ({ onSubmit, onBack, initValues, loading }) => {
  const { targets = [], sectors = [], locations = [], sex = [], ages = [] } = useLists()

  const [preview, setPreview] = useState(initValues?.logo || null)

  const currencyRef = useRef(null)

  const { formState: { errors }, handleSubmit, control, getValues, setValue, setError, clearErrors } = useForm({
    defaultValues: { ...initValues },
    resolver: yupResolver(schema)
  })

  const values = getValues()

  const handleChangeStartDate = (date) => {
    if (values.endDate && isBefore(values.endDate, date)) {
      setValue('endDate', null, { shouldValidate: true })
    }
    setValue('startDate', date)
  }

  const handleValidateMinInvestment = ({ target }) => {
    const { value } = target

    const clearValue = parseFloat(value.replaceAll('.', '').replaceAll('-', ''))

    if (clearValue < MIN_INVESTMENT) {
      setError('amount', { type: 'min', message: `La inversion minima es de ${getFormatedNumber(MIN_INVESTMENT)} COP` })
    } else {
      clearErrors('amount')
    }
  }

  const disabledButton = Boolean(Object.keys(errors).length)

  const handleOnSumbit = (values) => {
    onSubmit({ ...values, logo: preview })
  }

  return (
    <form className={styles.newCampaignForm} onSubmit={handleSubmit(handleOnSumbit)}>
      <section className={styles.newCampaignHeader}>
        <BackButton href='/campaigns' onBack={onBack} />
        <Typography fontSize='20px' fontWeight='bold'>Objetivo y Presupuesto</Typography>
      </section>

      {!initValues?.id && <UploadFile preview={preview?.url} setPreview={setPreview} />}
      {initValues.id && initValues.logo && <Avatar src={initValues.logo} sx={{ width: 80, height: 80 }} />}
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

      <ControllerField
        name='url'
        label='Url'
        placeholder='Ingrese la url ejemplo: hhtps://www...'
        control={control}
        element={Input}
        error={Boolean(errors?.url?.message)}
        helperText={errors?.url?.message}
      />

      <Divider sx={{ width: '100%' }} />
      <Typography sx={{ width: '100%' }} fontSize='20px' fontWeight='bold' align='left'>Presupuesto Publicitario</Typography>
      <ControllerField
        name='amount'
        label='Presupuesto'
        control={control}
        element={CurrencyInput}
        error={Boolean(errors?.amount?.message)}
        helperText={errors?.amount?.message || 'Ingresa el presupuesto que esperas invertir en esta campaña la inversion minima es de $ 1.000.000 COP'}
        onBlur={handleValidateMinInvestment}
        inputRef={currencyRef}
      />
      <div className={styles.buttons}>
        <Button loading={loading} type='submit' variant='contained' color='primary' size='large' className={styles.button} disabled={disabledButton}>
          Continuar
        </Button>
      </div>

    </form>
  )
}

export default CampaignForm
