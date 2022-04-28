import styles from './question.module.css'
import Arrow from 'icons/Arrow'
import classnames from 'classnames'
const Question = ({ active = false, onChange }) => {
  return (
    <div>
      <div className={classnames(styles.header, { [styles.active]: active })} onClick={onChange}>
        <h3 className={styles.title}>
          ¿Cuál es el monto mínimo con el que puedo hacer una campaña?
        </h3>
        <div className={classnames(styles.icon, { [styles.iconActive]: active })}>
          <Arrow color='white' width={11} />
        </div>
      </div>
      <div className={classnames(styles.content, { [styles.showContent]: active })}>
        <p className={styles.text}>gracias a la campaña realizada a través de xpandmedia
          logré aumentar mis ventas en un 15% en los ultimos 3 meses. recomiendo usar esta plataforma a todas las
          pequeñas y MEDIANAS empresas que necesiten un mayor posicionamiento DE MARCA en el mercado y estén en busca de aumentar sus ventas.

          juan esteban guillén, lider de mercadeo, avon
        </p>
      </div>
    </div>
  )
}

export default Question
