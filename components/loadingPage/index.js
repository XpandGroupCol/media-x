import { LinearProgress, Typography } from '@mui/material'
import styles from './loading.module.css'
const LoadingPage = ({ text = 'Sincronizando los datos . . .' }) => {
  return (
    <div className={styles.loading}>
      <Typography>{text}</Typography>
      <LinearProgress sx={{ width: 200 }} />
    </div>
  )
}

export default LoadingPage
