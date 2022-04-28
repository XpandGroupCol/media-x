
import Button from 'components/button'
import Typography from 'components/typography'

import styles from './summary.module.css'
const Summary = () => {
  return (

    <section className={styles.publishers}>
      <div className={styles.media}>
        <Typography className={styles.title} align='right'>Orden de compra #5236236346</Typography>
        <div className={styles.summary}>
          <div className={styles.firstSection}>
            <div className={styles.summaryHeader}>
              <Typography><strong>Marca:</strong> Adidas</Typography>
              <Typography><strong>Campaña:</strong> Ultraboost 21</Typography>
              <Typography><strong>Fecha:</strong> 01/01/21 a 31/03/21</Typography>
            </div>
            <div className={styles.row}>
              <Typography color='secondary'>Impresiones</Typography>
              <Typography color='secondary'>1.538.797</Typography>
            </div>
            <div className={styles.row}>
              <Typography color='secondary'>Reproducciones</Typography>
              <Typography color='secondary'>143.239</Typography>
            </div>
            <div className={styles.row}>
              <Typography color='secondary'>Clicks</Typography>
              <Typography color='secondary'>0</Typography>
            </div>
          </div>

          <div className={styles.secondSection}>
            <div className={styles.row}>
              <Typography>Inversión en plataformas digitales</Typography>
              <Typography component='strong'>$6.875.477</Typography>
            </div>
            <div className={styles.row}>
              <Typography>Inversión en medios masivos (digital)</Typography>
              <Typography component='strong'>$6.875.477</Typography>
            </div>
            <div className={styles.row}>
              <Typography>Moneda</Typography>
              <Typography component='strong'>COP</Typography>
            </div>
            <div className={styles.row}>
              <Typography>Descuentos aplicados</Typography>
              <Typography component='strong'>N/A</Typography>
            </div>
            <div className={styles.row}>
              <Typography>Comisión plataforma tecnológica</Typography>
              <Typography component='strong'> $2.291.826</Typography>
            </div>
            <div className={styles.row}>
              <Typography>IVA</Typography>
              <Typography component='strong'>$4.789.916</Typography>
            </div>
            <div className={styles.total}>
              <Typography>TOTAL</Typography>
              <Typography>$30.000.000</Typography>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.media}>

        <div>
          <Typography className={styles.title}>Segmentación para tu campaña</Typography>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th />
                  <th><Typography align='left'>Ubicaciones</Typography></th>
                  <th><Typography align='left'>Formatos</Typography></th>
                  <th><Typography align='left'>Share</Typography></th>
                  <th><Typography align='left'>Valor</Typography></th>
                  <th><Typography align='left'>Meta objetiva</Typography></th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='12%'> El colombiano</td>
                  <td width='14%'> El colombiano</td>
                  <td width='14%'>
                    El colombiano
                  </td>
                </tr>
                <tr>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='12%'> El colombiano</td>
                  <td width='14%'> El colombiano</td>
                  <td width='14%'>
                    El colombiano
                  </td>
                </tr>
                <tr>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='12%'> El colombiano</td>
                  <td width='14%'> El colombiano</td>
                  <td width='14%'>
                    El colombiano
                  </td>
                </tr>
                <tr>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='12%'> El colombiano</td>
                  <td width='14%'> El colombiano</td>
                  <td width='14%'>
                    El colombiano
                  </td>
                </tr>
                <tr>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='12%'> El colombiano</td>
                  <td width='14%'> El colombiano</td>
                  <td width='14%'>
                    El colombiano
                  </td>
                </tr>
                <tr>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='20%'>
                    El colombiano
                  </td>
                  <td width='12%'> El colombiano</td>
                  <td width='14%'> El colombiano</td>
                  <td width='14%'>
                    El colombiano
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button size='large' variant='contained'>Ver Campañas</Button>
        </div>
      </div>
    </section>

  )
}

export default Summary
