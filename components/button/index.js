import { CircularProgress } from '@mui/material'
import MuiButton from '@mui/material/Button'
import styles from './button.module.css'
import { forwardRef } from 'react'
const Button = forwardRef(({ children, loading, disabled, variant = 'contained', ...props }, ref) => {
  return (
    <MuiButton disabled={loading || disabled} variant={variant} disableElevation {...props} sx={{ borderRadius: '10px', position: 'relative' }}>
      {children}
      {loading && <CircularProgress size={22} className={styles.buttonProgress} />}
    </MuiButton>

  )
})

export default Button
