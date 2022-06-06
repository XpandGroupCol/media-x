import { useRouter } from 'next/router'
import { useAtom } from 'jotai'

import CampaignForm from 'components/campaignForm'

import useGetPublishersByTarget from 'hooks/useGetPublishersByTarget'
import useNotification from 'hooks/useNotification'
import { campaignAtom } from 'globalState/campaignAtom'

const NewCampaign = () => {
  const { push } = useRouter()

  const { loading, getPublushers } = useGetPublishersByTarget()

  const [campaignState, updateCampaign] = useAtom(campaignAtom)

  const notify = useNotification()

  const onSubmit = (values) => {
    const { amount, target } = campaignState

    if (values.amount >= 10000000) {
    // aqui debo notificar a xpand
      return notify.info('Notamos que la inversion supera el monto permitido, uno de nuestros agentes se pongra en contacto con usted')
    }

    if (amount === values.amount && target?.id === values.target?.id) {
      return push('/new-campaign/publishers')
    }

    getPublushers(values.target?.id, values.amount).then(({ listOffPublishers, percentage }) => {
      if (listOffPublishers?.length) {
        updateCampaign(prevValue => ({
          ...prevValue,
          ...values,
          listOffPublishers,
          rows: [],
          publishers: [],
          userPercentage: percentage
        }))
        return push('/new-campaign/publishers')
      }

      notify.info('No se encontraron medios para con el objetivo y el valor ingresa, por favor prueba modificaion estos campos.')
    })
  }

  const onBack = () => {
    updateCampaign({})
  }

  return (
    <CampaignForm onBack={onBack} loading={loading} onSubmit={onSubmit} initValues={campaignState} />
  )
}

export default NewCampaign
