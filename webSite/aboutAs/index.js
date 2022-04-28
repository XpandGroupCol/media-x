import styles from './aboutAs.module.css'
import user from 'public/images/user.jpeg'
import Image from 'next/image'
const aboutAs = () => {
  return (
    <section className={styles.aboutAs}>
      <div className={styles.container}>
        <h3 className={styles.title}>ASÍ HARÁS CRECER TU MARCA CON NUESTRA TECNOLOGÍA, DE FORMA FÁCIL y rápida.</h3>
        <div className={styles.information}>
          <div className={styles.box}>
            <span className={styles.number}>1</span>
            <div>
              <h4 className={styles.subtitle}>SELECCIONA TU OBJETIVO DE NEGOCIO</h4>
              <p className={styles.paragraph}>
                Selecciona el objetivo de negocio que quieras lograr entre Visibilidad de marca, Clics al sitio web o Reproducciones de Audio / Video.
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <span className={styles.number}>2</span>
            <div>
              <h4 className={styles.subtitle}>SELECCIONA TU OBJETIVO DE NEGOCIO</h4>
              <p className={styles.paragraph}>
                Selecciona el objetivo de negocio que quieras lograr entre Visibilidad de marca, Clics al sitio web o Reproducciones de Audio / Video.
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <span className={styles.number}>3</span>
            <div>
              <h4 className={styles.subtitle}>SELECCIONA TU OBJETIVO DE NEGOCIO</h4>
              <p className={styles.paragraph}>
                Selecciona el objetivo de negocio que quieras lograr entre Visibilidad de marca, Clics al sitio web o Reproducciones de Audio / Video.
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <span className={styles.number}>4</span>
            <div>
              <h4 className={styles.subtitle}>SELECCIONA TU OBJETIVO DE NEGOCIO</h4>
              <p className={styles.paragraph}>
                Selecciona el objetivo de negocio que quieras lograr entre Visibilidad de marca, Clics al sitio web o Reproducciones de Audio / Video.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.image}>
          <Image src={user} />
        </div>
      </div>
    </section>
  )
}

export default aboutAs
