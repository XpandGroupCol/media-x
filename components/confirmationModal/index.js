import Button from 'components/button'
import Modal from 'components/modal'
import Typography from 'components/typography'

const ConfirmationModal = ({ open, onClose, onSubmit }) => {
  return (
    <Modal onClose={onClose} open={open}>
      <>
        <Typography>
          ¿Deseas eliminar el registro?
        </Typography>
        <Button onClick={onClose}>
          cancelar
        </Button>
        <Button onClick={onSubmit}>
          Confirmar
        </Button>
      </>
    </Modal>
  )
}

export default ConfirmationModal
