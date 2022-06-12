import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'
import { Divider, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'

import Typography from 'components/typography'
import Avatar from 'components/avatar'
import ActiveLink from 'components/activeLink'
import LoadingPage from 'components/loadingPage'
import { useSession } from 'providers/sessionProvider'

import styles from './layout.module.css'

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const { replace, pathname } = useRouter()

  const open = Boolean(anchorEl)
  const handleClick = (event) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () =>
    setAnchorEl(null)

  const handleShowMenu = () =>
    setShowMenu(prevValue => !prevValue)

  const { session, logout } = useSession()

  useEffect(() => {
    if (session === null) replace(`/auth/login?q=${pathname}`)
  }, [session, replace, pathname])

  if (!session) return <LoadingPage />

  return (
    <div className={styles.page}>
      {showMenu && <div className={styles.overlay} onClick={handleShowMenu} />}
      <aside className={classNames(styles.aside, { [styles.showAside]: showMenu })}>
        <Typography className={styles.logo}>SHAREFLOW</Typography>
        <div className={styles.nav}>
          <ActiveLink href='/campaigns' activeClassName={styles.active}>
            <a className={styles.link}>
              <DashboardIcon />
              Campañas
            </a>
          </ActiveLink>
          <ActiveLink href='/activity' activeClassName={styles.active}>
            <a className={styles.link}>
              <PersonIcon />
              Actividad
            </a>
          </ActiveLink>
        </div>

      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.logoSection}>
            <IconButton className={styles.openMenu} color='primary' onClick={handleShowMenu}>
              <MenuIcon />
            </IconButton>
            <Typography component='h2' color='primary'>SHAREFLOW</Typography>
          </div>

          <button onClick={handleClick} className={styles.logout}>
            <div className={styles.userInfo}>
              <Typography sx={{
                maxWidth: '150px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 14,
                fontWeight: 'bold'
              }}
              >{session?.name}
              </Typography>
              <Typography color='gray' sx={{ fontSize: 12, textAlign: 'right' }}>{session?.role}</Typography>
            </div>
            <Avatar src={session?.image} label={session?.name} sx={{ width: 36, height: 36 }} />

          </button>
          <Menu
            id='header-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            sx={{
              '& .MuiPaper-root': {
                boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 12px',
                paddingTop: '15px'
              }
            }}
          >
            <MenuItem sx={{ gap: '20px' }}>
              <div>
                <Typography fontWeight='bold'>{session?.name}
                </Typography>
                <Typography color='gray' sx={{ fontSize: 12 }}>{session?.role}</Typography>
              </div>
              <Avatar src={session?.image} label={session?.name} sx={{ width: 36, height: 36 }} />
            </MenuItem>
            <Divider />
            <Link href='/profile'>
              <MenuItem component='a' onClick={handleClose}>
                <PersonIcon fontSize='small' sx={{ marginRight: '10px' }} />
                Perfil
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={logout}>
              <LogoutIcon fontSize='small' sx={{ marginRight: '10px' }} />
              Cerrar sesion
            </MenuItem>
          </Menu>
        </header>

        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
