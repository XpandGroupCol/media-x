import { useState } from 'react'
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

import useLists from 'hooks/useLists'
import { defaultValues, schema } from 'schemas/campaign'
import styles from './newCampaign.module.css'
import BackButton from 'components/backButton'
import { Divider } from '@mui/material'
import { campaignAtom } from 'globalState/campaignAtom'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import useGetPublishersByTarget from 'hooks/useGetPublishersByTarget'
import useNotification from 'hooks/useNotification'

const NewCampaign = () => {
  const { targets = [], sectors = [], locations = [], sex = [], ages = [] } = useLists()
  const { push } = useRouter()

  const { loading, getPublushers } = useGetPublishersByTarget()

  const [preview, setPreview] = useState(null)
  const [campaignState, updateCampaign] = useAtom(campaignAtom)

  const { formState: { errors }, handleSubmit, control, getValues, setValue } = useForm({
    defaultValues: campaignState.name ? { ...campaignState } : { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const notify = useNotification()

  const values = getValues()

  const onSubmit = (values) => {
    const { amount, target } = campaignState

    if (amount === values.amount && target?.id === values.target?.id) {
      return push('/new-campaign/publishers')
    }

    getPublushers(values.target?.id, values.amount).then(({ publishers, percentage }) => {
      if (publishers?.length) {
        updateCampaign(prevValue => ({
          ...prevValue,
          ...values,
          listOffPublishers: publishers,
          rows: [],
          selectedPublishers: [],
          percentage
        }))
        return push('/new-campaign/publishers')
      }

      notify.info('No se encontraron medios para con el objetivo y el valor ingresa, por favor prueba modificaion estos campos.')
    })
  }

  const handleChangeStartDate = (date) => {
    if (values.endDate && isBefore(values.endDate, date)) {
      setValue('endDate', null, { shouldValidate: true })
    }
    setValue('startDate', date)
  }

  const onBack = () => {
    updateCampaign({})
  }

  return (
    <form className={styles.newCampaignForm} onSubmit={handleSubmit(onSubmit)}>
      <section className={styles.newCampaignHeader}>
        <BackButton href='/campaigns' onBack={onBack} />
        <Typography fontSize='20px' fontWeight='bold'>Objetivo y Presupuesto</Typography>
      </section>

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
        helperText={errors?.amount?.message || 'Ingresa el presupuesto que esperas invertir en esta campaña'}
      />
      <div className={styles.buttons}>
        <Button loading={loading} type='submit' variant='contained' color='primary' size='large' className={styles.button}>
          Continuar
        </Button>
      </div>

    </form>
  )
}

export default NewCampaign
