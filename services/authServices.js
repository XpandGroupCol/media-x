import { axiosFetcher } from './axiosFetcher'

export const signUp = async (user) => {
  try {
    const { data } = await axiosFetcher('/auth/signup', {
      method: 'POST',
      data: user
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const signIn = async (credentials) => {
  try {
    const { data } = await axiosFetcher('/auth/login', {
      method: 'POST',
      data: credentials
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const signInSocial = async (provider) => {
  try {
    const { data } = await axiosFetcher('/auth/social-login', {
      method: 'POST',
      data: provider
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const verifyEmail = async (token) => {
  try {
    const { data } = await axiosFetcher('/auth/verify-email', {
      method: 'POST',
      data: { token }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const forgotPassword = async (email) => {
  try {
    const { data } = await axiosFetcher('/auth/forgot-password', {
      method: 'POST',
      data: email
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const verifyForgotPassword = async (token) => {
  try {
    const { data } = await axiosFetcher('/auth/verify-forgot-password', {
      method: 'POST',
      data: { token }
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const authChangePassword = async (password) => {
  try {
    const { data } = await axiosFetcher('/auth/change-password', {
      method: 'POST',
      data: password
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}
