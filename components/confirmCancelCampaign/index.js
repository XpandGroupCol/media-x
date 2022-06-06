import { Divider } from '@mui/material'
import Button from 'components/button'
import Modal from 'components/modal'
import Typography from 'components/typography'
import styles from './changePasswordModal.module.css'

const ConfirmCancelCampaign = ({ open, onClose, onSubmit, loading }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >

      <div className={styles.content}>
        <Typography sx={{
          fontSize: '20px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textAlign: 'center'
        }}
        >Cancelar orden
        </Typography>
        <Divider sx={{ margin: '10px 0 20px' }} />
        <div className={styles.fields}>
          <Typography textAlign='center'>Estas seguro que desear cancelar la orden?</Typography>
        </div>
        <div className={styles.buttons}>
          <Button type='button' onClick={onClose} variant='outlined' color='secondary'>Cancelar</Button>
          <Button type='submit' loading={loading} onClick={onSubmit}>Confimar</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmCancelCampaign
