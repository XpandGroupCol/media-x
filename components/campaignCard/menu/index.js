import MuiMenu from '@mui/material/Menu'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'
import { IconButton } from '@mui/material'

const Menu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (

    <>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}

      >
        <MoreVertIcon />
      </IconButton>
      <MuiMenu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{
          '& .MuiPaper-root': {
            boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 12px'
          }
        }}
      >
        {children({ onClose: handleClose })}
      </MuiMenu>
    </>
  )
}

export default Menu
