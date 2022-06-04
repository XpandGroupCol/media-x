import { Avatar, Button } from '@mui/material'
import classNames from 'classnames'
import Typography from 'components/typography'
import Image from 'next/image'
import Link from 'next/link'
import { CAMPAING_STATUS } from 'utils/config'
import { parseDate } from 'utils/transformData'
import styles from './campaigns.module.css'
import noImage from 'public/images/no-photo-available.png'
import { useAtom } from 'jotai'
import { campaignAtom } from 'globalState/campaignAtom'

const CampaignCard = (campaign) => {
  const { id, logo, brand, name, status, startDate, endDate } = campaign

  const [, updateCampaign] = useAtom(campaignAtom)

  const handleSetCampaign = () => {
    updateCampaign({ ...campaign })
  }

  return (
    <div className={styles.card} key={id}>
      <header className={styles.header}>
        {logo ? <Avatar src={logo} sx={{ width: 80, height: 80 }} /> : <Image style={{ borderRadius: '100%' }} src={noImage} width={80} height={80} />}
        <Typography component='span' className={classNames(styles.status, { [styles[status]]: Boolean(styles[status]) })}>
          {CAMPAING_STATUS[status]}
        </Typography>
        <Typography className={styles.title}>{brand}</Typography>
        <Typography className={styles.subtitle}>{name}</Typography>
        <div className={styles.date}>
          <Typography>{parseDate(startDate)}</Typography>
          <Typography> - </Typography>
          <Typography>{parseDate(endDate)}</Typography>
        </div>
      </header>
      <div className={styles.body}>
        <div className={styles.row}>
          <Typography color='black'>Impresiones</Typography>
          <Typography color='black'>1.538.797</Typography>
        </div>
        <div className={styles.row}>
          <Typography color='black'>Reproducciones</Typography>
          <Typography color='black'>143.239</Typography>
        </div>
        <div className={styles.row}>
          <Typography color='black'>Clicks</Typography>
          <Typography color='black'>0</Typography>
        </div>

      </div>
      <footer className={styles.footer}>
        <Link href={`/campaigns/${id}/order`}>
          <Button component='a'>
            Ver order
          </Button>
        </Link>

        <Link href={`/campaigns/${id}/edit`}>
          <Button component='a' onClick={handleSetCampaign}>
            Editar
          </Button>
        </Link>
      </footer>
    </div>
  )
}

export default CampaignCard
