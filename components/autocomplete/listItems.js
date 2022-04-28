import { Checkbox } from '@mui/material'

export const renderlist = (props, option, { selected }) => (
  <li {...props} style={{ color: '#4b494f' }}>
    <Checkbox
      style={{ marginRight: 8 }}
      checked={selected}
    />
    {option.label}
  </li>
)
