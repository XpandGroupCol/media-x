import { Avatar, IconButton, InputAdornment } from '@mui/material'
import ControllerField from 'components/ControllerField'
import input from 'components/input'
import Typography from 'components/typography'
import { getFormatedNumber } from 'utils/transformData'
import styles from './publisherCard.module.css'
import CloseIcon from '@mui/icons-material/Close'
import PercentIcon from '@mui/icons-material/Percent'

const PublisherCard = ({
  error,
  helperText, control, name, deleteRow, onBlur,
  publisher, label, device, objectiveGoal, value, rowId
}) => {
  return (
    <div
      className={styles.publisherContainer}
    >
      <IconButton
        size='small'
        sx={{ position: 'absolute', right: '5px', top: '5px' }}
        onClick={deleteRow}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
      <div className={styles.brand}>
        <Avatar>{publisher.slice(0, 2)}</Avatar>
        <div>
          <Typography fontSize='16px' fontWeight='bold'> {publisher} </Typography>
          <Typography fontSize='14px'>{label}</Typography>
        </div>
      </div>

      <div className={styles.information}>
        <div className={styles.row}>
          <Typography fontWeight='bold' fontSize='14px'>Dispositivo:</Typography>
          <Typography>{device}</Typography>
        </div>
        <div className={styles.row}>
          <Typography fontWeight='bold' fontSize='14px'>Meta objetivo:</Typography>
          <Typography>{getFormatedNumber(objectiveGoal)}</Typography>
        </div>
        <div className={styles.row}>
          <Typography fontWeight='bold' fontSize='14px'>Inversion:</Typography>
          <Typography>$ {getFormatedNumber(value)}</Typography>
        </div>
      </div>
      <ControllerField
        control={control}
        name={name}
        fullWidth
        size='small'
        label='Share'
        element={input}
        type='number'
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        sx={{
          width: {
            xs: 200,
            sm: 150
          }
        }}
        InputProps={{
          endAdornment:
            (
              <InputAdornment position='start'>
                <PercentIcon color='primary' />
              </InputAdornment>
            )
        }}
      />
    </div>
  )
}

export default PublisherCard
