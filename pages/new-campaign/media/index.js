
import Button from 'components/button'
import Typography from 'components/typography'
import styles from './publishers.module.css'
import { useAtom } from 'jotai'
import { campaignAtom } from 'globalState/campaignAtom'
import BackButton from 'components/backButton'

import { useState } from 'react'
import useCreateCampaign from 'hooks/useCreateCampaign'
import useValidatorFile from 'hooks/useValidatorFile'
import { IconButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'

const Publishers = () => {
  const [campaignState, updateCampaign] = useAtom(campaignAtom)

  const [files, setFiles] = useState(campaignState?.selectedPublishers || [])

  const { loading, createCampaign } = useCreateCampaign()

  const { loadings, validator, removeFile } = useValidatorFile()

  const onSubmit = () => {
    const { selectedPublishers, amount, ages, endDate, name, sector, locations, sex, startDate, target, url, brand } = campaignState

    const payload = {
      files: [],
      campaign: {
        amount,
        ages: ages.map(({ id }) => id),
        endDate,
        name,
        sector: sector?.id,
        locations: locations.map(({ id }) => id),
        sex: sex?.id,
        startDate,
        target: target?.id,
        url,
        brand,
        publishers: selectedPublishers.map(({ category, format, ...restOfData }) => ({ ...restOfData }))
      }
    }

    createCampaign(payload)
  }

  const onBack = () => {
    updateCampaign(prev => ({ ...prev, files }))
  }

  const handleValidator = (rowId) => ({ target }) => {
    const file = new window.FormData()
    file.append('image', target.files[0])

    validator({ id: rowId, rejected: false, loading: true }, file)
  }

  const renderIcon = (rowId) => {
    const el = loadings.find(({ id }) => id === rowId)

    if (!el) {
      return (
        <label htmlFor={rowId}>
          <input type='file' style={{ display: 'none' }} id={rowId} onChange={handleValidator(rowId)} />
          <IconButton component='span'>
            <CloudUploadIcon />
          </IconButton>
        </label>
      )
    }
    if (el?.rejected) {
      return (
        <IconButton onClick={removeFile}>
          <CloseIcon />
        </IconButton>
      )
    }
    return (
      <IconButton component='span'>
        <DoneIcon />
      </IconButton>
    )
  }

  return (
    <section className={styles.mediaPage}>
      <section className={styles.mediaPageHeader}>
        <BackButton href='/new-campaign/publishers' onBack={onBack} />
        <Typography fontSize='20px' fontWeight='bold'>Multimedia</Typography>
      </section>
      <Typography
        fontSize='14px'
      >Por favor adjunte los archivos necesarion para las siguientes images
      </Typography>

      <section className={styles.uploadMedia}>

        {files.map(({ label, rowId, height, width, type }) => (

          <div key={rowId} className={styles.mediaRow}>
            <div>
              <Typography fontWeight='bold'>{label}</Typography>
              <Typography>Dimensiones: {height}x{width}.{type}</Typography>
            </div>
            {renderIcon(rowId)}
          </div>
        ))}
      </section>

      <Button onClick={onSubmit} loading={loading}>
        crear campaña
      </Button>
    </section>
  )
}

export default Publishers
