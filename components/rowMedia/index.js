import { CircularProgress, IconButton, Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DoneIcon from '@mui/icons-material/Done'
import styles from './rowMedia.module.css'
const RowMedia = ({ remove, upload, isLoading, url, id }) => {
  if (isLoading) {
    return (
      <div className={styles.row}>
        <CircularProgress size={20} />
      </div>
    )
  }

  if (!url) {
    return (
      <div className={styles.row}>
        <label htmlFor={id}>
          <input type='file' style={{ display: 'none' }} id={id} onChange={upload} />
          <IconButton component='span'>
            <CloudUploadIcon />
          </IconButton>
        </label>
      </div>
    )
  }

  if (url) {
    return (
      <div className={styles.row}>
        <DoneIcon color='success' />
        <Button onClick={remove} size='small' color='success'>
          Eliminar
        </Button>
      </div>
    )
  }
}

export default RowMedia
