import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#5b27ed'
    },
    secondary: {
      main: '#ed6e27'
    },
    default: {
      main: '#e0e0e0',
      contrastText: '#000000de'
    },
    background: {
      default: '#fff'
    },
    text: {
      primary: '#4b494f'
    }
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      disableElevation: true
    },
    styleOverrides: {
      root: {
        borderRadius: 10
      }
    }
  }
})
