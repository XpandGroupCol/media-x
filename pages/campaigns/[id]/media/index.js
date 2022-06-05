
import Button from 'components/button'
import Typography from 'components/typography'
import styles from './publishers.module.css'
import BackButton from 'components/backButton'

import { useEffect } from 'react'
import useValidatorFile from 'hooks/useValidatorFile'

import useGetCampaignByID from 'hooks/useGetCampaignByID'
import LoadingPage from 'components/loadingPage'
import useUpdateCampaign from 'hooks/useUpdateCampaign'
import useNotification from 'hooks/useNotification'
import RowMedia from 'components/rowMedia'
const Publishers = () => {
  const { isLoading, error, campaignState, updateCampaign } = useGetCampaignByID()

  const notify = useNotification()

  const { loading, setCamapign } = useUpdateCampaign()

  const { files, setFiles, validator, removeFile } = useValidatorFile()

  useEffect(() => {
    if (campaignState?.id) {
      setFiles(campaignState?.publishers)
    }
  }, [campaignState?.id])

  const onSubmit = () => {
    const publishers = files.map(({ loading, ...restOfFiles }) => ({ ...restOfFiles }))
    setCamapign(campaignState?.id, { publishers })
  }

  const onBack = () => {
    updateCampaign(prev => ({ ...prev, files }))
  }

  const handleValidator = (index, { height, width, mimetype, label }) => ({ target }) => {
    const file = target.files[0]
    const media = new window.FormData()

    if (!file.type.includes('image')) {
      return notify.error(`El formato del archivo no es valido, el archivo debe ser ${mimetype}`)
    }

    media.append(label, file)
    media.append('width', width)
    media.append('height', height)
    validator(index, media)
  }

  if (isLoading) return <LoadingPage text='Cargando archivos . . .' />

  const disabledButton = files.some(({ imageUrl }) => !imageUrl)

  const handleRemoveFile = index => () => removeFile(index)

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

        {files.map(({ label, rowId, height, width, mimetype, imageUrl, loading = false, error = false }, index) => (

          <div key={rowId} className={styles.mediaRow}>
            <div>
              <Typography fontWeight='bold'>{label}</Typography>
              <Typography>Dimensiones: {width}x{height}.{mimetype}</Typography>
            </div>
            <RowMedia
              id={rowId}
              isLoading={loading}
              url={imageUrl}
              upload={handleValidator(index, { height, width, mimetype, label })}
              remove={handleRemoveFile(index)}
              error={error}
            />
          </div>
        ))}
      </section>

      <Button onClick={onSubmit} loading={loading} disabled={disabledButton}>
        Agregar archivos
      </Button>
    </section>
  )
}

export default Publishers
