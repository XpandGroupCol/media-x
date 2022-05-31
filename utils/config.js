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

export const GET_PROFILE_URL = `${BASE_URL}/users/site/me`
