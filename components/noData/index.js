import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop'
import BrokenImageIcon from '@mui/icons-material/BrokenImage'
import Typography from 'components/typography'
import styles from './noData.module.css'
import classNames from 'classnames'
const NoData = ({ error }) => {
  const message = error ? 'Algo salio mal, por favor intente nuevamente.' : 'No se econtraron resultados.'
  return (
    <div className={classNames(styles.noData, 'fadeIn')}>
      {error ? <BrokenImageIcon /> : <ScreenSearchDesktopIcon color='primary' />}
      <Typography>{message}</Typography>
    </div>
  )
}

export default NoData
