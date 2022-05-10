import { useCallback, useState } from 'react'
import { useNotification } from 'providers/notificationProvider'
import { companyProfile } from 'services/profileServices'

const useCompanyProfile = () => {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()

  const updateCompanyProfile = useCallback(async (payload) => {
    try {
      setLoading(true)
      await companyProfile(payload)
      setLoading(false)
      notify({ message: 'Perfil de la empresa fue asignado correctamente', type: 'success' })
    } catch (error) {
      setLoading(false)
      notify({ message: 'Error mensaje', type: 'error' })
    }
  }, [])

  return {
    updateCompanyProfile,
    loading
  }
}

export default useCompanyProfile
