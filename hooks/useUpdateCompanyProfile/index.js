import useNotification from 'hooks/useNotification'
import { useCallback, useState } from 'react'
import { profileUpdateCompany } from 'services/profileServices'

const useUpdateCompanyProfile = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotification()

  const updateCompany = useCallback(async (payload) => {
    try {
      setLoading(true)

      await profileUpdateCompany(payload)
      setLoading(false)
      notify.success('Los datos se han enviado correctamente, nuestro equipo verificara la informacion y se pondra en contando para continuar con el pago de la orden.')
      return Promise.resolve(true)
    } catch (e) {
      setLoading(false)
      notify.error('Algo salio mal, por favor intenta nuevamente')
    }
  }, [])

  return {
    loading,
    updateCompany
  }
}

export default useUpdateCompanyProfile
