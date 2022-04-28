import { CircularProgress } from '@mui/material'
import MuiButton from '@mui/material/Button'
import styles from './button.module.css'
const Button = ({ children, loading, disabled, variant = 'contained', ...props }) => {
  return (
    <MuiButton disabled={disabled || loading} variant={variant} disableElevation {...props} sx={{ borderRadius: '10px', position: 'relative' }}>
      {children}
      {loading && <CircularProgress size={22} className={styles.buttonProgress} />}
    </MuiButton>

  )
}

export default Button
