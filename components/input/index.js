import TextField from '@mui/material/TextField'
import { styled } from '@mui/system'
import { forwardRef } from 'react'

const Input = styled(({ InputProps, fullWidth, ...props }) => (
  <TextField InputProps={{ ...InputProps, disableUnderline: true }} {...props} variant='filled' fullWidth />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#fff',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),

    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main
    }
  },
  '.MuiInputLabel-root.MuiInputLabel-filled': {
    fontSize: '.8rem',
    fontWeight: 500
  }
}))

export default forwardRef((props, ref) => <Input {...props} />)
