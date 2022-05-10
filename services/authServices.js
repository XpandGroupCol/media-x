import axios from 'axios'
import { BASE_URL } from 'utils/config'

const OPTIONS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

export const signUp = async (user) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/signup`, {
      ...OPTIONS,
      data: user
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const signIn = async (credentials) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/login`, {
      ...OPTIONS,
      data: credentials
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const signInSocial = async (provider) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/social-login`, {
      ...OPTIONS,
      data: provider
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const verifyEmail = async (token) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/verify-email`, {
      ...OPTIONS,
      data: { token }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const forgotPassword = async (email) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/forgot-password`, {
      ...OPTIONS,
      data: email
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const verifyForgotPassword = async (token) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/verify-forgot-password`, {
      ...OPTIONS,
      data: { token }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const authChangePassword = async (password) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/change-password`, {
      ...OPTIONS,
      data: password
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}
