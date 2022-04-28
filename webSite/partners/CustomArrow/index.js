import classNames from 'classnames'
import Arrow from 'icons/Arrow'
import styles from '../partners.module.css'
const CustomArrow = ({ className, style, onClick, orientation = 'right' }) => {
  return (
    <div
      className={classNames(className, [styles[orientation]])}
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
    >
      <Arrow
        color='white' width={16}
      />
    </div>
  )
}

export default CustomArrow
