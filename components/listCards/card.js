import Image from 'next/image'
import { Avatar } from '@mui/material'

import Typography from 'components/typography'
import noImage from 'public/images/no-photo-available.png'

import styles from './list.module.css'
import Link from 'next/link'
import classNames from 'classnames'
import { CAMPAING_STATUS } from 'utils/config'
import { parseDate } from 'utils/transformData'

const Card = ({ id, brand, name, startDate, endDate, logo = null, status, percentage }) => {
  const isDraft = status === 'draft'
  const href = isDraft ? '/new-campaign/publishers' : '/new-campaign/summary'

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
        <div className={styles.progressContainer}>
          <Typography component='span'>{percentage}%</Typography>
          <div className={styles.progress}>
            <span className={styles.progressBar} />
            <span className={styles.progressAdvance} style={{ width: `${percentage}%` }} />
          </div>
        </div>

      </div>
      <footer className={styles.footer}>
        <Link href={`${href}/${id}`}>
          <a className={styles.button}>{isDraft ? 'Completar campaña' : 'Resumen'}</a>
        </Link>
      </footer>
    </div>

  )
}

export default Card
