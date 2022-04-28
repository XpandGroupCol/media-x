import Quotes from 'icons/Quotes'
import styles from './experiences.module.css'
import user1 from 'public/images/user-1.png'
import user2 from 'public/images/user-2.png'
import user3 from 'public/images/user-3.png'
import user4 from 'public/images/user-4.png'
import Image from 'next/image'

const Experiences = () => {
  return (
    <div className={styles.experienceSection}>
      <div className={styles.container}>
        <h3 className={styles.title}>¿TE GUSTARÍA CRECER TU NEGOCIO COMO ELLOS?</h3>
        <p className={styles.subtitle}>CONOCE AHORA LAS HISTORIAS DE ÉXITO DE GRANDES MARCAS QUE HEMOS ACOMPAÑADO, Y CÓMO PODRÍAMOS AYUDARTE A TI A OBTENER REESULTADOS SIMILARES ¡O MEJORES!?</p>

      </div>

      <div className={styles.containerImages}>
        <div className={styles.images}>
          <div className={styles.image}>
            <Image src={user1} />
          </div>
          <div className={styles.image}>
            <Image src={user2} />
          </div>
          <div className={styles.image}>
            <Image src={user3} />
          </div>
          <div className={styles.image}>
            <Image src={user4} />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.experience}>
          <span className={styles.ellipse}>
            <Quotes />
          </span>
          <p className={styles.paragraph}>gracias a la campaña realizada a través de xpandmedia
            <span className={styles.mark}> logré aumentar mis ventas en un 15% en los ultimos 3 meses.
            </span> recomiendo usar esta plataforma a todas las
            pequeñas y MEDIANAS empresas que necesiten un mayor posicionamiento DE MARCA en el mercado y estén en busca de aumentar sus ventas.
          </p>
          <p className={styles.user}><strong>juan esteban guillén,</strong> lider de mercadeo, avon</p>
          <button className={styles.button}>
            comienza ahora
          </button>
        </div>
      </div>

    </div>
  )
}

export default Experiences
