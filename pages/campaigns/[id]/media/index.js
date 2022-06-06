
import Button from 'components/button'
import Typography from 'components/typography'
import styles from './publishers.module.css'
import BackButton from 'components/backButton'

import useValidatorFile from 'hooks/useValidatorFile'

import useUpdateCampaign from 'hooks/useUpdateCampaign'
import useNotification from 'hooks/useNotification'
import RowMedia from 'components/rowMedia'
import { useRouter } from 'next/router'
import { getCampaignById, updateCampaign } from 'services/campaignServices'
const Media = ({ campaign }) => {
  const router = useRouter()

  const notify = useNotification()

  const { loading, setCamapign } = useUpdateCampaign()

  const { files, validator, removeFile } = useValidatorFile(campaign?.publishers)

  const onSubmit = () => {
    const publishers = files.map(({ loading, ...restOfFiles }) => ({ ...restOfFiles }))
    setCamapign(campaign?.id, { publishers }).then((campaign) => {
      if (campaign) {
        router.push(`/campaigns/${campaign?.id}/order`)
      }
    })
  }

  const onBack = () => {
    updateCampaign({})
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

  const disabledButton = files.some(({ imageUrl }) => !imageUrl)

  const handleRemoveFile = index => () => removeFile(index)

  return (
    <section className={styles.mediaPage}>
      <section className={styles.mediaPageHeader}>
        <BackButton href='/campaigns' onBack={onBack} />
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
    const { data: campaign } = await getCampaignById(query.id, token)
    const { user, ...restOfCampaign } = campaign
    return {
      props: {
        user,
        campaign: { ...restOfCampaign }
      }
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/campaigns',
        permanent: false
      }
    }
  }
}

export default Media
