
import styles from './profile.module.css'
import Skeleton from 'components/skeleton'

const ProfileSkeleton = () => {
  return (
    <section className={styles.profile}>
      <div className={styles.avatar}>
        <Skeleton sx={{ width: 100, height: 100, borderRadius: '100%' }} />
      </div>
      <form className={styles.profileForm}>
        <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />
        <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />
        <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />

        <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />
        <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />
        <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />
        <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />
        <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />

        <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />

        <div className={styles.buttons}>
          <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />
          <Skeleton sx={{ width: '100%', height: 40, borderRadius: '10px' }} />
        </div>
      </form>
    </section>
  )
}

export default ProfileSkeleton
