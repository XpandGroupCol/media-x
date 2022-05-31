import Image from 'next/image'
import Link from 'next/link'
import styles from './website.module.css'
import macTemplate from 'public/images/mac-template.png'
const WebSite = () => {
  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Shareflow.me</h1>
        <Link href='/auth/login'>
          <a className={styles.link}>Ingresar</a>
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.information}>
          <h2 className={styles.h2}>Aprovecha el potencial de los medios en tus campañas digitales</h2>
          <p className={styles.p}>Shareflow ayuda a todas las pequeñas y medianas empresas a crear su mix de medios que permita alcanzar los objetivos de negocio a través de inteligencia artificial y optimización de presupuestos.</p>
          <ul className={styles.list}>
            <li>Accede a más de 50 portales digitales de medios de comunicación nacionales, regionales o locales</li>
            <li> +300 formatos digitales multiplataforma</li>
            <li>Unica plataforma abierta en comercializar Spotify, TikTok, Twitter, Twitch y Snapchat</li>
            <li>Posibilidad de segmentación en todos los medios del país</li>
            <li>Aprendizaje automático e Inteligencia Artificial</li>
            <li>SIN PAPELEOS NI CONTRATOS</li>
          </ul>
          <Link href='/auth/login'>
            <a className={styles.button}>Regístrate Gratis Ahora</a>
          </Link>
        </div>
        <picture className={styles.picture}>
          <Image src={macTemplate} className={styles.image} />
        </picture>
      </main>
    </div>
  )
}

export default WebSite
