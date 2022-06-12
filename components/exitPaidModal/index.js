import { Divider } from '@mui/material'
import Button from 'components/button'
import Modal from 'components/modal'
import Typography from 'components/typography'
import Link from 'next/link'
import styles from './changePasswordModal.module.css'
import PriceCheckIcon from '@mui/icons-material/PriceCheck'
const ExitPaidModal = ({ open, onClose }) => {
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
        >Pago exitoso
        </Typography>
        <Divider sx={{ margin: '10px 0 20px' }} />
        <div className={styles.fields}>
          <PriceCheckIcon color='success' />
          <Typography fontSize='20px' textAlign='center'>Felicitaciones, tu <Typography component='strong' fontWeight='bold' fontSize='inherit'>Flow de medios</Typography> ha sido generado y se encuentra en proceso de implementación, un ejecutivo de medios te contactará en el menor tiempo posible.</Typography>
        </div>
        <div className={styles.buttons}>
          <Button type='button' onClick={onClose} variant='outlined' color='secondary'>Cerrar</Button>
          <Link href='/campaigns'>
            <Button component='a' variant='outlined'>Ver camapañas</Button>
          </Link>
        </div>
      </div>
    </Modal>
  )
}

export default ExitPaidModal
