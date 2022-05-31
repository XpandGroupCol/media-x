import axios from 'axios'
import { BASE_URL } from 'utils/config'
import { getAuth } from 'utils/cookie'
import { axiosFetcher } from './axiosFetcher'

export const newCampaign = async (campaign) => {
  try {
    const { data } = await axiosFetcher('/campaigns', {
      method: 'POST',
      data: campaign
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getCampaignById = async (id, token) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/${id}`, {
      token,
      method: 'GET'
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
      data: { payment },
      headers: {
        Authorization: `Bearer ${getAuth()}`
      }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getPublishers = async (payload) => {
  try {
    const { data } = await axios(`${BASE_URL}/campaigns/getPublishers`, {
      method: 'PUT',
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuth()}`
      }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getPublishersByTarget = async (target, miniBudget) => {
  try {
    const { data } = await axiosFetcher(`/publishers/target?target=${target}&miniBudget=${miniBudget}`, {
      method: 'GET'
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const updateCampaignState = async (id, status) => {
  try {
    const { data } = await axiosFetcher(`/campaigns/status/${id}`, {
      method: 'PUT',
      data: { status }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const validatorFile = async (payload) => {
  try {
    const { data } = await axiosFetcher('/campaigns/validateFiles', {
      method: 'POST',
      data: payload
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}
