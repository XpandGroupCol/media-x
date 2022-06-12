import Link from 'next/link'
import Button from 'components/button'
import UpdateCompanyProfileModal from 'components/updateCompanyProfileModal'
import ConfirmCancelCampaign from 'components/confirmCancelCampaign'
import useWompi from 'hooks/useWompi'
import useNotification from 'hooks/useNotification'
import { useState } from 'react'
import { getCampaignById } from 'services/campaignServices'
import useUpdateCampaignStatus from 'hooks/useUpdateCampaignStatus'
import ExitPaidModal from 'components/exitPaidModal'

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
  rut: rut ? { url: rut } : rut
})

const OrderPaidButtons = ({ user, campaign, setCampaignState }) => {
  const { wompi, disabled } = useWompi()
  const notify = useNotification()

  const { loading, setCampaignStatus } = useUpdateCampaignStatus()

  const [leavePage, setShowLeavePage] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)
  const [exitPaid, setExitPaid] = useState(false)

  const hanldeCloseSetExitPaid = () => setExitPaid(false)
  const handleCLoseModal = () => setCancelModal(false)
  const handleOpenModal = () => setCancelModal(true)

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
      return notify.info('Nuestro eqipo se encuentra validando la información de su empresa, esto puede tarde un par de horas.')
    }

    if (!address || !company || !companyEmail || !nit || !phone || !rut) {
      return setShowProfileModal(true)
    }

    const checkout = wompi({
      amountInCents: `${campaign.amount}00`,
      email: user?.email,
      fullName: `${user?.name} ${user?.lastName}`,
      phoneNumber: phone,
      legalId: nit,
      phoneNumberPrefix: '+57',
      redirectUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}/campaigns/${campaign?.id}/order`,
      reference: `${campaign?.id}-${Date.now().toString()}`
    })

    checkout.open(async function ({ transaction }) {
      if (transaction.status === 'VOIDED') {
        return notify.info('Su pago esta en proceso, te notificaremos cuando se haya procesado correctamente')
      }

      if (transaction.status === 'ERROR' || transaction.status === 'DECLINED') {
        return notify.info('Tuvimos problemas al procesar el pago, por favor intenta nuevamente.')
      }

      if (transaction.status === 'APPROVED') {
        getCampaignById(campaign?.id).then(({ data }) => {
          setCampaignState(data)
          setExitPaid(true)
        }).catch(() => {
          return notify.info('Tuvimos problemas al procesar el pago, por favor intenta nuevamente.')
        })
      }
    })
  }

  const handleCancelOrder = (status) => () => {
    setCampaignStatus(campaign?.id, status).then((data) => {
      if (data) {
        setCampaignState(data)
        handleCLoseModal()
        notify.success('Su orden ha sido cancelada correctamente')
      }
    })
  }
  return (
    <>
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
      <ConfirmCancelCampaign open={cancelModal} onClose={handleCLoseModal} onSubmit={handleCancelOrder('cancel')} loading={loading} />
      <ExitPaidModal open={exitPaid} onClose={hanldeCloseSetExitPaid} />
    </>
  )
}

export default OrderPaidButtons
