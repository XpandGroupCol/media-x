import useNotification from 'hooks/useNotification'
import { useCallback, useState } from 'react'
import { validatorFile } from 'services/campaignServices'

const useValidatorFile = () => {
  const [loading, setLoading] = useState([])
  const notify = useNotification()

  const validator = useCallback(async (info, payload) => {
    try {
      setLoading(prev => [...prev, info])
      await validatorFile(payload)
      setLoading(prev => prev.map((el) => {
        if (el.id === info.id) {
          return {
            ...el,
            loading: false,
            rejected: false
          }
        }
        return el
      }))
      notify.success('El archivo ha sido cargado correctamente')
    } catch (e) {
      setLoading(prev => prev.map((el) => {
        if (el.id === info.id) {
          return {
            ...el,
            loading: false,
            rejected: true
          }
        }
        return el
      }))
      notify.error('El archivo no es un fomato valido')
    }
  }, [])

  const removeFile = useCallback((fileId) => {
    setLoading(prev => prev.filter((el) => el?.id === fileId))
  }, [])

  return {
    validator,
    loadings: loading,
    removeFile
  }
}

export default useValidatorFile
