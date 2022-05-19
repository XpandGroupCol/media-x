
import Button from 'components/button'
import CompanyProfile from 'components/companyProfile'
import Typography from 'components/typography'
import useWompi from 'hooks/useWompi'
import { useNotification } from 'providers/notificationProvider'

import { useSession } from 'providers/sessionProvider'
import { useState } from 'react'
import { getCampaignById } from 'services/campaignServices'
import useSWR from 'swr'
import { BASE_URL } from 'utils/config'
import { getFormatedNumber, parseDate } from 'utils/transformData'

import styles from './summary.module.css'

const BASE = 0.15

const getComision = (price) => BASE * price || 0

const getAmount = (price) => (price - BASE * price || 0)

const getIva = (price) => price * 0.19

const updatedCard = (publishers = []) => {
  let plataformas = 0
  let medios = 0

  publishers.forEach(({ value, category }) => {
    if (category === 'platform') {
      plataformas += parseFloat(value || 0)
    } else {
      medios += parseFloat(value || 0)
    }
  })
  return {
    plataformas,
    medios
  }
}

const getUser = ({
  address,
  company,
  companyEmail,
  nit,
  phone,
  phonePrefixed,
  rut,
  checkRut
}) => ({
  address,
  company,
  companyEmail,
  nit,
  phone,
  phonePrefixed,
  rut,
  checkRut
})

const Summary = ({ campaign }) => {
  const { session } = useSession()
  const { wompi, disabled } = useWompi()

  const { data = {}, error } = useSWR(`${BASE_URL}/users/profile`)
  const { data: user } = data

  const [showModal, setShowModal] = useState(false)

  const { notify } = useNotification()

  const showprofileCompany = () => setShowModal(prev => !prev)

  const handlePay = () => {
    const {
      address,
      company,
      companyEmail,
      nit,
      phone,
      rut,
      checkRut
    } = getUser(user)

    if (!address || !company || !companyEmail || !nit || !phone || !rut) return setShowModal(true)

    if (!checkRut) return notify({ type: 'info', message: 'Estamos validando su informacion' })

    wompi(campaign?.id)
  }

  const { plataformas, medios } = updatedCard(campaign?.publishers)

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
              <Typography component='strong'>${getFormatedNumber(plataformas)}</Typography>
            </div>
            <div className={styles.row}>
              <Typography>Inversión en medios masivos (digital)</Typography>
              <Typography component='strong'>${getFormatedNumber(medios)}</Typography>
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
              <Typography component='strong'> ${getFormatedNumber(getComision(campaign.amount))}</Typography>
            </div>
            <div className={styles.row}>
              <Typography>IVA</Typography>
              <Typography component='strong'>${getFormatedNumber(getIva(campaign.amount))}</Typography>
            </div>
            <div className={styles.total}>
              <Typography>TOTAL</Typography>
              <Typography>${getFormatedNumber(campaign.amount)}</Typography>
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

          <Button onClick={handlePay} disabled={disabled || error}>Paga con wompi</Button>

          {user && <CompanyProfile profile={getUser(user)} open={showModal} onClose={showprofileCompany} />}

        </div>
      </div>
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
    const { data } = await getCampaignById(query.id, token)
    return { props: { campaign: data } }
  } catch (e) {
    return { props: { campaign: null } }
  }
}

export default Summary
