import { Dialog } from '@mui/material'

const Modal = ({ open, onClose, maxWidth = 'sm', children }) => {
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '10px'
        }
      }}
    >
      {children}
    </Dialog>
  )
}

export default Modal
