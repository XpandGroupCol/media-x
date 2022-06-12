
import Typography from 'components/typography'
import Input from 'components/input'
import styles from './inputFile.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { forwardRef } from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const InputFile = forwardRef(({ label, id, onChange, remove, accept = 'application/pdf', value, placeholder, ...props }, ref) => {
  const hanldeOnChange = ({ target }) => {
    const file = target.files[0]
    if (file) return onChange(file)
  }

  const fileName = value?.name || ''

  const hanldeDeleteFile = () => {
    remove && remove()
    onChange(null)
  }

  if (value?.url) {
    return (
      <div className={styles.removeFile}>
        <a href={value?.url} target='blank'>{placeholder}</a>
        <IconButton size='small' onClick={hanldeDeleteFile}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </div>
    )
  }

  return (
    <label htmlFor={id} className={styles.label}>
      <Input id={id} onChange={hanldeOnChange} inputProps={{ accept }} type='file' {...props} className={styles.inputFile} />
      <span className={styles.placeholder}>{label}: {value && <Typography component='span' className={styles.value}>{fileName}</Typography>}</span>
      <CloudUploadIcon color='primary' />
    </label>
  )
})

export default InputFile
