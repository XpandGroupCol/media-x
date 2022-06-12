
import { useState } from 'react'

import Button from 'components/button'
import Avatar from 'components/avatar'
import Typography from 'components/typography'
import OrderTable from 'components/OrderTable'
import OrderDraftButtons from 'components/orderDraftButtons'
import BackButton from 'components/backButton'
import { getCampaignById } from 'services/campaignServices'
import { handleDownload, parseDate } from 'utils/transformData'
import OrderPaidButtons from 'components/orderPaidButtons'
import { CAMPAING_STATUS } from 'utils/config'
import styles from './order.module.css'

const Order = ({ campaign, user }) => {
  const [campaignState, setCampaignState] = useState(campaign)

  return (
    <section>
      <div className={styles.summaryCards}>
        <section className={styles.newCampaignHeader}>
          <BackButton href='/campaigns' />
          <Typography fontSize='20px' fontWeight='bold'>Order de compra</Typography>
        </section>
        <div className={styles.orderHeader}>
          <div>
            <div className={styles.orderRow}>
              <Typography fontSize='16px' fontWeight='bold'>Campaña:</Typography>
              <Typography>{campaignState?.name}</Typography>
            </div>
            <div className={styles.orderRow}>
              <Typography fontSize='16px' fontWeight='bold'>Marca:</Typography>
              <Typography>{campaignState?.brand}</Typography>
            </div>
            <div className={styles.orderRow}>
              <Typography fontSize='16px' fontWeight='bold'>Fechas</Typography>
              <Typography>{parseDate(campaignState?.startDate)} - {parseDate(campaignState?.endDate)}</Typography>
            </div>
            {/* <div className={styles.orderRow}>
              <Typography fontSize='16px' fontWeight='bold'>ref:</Typography>
              <Typography>#{paid?.reference}</Typography>
            </div> */}
            <div className={styles.orderRow}>
              <Typography fontSize='16px' fontWeight='bold'>Estado:</Typography>
              <Typography>{CAMPAING_STATUS[campaignState?.status]}</Typography>
            </div>
            <div className={styles.downloadPDF}>
              <Button size='small' onClick={handleDownload(campaign)}>
                Descargar PDF
              </Button>
            </div>
          </div>
          <div className={styles.logo}>
            <Avatar
              sx={{ width: '80px', height: '80px' }}
              label={campaignState?.name}
              src={campaignState?.logo}
            />
          </div>
        </div>

      </div>
      <div className={styles.summaryCards}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Segmentación para tu campaña</Typography>
        <Typography sx={{ fontSize: '13px', marginBottom: '20px' }}>Todas nuestras tarifas, incluyendo el servicio tienen IVA incluido</Typography>
        <OrderTable
          data={campaignState?.publishers || []}
          target={campaignState?.target?.label}
          summary={campaignState?.summary || {}}
        />
        <div className={styles.actions}>
          {(campaignState?.status === 'draft' || campaignState?.status === 'cancel') &&
            <OrderDraftButtons
              campaign={campaignState}
              setCampaignState={setCampaignState}
            />}

          {campaignState?.status === 'pending' && (
            <div className={styles.paymentWithWompi}>
              <OrderPaidButtons
                user={user}
                campaign={campaignState}
                setCampaignState={setCampaignState}
              />
            </div>
          )}
        </div>

      </div>

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
        destination: `/auth/login?q=campaigns/${query.id}/order`,
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

export default Order
