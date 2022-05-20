
import { useEffect, useState } from 'react'
import Image from 'next/image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Button from 'components/button'
import styles from './uploadFile.module.css'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const UploadFile = ({ setPreview, preview }) => {
  const [image, setImage] = useState(null)
  useEffect(() => {
    if (image) {
      const reader = new window.FileReader()
      reader.onloadend = () => {
        setPreview({
          url: reader.result,
          image
        })
      }
      reader.readAsDataURL(image)
    } else {
      setPreview(null)
    }
  }, [image, setPreview])

  const handleSetImage = ({ target }) => {
    const file = target.files[0]
    if (file && file.type.substr(0, 5) === 'image') { return setImage(file) }
    setImage(null)
  }

  const clearImage = () => {
    setImage(null)
  }

  return (
    <div className={styles.picture}>
      {
            preview
              ? (
                <div className={styles.imagenContainer}>
                  <Image src={preview} width={80} height={80} className={styles.previewImage} />
                  <IconButton className={styles.clearButton} onClick={clearImage}>
                    <CloseIcon fontSize='small' />
                  </IconButton>
                </div>
                )
              : (
                <>
                  <div className={styles.uploadFile}>
                    <CloudUploadIcon color='primary' />
                  </div>
                  <Button size='small' color='primary'>
                    <label htmlFor='contained-button-file'>
                      <input className={styles.inputFile} type='file' accept='image/*' id='contained-button-file' onChange={handleSetImage} />
                      Subir logo
                    </label>
                  </Button>
                </>)
          }

    </div>
  )
}

export default UploadFile
