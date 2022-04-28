import { LinearProgress, Typography } from '@mui/material'
import styles from './loading.module.css'
const LoadingPage = () => {
  return (
    <div className={styles.loading}>
      <Typography>Cargando...</Typography>
      <LinearProgress sx={{ width: 200 }} />
    </div>
  )
}

export default LoadingPage
