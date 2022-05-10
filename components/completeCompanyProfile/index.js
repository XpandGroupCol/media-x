import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import CompanyForm from 'components/companyForm'

const CompleteCompanyProfile = ({ open, onClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Perfil de empresa</DialogTitle>
      <DialogContent>
        <CompanyForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CompleteCompanyProfile
