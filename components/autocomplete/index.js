import { forwardRef } from 'react'
import MuiAutocomplete from '@mui/material/Autocomplete'
import Input from 'components/input'
import { renderlist } from './listItems'

const Autocomplete = forwardRef(({
  placeholder, options, label, multiple = false,
  value, onChange, error, helperText, ...props
}, ref) => (
  <MuiAutocomplete
    options={options}
    openOnFocus
    disableCloseOnSelect={multiple}
    onChange={(event, value) => onChange(value, event)}
    multiple={multiple}
    isOptionEqualToValue={(option, value) => {
      if (option._id) return option._id === value._id
      return option.id === value.id
    }}
    value={value}
    fullWidth
    {...props}
    renderInput={(params) =>
      <Input label={label} error={error} helperText={helperText} {...params} />}
    renderOption={multiple ? renderlist : undefined}
  />
))

export default Autocomplete
