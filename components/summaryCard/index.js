import classNames from 'classnames'
import Typography from 'components/typography'
import { getFormatedNumber } from 'utils/transformData'
import styles from './summaryCard.module.css'

const summaryCard = ({
  campaign, medio,
  plataforma,
  impresiones,
  reproducciones,
  clicks,
  grossValue,
  serviceFee
}) => {
  return (
    <>
      <div className={styles.summaryHeader}>
        <Typography><strong>Marca:</strong> {campaign?.brand}</Typography>
        <Typography><strong>Campaña:</strong> {campaign?.name}</Typography>
        <Typography><strong>Fecha:</strong> 01/01/21 a 31/03/21</Typography>
      </div>
      <div className={classNames(styles.content)}>
        <div className={styles.summaryRow}>
          <Typography>Inversión en plataformas</Typography>
          <Typography component='strong'>${getFormatedNumber(plataforma)}</Typography>
        </div>
        <div className={styles.summaryRow}>
          <Typography>Inversión en medios masivos</Typography>
          <Typography component='strong'>${getFormatedNumber(medio)}</Typography>
        </div>
        <div className={styles.summaryRow}>
          <Typography>Moneda</Typography>
          <Typography component='strong'>COP</Typography>
        </div>
        <div className={styles.summaryRow}>
          <Typography>Descuentos</Typography>
          <Typography component='strong'>N/A</Typography>
        </div>
        <div className={styles.summaryRow}>
          <Typography>Valor bruto a invertir</Typography>
          <Typography component='strong'>$ {getFormatedNumber(grossValue)}</Typography>
        </div>
        <div className={styles.summaryRow}>
          <Typography>Tarifa de servicio</Typography>
          <Typography component='strong'>$ {getFormatedNumber(serviceFee)}</Typography>
        </div>
        <div className={styles.summaryRow}>
          <Typography color='secondary'>Impresiones</Typography>
          <Typography color='secondary'>{getFormatedNumber(impresiones)}</Typography>
        </div>
        <div className={styles.summaryRow}>
          <Typography color='secondary'>Reproducciones</Typography>
          <Typography color='secondary'>{getFormatedNumber(reproducciones)}</Typography>
        </div>
        <div className={classNames(styles.summaryRow, styles.mb20)}>
          <Typography color='secondary'>Clicks</Typography>
          <Typography color='secondary'>{getFormatedNumber(clicks)}</Typography>
        </div>

      </div>
      <div className={classNames(styles.summaryRow, styles.total)}>
        <Typography>TOTAL</Typography>
        <Typography>${getFormatedNumber(campaign?.amount)}</Typography>
      </div>
    </>
  )
}

export default summaryCard
