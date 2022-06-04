import useNotification from 'hooks/useNotification'

import PublisherForm from 'components/publisherForm'

import useGetCampaignByID from 'hooks/useGetCampaignByID'
import { MAX_SHARE_VALUE } from 'utils/config'
import { clearCampaign, getSummaryInformation, getTotalShare } from 'utils/transformData'
import LoadingPage from 'components/loadingPage'
import useUpdateCampaign from 'hooks/useUpdateCampaign'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Publishers = () => {
  const { isLoading, campaignState, updateCampaign } = useGetCampaignByID()

  const { loading, setCamapign } = useUpdateCampaign()

  const { replace } = useRouter()

  console.log({ campaignState })

  useEffect(() => {
    if (!isLoading && !campaignState?.listOffPublishers?.length) replace(`/campaigns/${campaignState?.id}/edit`)
  }, [campaignState?.listOffPublishers, campaignState?.id, isLoading])

  const notify = useNotification()

  const onSubmit = (values) => {
    const { publishers } = values

    if (publishers.length === 0) return notify.error('Debes seleccionar almenos un medio')
    const share = getTotalShare(publishers)
    if (share < MAX_SHARE_VALUE) {
      return notify.error(`La sumatoria total del share entre todos los medios es de ${share}% y debe ser igual ${MAX_SHARE_VALUE}%`)
    }

    const { id, ...restOfValues } = values

    const payload = clearCampaign(restOfValues)

    const summary = getSummaryInformation(values)

    setCamapign(id, { ...payload, summary }).then((data) => {
      console.log({ data })
    })
  }

  const onBack = ({ publishers, rows }) => {
    updateCampaign(prev => ({ ...prev, rows, publishers }))
  }

  if (isLoading || !campaignState?.listOffPublishers?.length) return <LoadingPage text='Cargando campaña . . .' />

  const href = `/campaigns/${campaignState?.id}/edit`

  return (
    <PublisherForm initValues={campaignState} onBack={onBack} onSubmit={onSubmit} href={href} loading={loading} />
  )
}

export default Publishers
