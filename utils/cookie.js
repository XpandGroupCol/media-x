import jsCookie from 'js-cookie'

export const getAuth = () => jsCookie.get('sessionid') || undefined
