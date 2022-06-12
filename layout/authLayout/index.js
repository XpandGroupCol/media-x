import Typography from 'components/typography'
import styles from './auth.module.css'

const AuthLayout = ({ onSubmit, title, children }) => {
  return (
    <div className={styles.login}>
      <div className={styles.containerForm}>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.titleContainer}>
            <h3>SHAREFLOW</h3>
            <p>Bienvenido, {title}</p>
          </div>

          {children}
        </form>
        <div className={styles.support}>
          <Typography>Si necesitas que te rescatemos, escribemos a </Typography>
          <a href='mailto:support@mediax.com'>support@mediax.com</a>
        </div>
      </div>
      <div className={styles.picture} />
    </div>
  )
}

export default AuthLayout
