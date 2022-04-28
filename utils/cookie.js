import jsCookie from 'js-cookie'

export const getAuth = () => {
  const user = jsCookie.get('user')
  return user ? JSON.parse(user)?.token : null
}

export const getSession = () => {
  const user = jsCookie.get('user')
  return user ? JSON.parse(user) : null
}
