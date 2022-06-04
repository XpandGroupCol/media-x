import { useRouter } from 'next/router'

import CampaignForm from 'components/campaignForm'

import useGetPublishersByTarget from 'hooks/useGetPublishersByTarget'
import useNotification from 'hooks/useNotification'
import useGetCampaignByID from 'hooks/useGetCampaignByID'
import LoadingPage from 'components/loadingPage'

const NewCampaign = () => {
  const { push } = useRouter()

  const { isLoading, error, campaignState, updateCampaign } = useGetCampaignByID()

  const { loading, getPublushers } = useGetPublishersByTarget()

  const notify = useNotification()

  const onSubmit = (values) => {
    const { amount, target, listOffPublishers = [] } = campaignState

    console.log({ amount, target, listOffPublishers }, { values })

    if (amount === values.amount && target?.id === values.target?.id && listOffPublishers?.length > 0) {
      updateCampaign(prevValue => ({ ...prevValue, ...values }))
      return push(`/campaigns/${campaignState?.id}/publishers`)
    }

    getPublushers(values.target?.id, values.amount).then(({ listOffPublishers, percentage }) => {
      let { rows, publishers } = campaignState
      let clearPublishers = false

      if (listOffPublishers?.length) {
        if (rows === undefined) {
          rows = listOffPublishers.filter(({ id }) => publishers.some(({ rowId }) => id === rowId))
        }

        if (amount !== values.amount || target?.id !== values.target?.id) {
          clearPublishers = true
        }

        updateCampaign(prevValue => ({
          ...prevValue,
          ...values,
          listOffPublishers,
          rows: clearPublishers ? [] : prevValue.row ?? rows,
          publishers: clearPublishers ? [] : prevValue.publishers ?? [],
          percentage
        }))
        return push(`/campaigns/${campaignState?.id}/publishers`)
      }

      notify.info('No se encontraron medios para con el objetivo y el valor ingresa, por favor prueba modificaion estos campos.')
    })
  }

  const onBack = () => {
    updateCampaign({})
  }

  if (isLoading) return <LoadingPage text='Cargando campaña . . .' />

  return (
    <CampaignForm onBack={onBack} loading={loading} onSubmit={onSubmit} initValues={campaignState} />
  )
}

export default NewCampaign
