
import Button from 'components/button'
import Typography from 'components/typography'
import useWompi from 'hooks/useWompi'
import useNotification from 'hooks/useNotification'

import { useState } from 'react'

import styles from './order.module.css'
import useUpdateCampaignStatus from 'hooks/useUpdateCampaignStatus'
import OrderTable from 'components/OrderTable'
import OrderDraftButtons from 'components/orderDraftButtons'
import UpdateCompanyProfileModal from 'components/updateCompanyProfileModal'
import { addPayment, getCampaignById } from 'services/campaignServices'
import { parseDate } from 'utils/transformData'
import { Avatar } from '@mui/material'
import { CAMPAING_STATUS } from 'utils/config'
import BackButton from 'components/backButton'
import Link from 'next/link'

import ConfirmCancelCampaign from 'components/confirmCancelCampaign'

const getUserInitValues = ({
  address,
  company,
  companyEmail,
  nit,
  phone,
  checkRut,
  rut
}) => ({
  address,
  company,
  companyEmail,
  nit,
  phone,
  checkRut,
  rut
})

const Order = ({ campaign, user }) => {
  const { wompi, disabled } = useWompi()

  const [campaignState, setCampaignState] = useState(campaign)
  const [leavePage, setShowLeavePage] = useState(false)

  const { loading, setCampaignStatus } = useUpdateCampaignStatus()

  const [showProfileModal, setShowProfileModal] = useState(false)

  const [cancelModal, setCancelModal] = useState(false)

  const handleCLoseModal = () => setCancelModal(false)
  const handleOpenModal = () => setCancelModal(true)

  const notify = useNotification()

  const handleClose = () =>
    setShowProfileModal(false)

  const handlePay = () => {
    const {
      address,
      company,
      companyEmail,
      nit,
      phone,
      checkRut,
      rut
    } = user

    if (address && company && companyEmail && nit && phone && rut && !checkRut) {
      return notify.info('Estamos validando la informacion de tu empresa.')
    }

    if (!checkRut) {
      return setShowProfileModal(true)
    }

    const checkout = wompi({
      amountInCents: `${campaignState.amount}00`,
      email: user?.email,
      fullName: `${user?.name} ${user?.lastName}`,
      phoneNumber: phone,
      legalId: nit,
      phoneNumberPrefix: '+57',
      redirectUrl: 'http://localhost:3000/campaigns'
    })

    checkout.open(async function ({ transaction }) {
      const { createdAt, id, paymentMethodType, status } = transaction

      if (status !== 'APPROVED') { return notify.error('Parece que algo tuvimos incovenientes al procesar tu pago, intenta nuevamente') }

      try {
        const { data } = await addPayment(campaign?.id, { date: createdAt, id, paymentMethod: paymentMethodType, status })
        setCampaignState(data)
        notify.success('El pago se realizo exitosamente')
      } catch (e) {
        notify.error('Parece que algo tuvimos incovenientes al procesar tu pago, intenta nuevamente')
      }
    })
  }

  const handleUpdateStatus = (status) => () => {
    setCampaignStatus(campaignState?.id, status).then((response) => {
      if (response) {
        setCampaignState(response)
        notify.success('Su orden ha sido creada correctamente')
      }
    })
  }

  const handleCancelOrder = (status) => () => {
    setCampaignStatus(campaignState?.id, status).then((response) => {
      if (response) {
        setCampaignState(response)
        handleCLoseModal()
        notify.success('Su orden ha sido cancelada correctamente')
      }
    })
  }

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
            <div className={styles.orderRow}>
              <Typography fontSize='16px' fontWeight='bold'>ref:</Typography>
              <Typography>#{campaignState?.id.slice(0, 6)}</Typography>
            </div>
            <div className={styles.orderRow}>
              <Typography fontSize='16px' fontWeight='bold'>Estado:</Typography>
              <Typography>{CAMPAING_STATUS[campaignState?.status]}</Typography>
            </div>
          </div>
          <div className={styles.logo}>
            <Avatar sx={{ width: '80px', height: '80px' }}>{campaignState?.name?.toUpperCase().slice(0, 2)}</Avatar>
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
            <OrderDraftButtons loading={loading} onClick={handleUpdateStatus('pending')} status={campaignState?.status} />}

          {campaignState?.status === 'pending' && (
            <div className={styles.paymentWithWompi}>
              <Link href='/campaigns'>
                <Button variant='outlined' color='primary'>
                  Salir
                </Button>
              </Link>
              <Button disabled={leavePage} onClick={handleOpenModal} variant='outlined' color='secondary'>
                Cancelar orden
              </Button>
              <Button onClick={handlePay} disabled={disabled || leavePage}>
                Pago con wompi
              </Button>
              <UpdateCompanyProfileModal showButton={() => setShowLeavePage(true)} open={showProfileModal} onClose={handleClose} initValues={getUserInitValues(user)} />
            </div>)}
        </div>

      </div>
      <ConfirmCancelCampaign open={cancelModal} onClose={handleCLoseModal} onSubmit={handleCancelOrder('cancel')} loading={loading} />
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

export default Order
