import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import Button from 'components/button'
import styles from './modal.module.css'

const Modal = ({ open, onClose, children, title, maxWidth = 'sm', hideButtons = false, onCancel, onsubmit, cancelText, submitText, loading }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (

    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle id='responsive-dialog-title' className={styles.title}>
        {title}
        <div className={styles.deleteIcon}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </div>

      </DialogTitle>
      <DialogContent className={styles.modalContent}>
        {children}
      </DialogContent>
      {hideButtons && (
        <DialogActions>
          <Button onClick={onCancel}>
            Disagree
          </Button>
          <Button onClick={onsubmit}>
            Agree
          </Button>
        </DialogActions>
      )}
    </Dialog>

  )
}

export default Modal
