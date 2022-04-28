import Image from 'next/image'
import logo from 'public/images/logo.svg'
import styles from './footer.module.css'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <ul>
          <li className={styles.title}>XPAND<span>GROUP</span></li>
          <li>XPAND STUDIO</li>
          <li>XPAND ACADEMY</li>
          <li>XPAND MPI</li>
        </ul>
        <ul>
          <li className={styles.title}>RECURSOS</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
        </ul>
        <ul>
          <li className={styles.title}>RECURSOS</li>
          <li>orem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
        </ul>
        <ul>
          <li className={styles.title}>RECURSOS</li>
          <li>orem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
        </ul>
        <ul>
          <li className={styles.title}>RECURSOS</li>
          <li>orem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
        </ul>
      </div>
      <div className={styles.policies}>
        <Image src={logo} width={150} />
        <div className={styles.legal}>
          <p>aviso legal</p>
          <p>política de privacidad</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
