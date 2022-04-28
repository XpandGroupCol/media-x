import styles from './actionSection.module.css'
import mac from 'public/images/mac.png'
import Image from 'next/image'
const ActionSection = () => {
  return (
    <div className={styles.actionSection}>
      <div className={styles.container}>
        <h3 className={styles.title}>¿qué estás esperando?</h3>
        <div className={styles.content}>
          <div className={styles.information}>
            <p className={styles.text}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className={styles.button}>
              comienza ahora
            </button>
          </div>
          <div className={styles.imageContainer}>
            <Image src={mac} className={styles.image} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActionSection
