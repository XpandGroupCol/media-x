import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import Button from 'components/button'
import Typography from 'components/typography'
import useNotification from 'hooks/useNotification'
import useUpdateCampaignStatus from 'hooks/useUpdateCampaignStatus'
import Link from 'next/link'
import { useState } from 'react'
import styles from './orderDraftButtons.module.css'
const OrderDraftButtons = ({ campaign, setCampaignState }) => {
  const { loading, setCampaignStatus } = useUpdateCampaignStatus()
  const notify = useNotification()
  const [termsAndConditions, setTermAndConditions] = useState(false)

  const handleSetTermAndConditions = ({ target }) => setTermAndConditions(target.checked)

  const handleUpdateStatus = () => {
    setCampaignStatus(campaign?.id, 'pending').then((data) => {
      if (data) {
        setCampaignState(campaign)
        notify.success('Su orden ha sido creada correctamente')
      }
    })
  }

  return (
    <div className={styles.button}>
      <FormGroup sx={{ alignSelf: 'flex-start' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAndConditions}
              onChange={handleSetTermAndConditions}
              inputProps={{ 'aria-label': 'controlled' }}
            />
}
          label={
            <Typography>Aceptar términos y condiciones,
              <a href='https://www.google.com/' target='blank'>leer mas.</a>
            </Typography>
}
        />

      </FormGroup>
      <div className={styles.action}>
        {campaign.status === 'cancel' && (
          <Link href='/campaigns'>
            <Button variant='outlined' color='primary'>
              Salir
            </Button>
          </Link>)}
        <Button
          disabled={!termsAndConditions}
          loading={loading}
          onClick={handleUpdateStatus}
        >
          Generar orden de compra
        </Button>
      </div>
    </div>
  )
}

export default OrderDraftButtons
