export const CAMPAING_STATUS = {
  draft: 'Borrador',
  pending: 'Pendiente',
  paid: 'Pagada',
  inProgress: 'En progreso',
  cancel: 'Cancelada',
  completed: 'Completada'
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const WOMPI_KEY = process.env.NEXT_PUBLIC_WOMPI_KEY

export const MAX_SHARE_VALUE = 100

export const CPM_VALUE = 1000

export const MIN_INVESTMENT = 1000000

export const GET_PROFILE_URL = `${BASE_URL}/users/site/me`

export const GET_CAMPAIGN_BY_ID = `${BASE_URL}/campaigns`

export const GET_CAMPAIGN_BY_USER = `${BASE_URL}/campaigns/byUser`
