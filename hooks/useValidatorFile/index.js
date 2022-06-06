import useNotification from 'hooks/useNotification'
import { useCallback, useState } from 'react'
import { validatorFile } from 'services/campaignServices'

const useValidatorFile = (initValues = []) => {
  const [files, setFiles] = useState(initValues)
  const notify = useNotification()

  const validator = useCallback(async (index, payload) => {
    try {
      setFiles(prev => {
        const files = [...prev]
        const currentFile = files[index]

        if (currentFile) {
          currentFile.loading = true
          currentFile.imageUrl = ''
        }
        return files
      })
      const { data } = await validatorFile(payload)
      const [file = {}] = data
      setFiles(prev => {
        const files = [...prev]
        const currentFile = files[index]
        if (currentFile) {
          currentFile.loading = false
          currentFile.imageUrl = file?.url || ''
        }
        return files
      })

      notify.success('El archivo ha sido cargado correctamente')
    } catch ({ response }) {
      const message = response?.data?.message

      setFiles(prev => {
        const files = [...prev]
        const currentFile = files[index]
        if (currentFile) {
          currentFile.loading = false
          currentFile.imageUrl = ''
        }
        return files
      })

      notify.error(message && message === 'The dimensions sent are not allowed'
        ? 'Las dimensiones del archivo no son validas.'
        : 'Verifique las dimension y formato del archivo')
    }
  }, [])

  const removeFile = useCallback((index) => {
    setFiles(prev => {
      const files = [...prev]
      const currentFile = files[index]
      if (currentFile) {
        currentFile.loading = false
        currentFile.imageUrl = ''
      }
      return files
    })
  }, [])

  return {
    validator,
    files,
    setFiles,
    removeFile
  }
}

export default useValidatorFile
