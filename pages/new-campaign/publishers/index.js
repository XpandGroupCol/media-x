
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'

import PublisherForm from 'components/publisherForm'
import useNotification from 'hooks/useNotification'

import { MAX_SHARE_VALUE } from 'utils/config'

import { clearCampaign, getSummaryInformation, getTotalShare } from 'utils/transformData'
import { campaignAtom } from 'globalState/campaignAtom'
import LoadingPage from 'components/loadingPage'
import { useEffect } from 'react'
import useCreateCampaign from 'hooks/useCreateCampaign'

const Publishers = () => {
  const [campaignState, updateCampaign] = useAtom(campaignAtom)
  const { loading, createCampaign } = useCreateCampaign()

  const notify = useNotification()
  const { replace } = useRouter()

  useEffect(() => {
    if (!campaignState?.listOffPublishers?.length) replace('/new-campaign')
  }, [campaignState?.listOffPublishers])

  const onSubmit = (values) => {
    const { publishers } = values

    if (publishers.length === 0) return notify.error('Debes seleccionar almenos un medio')
    const share = getTotalShare(publishers)
    if (share < MAX_SHARE_VALUE) {
      return notify.error(`La sumatoria total del share entre todos los medios es de ${share}% y debe ser igual ${MAX_SHARE_VALUE}%`)
    }

    const payload = new window.FormData()

    Object.entries(clearCampaign(values)).forEach(([key, value]) => {
      if (key === 'ages' || key === 'locations') {
        value.forEach((v, i) => {
          payload.append(`${key}[${i}]`, v ?? '')
        })
        return
      }

      if (key === 'publishers') {
        value.forEach(({
          formatId,
          publisherId,
          objectiveGoal,
          pricePerUnit,
          biddingModel,
          device,
          label,
          publisherCategory,
          share,
          value
        }, i) => {
          payload.append(`${key}[${i}][formatId]`, formatId ?? '')
          payload.append(`${key}[${i}][publisherId]`, publisherId ?? '')
          payload.append(`${key}[${i}][objectiveGoal]`, objectiveGoal ?? '')
          payload.append(`${key}[${i}][pricePerUnit]`, pricePerUnit ?? '')
          payload.append(`${key}[${i}][biddingModel]`, biddingModel ?? '')
          payload.append(`${key}[${i}][device]`, device ?? '')
          payload.append(`${key}[${i}][label]`, label ?? '')
          payload.append(`${key}[${i}][publisherCategory]`, publisherCategory ?? '')
          payload.append(`${key}[${i}][share]`, share ?? '')
          payload.append(`${key}[${i}][value]`, value ?? '')
        })
        return
      }
      payload.append(key, value ?? '')
    })

    Object.entries(getSummaryInformation(values)).forEach(([key, value]) => {
      payload.append(`summary[${key}]`, value)
    })

    createCampaign(payload)
  }

  const onBack = ({ publishers, rows }) => {
    updateCampaign(prev => ({ ...prev, rows, publishers }))
  }

  if (!campaignState?.listOffPublishers?.length) {
    return <LoadingPage text='Cargando publishers . . .' />
  }

  return (
    <PublisherForm initValues={campaignState} onBack={onBack} onSubmit={onSubmit} href='/new-campaign' loading={loading} />
  )
}

export default Publishers
