import Link from 'next/link'
import { useAtom } from 'jotai'
import { mutate } from 'swr'
import classNames from 'classnames'
import { Button } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import Typography from 'components/typography'
import Avatar from 'components/avatar'
import Menu from './menu'
import { CAMPAING_STATUS, GET_CAMPAIGN_BY_USER } from 'utils/config'
import { getFormatedNumber, parseDate, setCamapign } from 'utils/transformData'
import { campaignAtom } from 'globalState/campaignAtom'

import styles from './campaigns.module.css'
import useDeleteCampaign from 'hooks/useDeleteCampaign'

const CampaignCard = (campaign) => {
  const { id, logo, brand, name, status, startDate, endDate, summary, publishers } = campaign

  const [, updateCampaign] = useAtom(campaignAtom)

  const { removeCampaign } = useDeleteCampaign()

  const handleSetCampaign = (onClose) => () => {
    updateCampaign({ ...setCamapign(campaign) })
    onClose()
  }

  const handleDeleteCampaign = () => {
    removeCampaign(id).then((id) => {
      if (id) {
        mutate(GET_CAMPAIGN_BY_USER)
      }
    })
  }

  const emptyFiles = publishers.some(({ imageUrl }) => !imageUrl)

  return (
    <div className={styles.card} key={id}>
      <header className={styles.header}>
        <Avatar src={logo} label={brand} sx={{ width: 80, height: 80 }} />
        {['draft', 'pending', 'cancel'].includes(status) && (
          <div className={styles.menu}>
            <Menu>
              {
              (({ onClose }) => (
                <div>
                  <Link href={`/campaigns/${id}/edit`}>
                    <MenuItem
                      component='a'
                      onClick={handleSetCampaign(onClose)}
                    >
                      <EditIcon fontSize='small' sx={{ marginRight: '10px' }} /> Editar
                    </MenuItem>
                  </Link>

                  <MenuItem onClick={handleDeleteCampaign}><DeleteIcon fontSize='small' sx={{ marginRight: '10px' }} />   Eliminar
                  </MenuItem>
                </div>
              ))
            }
            </Menu>
          </div>)}
        <Typography className={styles.title}>{brand}</Typography>
        <Typography className={styles.subtitle}>{name}</Typography>
        <div className={styles.date}>
          <Typography>{parseDate(startDate)}</Typography>
          <Typography> - </Typography>
          <Typography>{parseDate(endDate)}</Typography>
        </div>
        <Typography component='span' className={classNames(styles.status, { [styles[status]]: Boolean(styles[status]) })}>
          {CAMPAING_STATUS[status]}
        </Typography>

      </header>
      <div className={styles.body}>
        <div className={styles.row}>
          <Typography color='black'>Impresiones</Typography>
          <Typography color='black'>{getFormatedNumber(summary?.prints)}</Typography>
        </div>
        <div className={styles.row}>
          <Typography color='black'>Reproducciones</Typography>
          <Typography color='black'>{getFormatedNumber(summary?.reproductions)}</Typography>
        </div>
        <div className={styles.row}>
          <Typography color='black'>Clicks</Typography>
          <Typography color='black'>{getFormatedNumber(summary?.clicks)}</Typography>
        </div>

      </div>
      <footer className={styles.footer}>
        {emptyFiles
          ? (
            <Link href={`/campaigns/${id}/media`}>
              <Button component='a' color='secondary'>
                Agregar multimedia
              </Button>
            </Link>)
          : ['draft', 'pending', 'cancel', 'paid'].includes(status) && (
            <Link href={`/campaigns/${id}/order`}>
              <Button component='a'>
                Ver order
              </Button>
            </Link>
            )}

      </footer>
    </div>
  )
}

export default CampaignCard
