import { InputAdornment } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Input from 'components/input'
import NumberFormatCustom from './numberFormat'
import { forwardRef } from 'react'

const CurrencyInput = forwardRef(({ value, onChange, label, name, ...props }, ref) => (
  <Input
    label={label}
    value={value}
    fullWidth
    onChange={({ target }) => {
      const value = target.value
      if (value === '') return onChange(null)
      onChange(value)
    }}
    name={name}
    {...props}
    InputProps={{
      inputComponent: NumberFormatCustom,
      startAdornment:
        (
          <InputAdornment position='start'>
            <AttachMoneyIcon color='primary' />
          </InputAdornment>
        )
    }}
  />
))

export default CurrencyInput
