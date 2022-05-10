
import Button from 'components/button'
import CompleteCompanyProfile from 'components/completeCompanyProfile'
import Typography from 'components/typography'
import useWompi from 'hooks/useWompi'

import { useSession } from 'providers/sessionProvider'
import { useState } from 'react'
import { getCampaignById } from 'services/campaignServices'
import { getFormatedNumber, parseDate } from 'utils/transformData'

import styles from './summary.module.css'

const Summary = ({ campaign }) => {
  const { session } = useSession()
  const { wompi, disabled } = useWompi()

  const [showModal, setShowModal] = useState(false)

  const showprofileCompany = () => setShowModal(prev => !prev)

  const handlePay = () => {
    wompi()
  }

  return (
    <section className={styles.publishers}>
      <div className={styles.media}>
        <Typography className={styles.title} align='right'>Orden de compra #{campaign?.id}</Typography>
        <div className={styles.summary}>
          <div className={styles.firstSection}>
            <div className={styles.summaryHeader}>
              <Typography><strong>Marca:</strong> {campaign?.brand}</Typography>
              <Typography><strong>Campaña:</strong> {campaign?.name}</Typography>
              <Typography><strong>Fecha:</strong> {parseDate(campaign?.startDate)} a {parseDate(campaign?.endDate)}</Typography>
            </div>
            <div className={styles.row}>
              <Typography color='secondary'>Impresiones</Typography>
              <Typography color='secondary'>1.538.797</Typography>
            </div>
            <div className={styles.row}>
              <Typography color='secondary'>Reproducciones</Typography>
              <Typography color='secondary'>143.239</Typography>
            </div>
            <div className={styles.row}>
              <Typography color='secondary'>Clicks</Typography>
              <Typography color='secondary'>0</Typography>
            </div>
          </div>

          <div className={styles.secondSection}>
            <div className={styles.row}>
              <Typography>Inversión en plataformas digitales</Typography>
              <Typography component='strong'>$6.875.477</Typography>
            </div>
            <div className={styles.row}>
              <Typography>Inversión en medios masivos (digital)</Typography>
              <Typography component='strong'>$6.875.477</Typography>
            </div>
            <div className={styles.row}>
              <Typography>Moneda</Typography>
              <Typography component='strong'>COP</Typography>
            </div>
            <div className={styles.row}>
              <Typography>Descuentos aplicados</Typography>
              <Typography component='strong'>N/A</Typography>
            </div>
            <div className={styles.row}>
              <Typography>Comisión plataforma tecnológica</Typography>
              <Typography component='strong'> $2.291.826</Typography>
            </div>
            <div className={styles.row}>
              <Typography>IVA</Typography>
              <Typography component='strong'>$4.789.916</Typography>
            </div>
            <div className={styles.total}>
              <Typography>TOTAL</Typography>
              <Typography>$ {getFormatedNumber(campaign.amount)}</Typography>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.media}>

        <div>
          <Typography className={styles.title}>Segmentación para tu campaña</Typography>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th />
                  <th><Typography align='left'>Formatos</Typography></th>
                  <th><Typography align='center'>Dispositivos</Typography></th>
                  <th><Typography align='center'>Share</Typography></th>
                  <th><Typography align='right'>Valor</Typography></th>
                  <th><Typography align='right'>Meta objetiva</Typography></th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {campaign?.publishers?.map(({ publisherId, publisher, device, objectiveGoal, share, format, value }) => (
                  <tr key={publisherId}>
                    <td width='25%'>
                      {publisher}
                    </td>
                    <td width='30%'>
                      {format.map(({ label }) => label).join(' - ')}
                    </td>
                    <td width='15%' style={{ textAlign: 'center' }}>
                      {device}
                    </td>
                    <td width='6%' style={{ textAlign: 'center' }}>{share}</td>
                    <td width='12%' style={{ textAlign: 'right' }}>$ {getFormatedNumber(value)}</td>
                    <td width='12%' style={{ textAlign: 'right' }}>
                      {getFormatedNumber(objectiveGoal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button variant='outlined'>Ver Campañas</Button>
          {session?.checkRut || true
            ? <Button onClick={handlePay} disabled={disabled}>Paga con wompi</Button>
            : (
              <>
                <CompleteCompanyProfile open={showModal} onClose={showprofileCompany} />
                <Button onClick={showprofileCompany}>Completar el perfil de empresa</Button>
              </>)}
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps ({ req, query }) {
  const user = req.cookies?.user || null
  const token = user ? JSON.parse(user)?.token : null

  if (!query.id || !token) {
    return {
      redirect: {
        destination: '/campaigns',
        permanent: false
      }
    }
  }

  try {
    const { data } = await getCampaignById(query.id, token)
    return { props: { campaign: data } }
  } catch (e) {
    return { props: { campaign: null } }
  }
}

export default Summary
