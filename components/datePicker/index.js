import MuiDatePicker from '@mui/lab/DatePicker'
import Input from 'components/input'
import { forwardRef } from 'react'

const DatePicker = forwardRef(({ value, onChange, label, error, helperText, ...props }, ref) => (
  <MuiDatePicker
    label={label}
    value={value}
    onChange={onChange}
    {...props}
    renderInput={(params) => <Input fullWidth {...params} error={error} helperText={helperText} />}
  />
))

export default DatePicker
