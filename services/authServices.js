import axios from 'axios'

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`

export const signUp = async (user) => {
  try {
    const { data } = await axios(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: { token }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}
