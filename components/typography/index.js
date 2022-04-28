import MuiTypography from '@mui/material/Typography'
const Typography = ({ children, ...props }) => {
  return (
    <MuiTypography {...props}>
      {children}
    </MuiTypography>
  )
}

export default Typography
