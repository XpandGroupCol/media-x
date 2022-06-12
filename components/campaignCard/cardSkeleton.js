import Skeleton from 'components/skeleton'
import Typography from 'components/typography'
import styles from './campaigns.module.css'

const CardSkeleton = () => {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <Skeleton sx={{ width: 80, height: 80, borderRadius: '100%', marginBottom: '20px' }} />
        <Skeleton sx={{ width: 120, height: 16, marginBottom: '10px' }} />
        <Skeleton sx={{ width: 120, height: 16, marginBottom: '10px' }} />
        <div className={styles.date}>
          <Skeleton sx={{ width: 80, height: 16, marginBottom: '10px' }} />
          <Typography> - </Typography>
          <Skeleton sx={{ width: 80, height: 16, marginBottom: '10px' }} />
        </div>
        <Skeleton sx={{ width: 120, height: 16, marginBottom: '20px' }} />

      </header>
      <div className={styles.body}>
        <div className={styles.row}>
          <Skeleton sx={{ width: '100%', height: 20, marginBottom: '10px' }} />
        </div>
        <div className={styles.row}>
          <Skeleton sx={{ width: '100%', height: 20, marginBottom: '10px' }} />
        </div>
        <div className={styles.row}>
          <Skeleton sx={{ width: '100%', height: 20, marginBottom: '10px' }} />
        </div>

      </div>
      <footer className={styles.footer}>
        <Skeleton sx={{ width: 150, height: 30 }} />
      </footer>
    </div>
  )
}

export default CardSkeleton
