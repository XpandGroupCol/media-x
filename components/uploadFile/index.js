
import Image from 'next/image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styles from './uploadFile.module.css'
import { Button } from '@mui/material'
import Typography from 'components/typography'

const UploadFile = ({ setPreview, preview, id = 'upload-file', label = 'Subir logo' }) => {
  const handleSetImage = ({ target }) => {
    const file = target.files[0]
    if (file && file.type.substr(0, 5) === 'image') {
      const reader = new window.FileReader()
      reader.onloadend = () => {
        setPreview({
          url: reader.result,
          image: file
        })
      }
      reader.readAsDataURL(file)
      return
    }
    setPreview(null)
  }

  const clearImage = () => {
    setPreview(null)
  }

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadFilePicture}>
        {
            preview
              ? (
                <Image src={preview} width={80} height={80} className={styles.previewImage} />
                )
              : (
                <label htmlFor={id} className={styles.upload}>
                  <input className={styles.inputFile} type='file' accept='image/*' id={id} onChange={handleSetImage} />
                  <CloudUploadIcon color='primary' />
                </label>
                )
          }

      </div>
      {preview ? <Button size='small' onClick={clearImage}>Eliminar</Button> : <Typography>{label}</Typography>}
    </div>
  )
}

export default UploadFile
