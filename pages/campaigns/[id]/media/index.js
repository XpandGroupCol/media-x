
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
import { compareFiles, copyValues } from 'utils/transformData'

const Media = ({ campaign }) => {
  const router = useRouter()

  const notify = useNotification()

  const { loading, setCamapign } = useUpdateCampaign()

  const { files, validator, removeFile } = useValidatorFile(copyValues(campaign?.publishers))

  const onSubmit = () => {
    const emptyFiles = files.some(({ imageUrl }) => !imageUrl)
    const publishers = files.map(({ loading, ...restOfFiles }) => ({ ...restOfFiles }))
    setCamapign(campaign?.id, { publishers }).then((campaign) => {
      if (campaign) {
        router.push(emptyFiles ? '/campaigns' : `/campaigns/${campaign?.id}/order`)
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

  const handleRemoveFile = index => () => removeFile(index)

  const disabledButton = compareFiles(campaign?.publishers, files)

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

        {files.map(({ label, _id, height, width, mimetype, imageUrl, loading = false, error = false }, index) => (

          <div key={_id} className={styles.mediaRow}>
            <div>
              <Typography fontWeight='bold'>{label}</Typography>
              <Typography>Dimensiones: {width}x{height}.{mimetype}</Typography>
            </div>
            <RowMedia
              id={_id}
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
  const token = req.cookies?.sessionid || null

  if (!query.id) {
    return {
      redirect: {
        destination: '/campaigns',
        permanent: false
      }
    }
  }

  if (!token) {
    return {
      redirect: {
        destination: `/auth/login?q=campaigns/${query.id}/media`,
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
