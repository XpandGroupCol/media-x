import { IconButton, Divider } from '@mui/material'
import Autocomplete from 'components/autocomplete'
import Button from 'components/button'
import Typography from 'components/typography'
import SummaryCard from 'components/summaryCard'
import PublisherCard from 'components/publisherCard'
import styles from './publishers.module.css'

import ReceiptIcon from '@mui/icons-material/Receipt'
import { useState } from 'react'

import { useFieldArray, useForm } from 'react-hook-form'

import { useAtom } from 'jotai'
import { campaignAtom } from 'globalState/campaignAtom'
import BackButton from 'components/backButton'
import useNotification from 'hooks/useNotification'
import { useRouter } from 'next/router'
import { copyValues, getPublisherRow, getSummaryInformation, getTotalShare, getInversionValues } from 'utils/transformData'
import { yupResolver } from '@hookform/resolvers/yup'
import { publisherSchema } from 'schemas/publishers'
import { MAX_SHARE_VALUE } from 'utils/config'
import Modal from 'components/modal'

const Publishers = () => {
  const [campaignState, updateCampaign] = useAtom(campaignAtom)
  const [rows, setRows] = useState(() => campaignState?.rows ?? [])
  const [showSummary, setShowSummary] = useState(false)
  const notify = useNotification()
  const { push } = useRouter()

  const { control, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: campaignState?.selectedPublishers
      ? { publishers: [...campaignState?.selectedPublishers] }
      : { publishers: [] },
    resolver: yupResolver(publisherSchema)
  })

  const { fields = [], remove, append, replace, update } = useFieldArray({
    control,
    name: 'publishers'
  })

  const formState = getValues()

  console.log({ campaignState })

  const {
    grossValue,
    serviceFee
  } = getInversionValues(campaignState?.amount, campaignState?.percentage ?? 15)

  const onSubmit = ({ publishers }) => {
    if (publishers.length === 0) return notify.error('Debes seleccionar almenos un medio')
    const share = getTotalShare(publishers)
    if (share < MAX_SHARE_VALUE) {
      return notify.error(`La sumatoria total del share entre todos los medios es de ${share}% y debe ser igual ${MAX_SHARE_VALUE}%`)
    }

    updateCampaign(prev => ({ ...prev, rows, selectedPublishers: fields }))
    push('/new-campaign/media')
  }

  const handleOnChangePublisher = (values) => {
    const valuesLength = values.length
    if (valuesLength === 0) {
      replace(copyValues(values))
      setRows(values)
      return
    }

    if (valuesLength > fields.length) {
      append(copyValues(getPublisherRow(values[valuesLength - 1])))
    } else {
      const indexRow = fields.findIndex(({ publisherId }) => !values.some(({ id }) => id === publisherId))
      remove(indexRow)
    }
    setRows(values)
  }

  const handleDeleteRow = (index, publisherId) => () => {
    setRows(prevValue => [...prevValue.filter(({ id }) => id !== publisherId)])
    remove(index)
  }

  const handleSetShare = (index) => ({ target }) => {
    const { publishers } = formState

    const currentRow = publishers[index]
    const { share, biddingModel, pricePerUnit } = currentRow
    const currentShare = parseFloat(share)
    const totalShare = getTotalShare(publishers) - currentShare

    if (!target.value) {
      return update(index, {
        ...currentRow,
        value: 0,
        objectiveGoal: 0,
        share: ''
      })
    }

    if (currentShare < 1) {
      notify.info('El valor minimo es de 1%')
      return update(index, {
        ...currentRow,
        value: 0,
        objectiveGoal: 0,
        share: ''
      })
    }

    if (!totalShare && currentShare > MAX_SHARE_VALUE) {
      notify.info(`El valor maximo de share que puedes agregar por formato es: ${MAX_SHARE_VALUE}%`)
      return update(index, {
        ...currentRow,
        value: 0,
        objectiveGoal: 0,
        share: ''
      })
    }

    if (totalShare + currentShare > MAX_SHARE_VALUE) {
      notify.info(`El valor maximo de share que puedes agregar a este formato es: ${MAX_SHARE_VALUE - totalShare}%`)
      return update(index, {
        ...currentRow,
        value: 0,
        objectiveGoal: 0,
        share: ''
      })
    }

    const value = currentShare * grossValue / 100
    const baseValue = value / pricePerUnit
    const objectiveGoal = parseInt(biddingModel !== 'CPM' ? baseValue : baseValue * 1000, 10)

    return update(index, {
      ...currentRow,
      value,
      objectiveGoal
    })
  }

  const onBack = () =>
    updateCampaign(prev => ({ ...prev, rows, selectedPublishers: fields }))

  const cardInformation = getSummaryInformation(formState)

  return (
    <section className={styles.publishers}>
      <div className={styles.media}>
        <section className={styles.newCampaignHeader}>
          <BackButton href='/new-campaign' onBack={onBack} />
          <Typography fontSize='20px' fontWeight='bold'>Objetivo y Presupuesto</Typography>
        </section>
        <div className={styles.filters}>
          <Autocomplete
            id='combo-box-demo'
            options={campaignState?.listOffPublishers || []}
            fullWidth
            label='Medios'
            multiple
            size='smaill'
            groupBy={(option) => option.groupBy}
            value={rows}
            onChange={handleOnChangePublisher}
          />
        </div>
        <Divider sx={{ width: '100%', marginBottom: '20px' }} />
        <Typography fontSize='14px' align='center' sx={{ marginBottom: ' 24px ' }}>Segmentación inicial para la campaña</Typography>
        {!fields.length && <Typography fontSize='12px' align='center' sx={{ color: '#5b595f', margin: '30px 0' }}>Ningun medio seleccionado</Typography>}
        <form className={styles.form}>
          {
        fields.map((publisher, index) => {
          return (
            <PublisherCard
              key={publisher.rowId}
              name={`publishers.${index}.share`}
              deleteRow={handleDeleteRow(index, publisher?.rowId)}
              onBlur={handleSetShare(index)}
              control={control}
              error={Boolean(errors?.publishers && errors?.publishers[index]?.share?.message)}
              helperText={errors?.publishers && errors?.publishers[index]?.share?.message}
              {...publisher}
            />
          )
        })
      }
          <Divider sx={{ width: '100%', marginBottom: '20px' }} />
          <div className={styles.buttonContainer}>
            <Button size='large' variant='contained' onClick={handleSubmit(onSubmit)} loading={false}>Continuar</Button>
          </div>
        </form>
      </div>
      <div className={styles.summary}>
        <SummaryCard
          campaign={campaignState}
          grossValue={grossValue}
          serviceFee={serviceFee}
          {...cardInformation}
        />
      </div>
      <div className={styles.buttonInvoice}>
        <IconButton
          onClick={() => setShowSummary(true)}
          size='large' sx={{
            position: 'fixed',
            background: '#5b27ed',
            bottom: '30px',
            zIndex: 100,
            right: '30px',
            boxShadow: '0 4px 12px rgb(0 0 0 / 10%)',
            '&:hover': {
              background: '#5327d1'
            }
          }}
        >
          <ReceiptIcon fontSize='large' sx={{ color: 'white' }} />
        </IconButton>
      </div>
      <Modal
        open={showSummary}
        onClose={() => setShowSummary(false)}
      >
        <div className={styles.summaryModal}>
          <SummaryCard
            campaign={campaignState}
            grossValue={grossValue}
            serviceFee={serviceFee}
            {...cardInformation}
          />
        </div>
      </Modal>
    </section>
  )
}

export default Publishers
