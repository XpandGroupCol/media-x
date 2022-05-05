import { Checkbox } from '@mui/material'

export const renderlist = (props, option, { selected }) => (
  <li {...props} style={{ color: '#4b494f', fontSize: 14, paddingTop: 0, paddingBottom: 0 }}>
    <Checkbox
      style={{ marginRight: 8 }}
      checked={selected}
      size='small'
    />
    {option.label}
  </li>
)
