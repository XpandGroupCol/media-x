import axios from 'axios'
import { getAuth } from 'utils/cookie'
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`

export const newCampaign = async (campaign) => {
  try {
    const { data } = await axios(`${BASE_URL}/campaigns`, {
      method: 'POST',
      data: campaign,
      headers: {
        Authorization: `Bearer ${getAuth()}`
      }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}
