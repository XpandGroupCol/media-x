import MuiAvatar from '@mui/material/Avatar'

const Avatar = ({ src, label, ...props }) => {
  if (src) return <MuiAvatar src={src} {...props} />
  return (
    <MuiAvatar {...props}>
      {label?.toUpperCase().slice(0, 2)}
    </MuiAvatar>
  )
}

export default Avatar
