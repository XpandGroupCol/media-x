import axios from 'axios'
import { BASE_URL } from 'utils/config'
import { getAuth } from 'utils/cookie'

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

export const getCampaignById = async (id, token) => {
  try {
    const { data } = await axios(`${BASE_URL}/campaigns/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const addPublishers = async ({ id, publishers }) => {
  try {
    const { data } = await axios(`${BASE_URL}/campaigns/${id}`, {
      method: 'PUT',
      data: publishers,
      headers: {
        Authorization: `Bearer ${getAuth()}`
      }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const addPayment = async (id, payment) => {
  try {
    const { data } = await axios(`${BASE_URL}/campaigns/payment/${id}`, {
      method: 'PUT',
      data: payment,
      headers: {
        Authorization: `Bearer ${getAuth()}`
      }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}
