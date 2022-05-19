import styles from './changePassword.module.css'
import { Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'

import CompanyForm from 'components/companyForm'

const CompanyProfile = ({ open, onClose, profile }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle id='responsive-dialog-title' className={styles.modalTitle}>
        Cambiar Contraseña
        <div className={styles.deleteIcon}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <CompanyForm company={profile} />
      </DialogContent>

    </Dialog>

  )
}

export default CompanyProfile
