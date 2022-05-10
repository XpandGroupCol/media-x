import { Avatar } from '@mui/material'
import Typography from 'components/typography'
import useSWR from 'swr'
import styles from './profile.module.css'
import CompanyForm from 'components/companyForm'
import ChangePassword from 'components/ChangePassword'
import { BASE_URL } from 'utils/config'
import { getCompanyValues } from 'utils/transformData'

const Profile = () => {
  const { data = {}, error } = useSWR(`${BASE_URL}/users/profile`)
  const { data: user } = data

  if (!user && !error) return <p>loading</p>

  return (
    <section className={styles.profile}>
      <div className={styles.information}>
        {user?.image
          ? <Avatar src={user?.image} sx={{ width: 100, height: 100 }} />
          : <Avatar sx={{ width: 100, height: 100 }}>{user?.name?.slice(0, 2)?.toUpperCase()}</Avatar>}

        <Typography component='h3'>{user.fullName}</Typography>
        <Typography component='h4'>{user.email}</Typography>
        <Typography>{user.role.label}</Typography>
        <div className={styles.containerForm}>
          <ChangePassword />
        </div>
        <CompanyForm company={getCompanyValues(user)} />
      </div>
    </section>
  )
}

export default Profile
