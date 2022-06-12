import { axiosFetcher } from './axiosFetcher'

export const profileGetMe = async () => {
  try {
    const { data } = await axiosFetcher('/users/site/me', {
      method: 'GET'
    })
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}

export const profileUpdatePassword = async (data) => {
  try {
    const response = await axiosFetcher('/users/site/update-password', {
      data,
      method: 'PUT'
    })
    return response
  } catch (e) {
    return Promise.reject(e)
  }
}

export const profileUpdateAvater = async (data) => {
  try {
    const response = await axiosFetcher.put('/users/site/update-avatar', {
      data,
      method: 'PUT'
    })
    return response
  } catch (e) {
    return Promise.reject(e)
  }
}

export const profileUpdateCompany = async (data) => {
  try {
    const response = await axiosFetcher('/users/site/update-company', {
      data,
      method: 'PUT'
    })
    return response
  } catch (e) {
    return Promise.reject(e)
  }
}

export const profileUpdateMe = async (data) => {
  try {
    const response = await axiosFetcher('/users/site/update-profile', {
      data,
      method: 'PUT'
    })
    return response
  } catch (e) {
    return Promise.reject(e)
  }
}
