
import Typography from 'components/typography'
import Input from 'components/input'
import styles from './inputFile.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { forwardRef } from 'react'
import Button from 'components/button'

const InputFile = forwardRef(({ label, id, onChange, accept = 'application/pdf', value, ...props }, ref) => {
  const hanldeOnChange = ({ target }) => {
    const file = target.files[0]
    if (file) return onChange(file)
  }

  const fileName = value?.name || ''

  if (value?.url) {
    return (
      <div>
        <a href={value?.url} target='blank'>Ver documento</a>
        <Button onClick={() => onChange(null)}>
          Eliminar
        </Button>
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
