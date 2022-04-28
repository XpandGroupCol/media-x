import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import logo from 'public/images/logo.svg'
import styles from './header.module.css'
import Autocomplete from 'components/autocomplete'
import InputDate from 'components/datePicker'
import InputCurrency from 'components/currencyInput'
const Header = ({ media }) => {
  const [show, setShow] = useState(false)

  const handleSetShow = () => {
    setShow(prevState => !prevState)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>

        <Image src={logo} width={220} />
        <div className={classnames(styles.burger, { [styles.close]: show })} onClick={handleSetShow}>
          <span />
          <span />
          <span />
        </div>

        <div className={classnames(styles.buttons, { [styles.showMenu]: show })}>
          <Link href='/auth/login'>
            <a className={styles.link}> Iniciar Sesión</a>
          </Link>
          <Link href='/auth/register'>
            <a className={styles.button}> Registrarme</a>
          </Link>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Crea rápido tu campaña Digital 360</h2>
          <p className={styles.planningText}>Planeación, ordenación, pagos y reporte ágil 100% digital</p>
          <div className={styles.fields}>
            <div className={styles.field}>
              <Autocomplete options={media} label='Medios' placeholder='todos' multiple />
            </div>
            <div className={styles.field}>
              <Autocomplete options={[]} label='Lugar' placeholder='todos' />
            </div>
          </div>
          <p className={styles.resultsText}>1.538.797 <strong>Impresiones (estimadas)</strong></p>
          <span className={styles.progress} />
          <div className={styles.fields}>
            <div className={styles.field}>
              <label>¿Cuánto dinero planeas invertir en tu campaña?</label>
              <InputCurrency icon='$' placeholder='30.000.000' helperText='Máximo $200 millones' />
            </div>
            <div className={styles.field}>
              <label>¿Cuánto dinero planeas invertir en tu campaña?</label>
              <InputDate placeholder='MM/DD/YYYY' />
            </div>
          </div>

          <div className={styles.cardbuttons}>
            <button>
              Crear campaña rápida
            </button>
            <button className={styles.secondButton}>
              Simular pagos
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
