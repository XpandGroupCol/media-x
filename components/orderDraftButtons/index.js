import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import Button from 'components/button'
import Typography from 'components/typography'
import { useState } from 'react'
import styles from './orderDraftButtons.module.css'
const OrderDraftButtons = ({ loading, onClick }) => {
  const [termsAndConditions, setTermAndConditions] = useState(false)

  const handleSetTermAndConditions = ({ target }) => setTermAndConditions(target.checked)

  return (
    <div className={styles.button}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox
            checked={termsAndConditions}
            onChange={handleSetTermAndConditions}
            inputProps={{ 'aria-label': 'controlled' }}
                   />} label={<Typography>Aceptar términos y condiciones, <a href='https://www.google.com/' target='blank'>leer mas.</a></Typography>}
        />

      </FormGroup>
      <div className={styles.action}>
        <Button
          disabled={!termsAndConditions}
          loading={loading}
          onClick={onClick}
        >
          Generar orden de compra
        </Button>
      </div>
    </div>
  )
}

export default OrderDraftButtons
