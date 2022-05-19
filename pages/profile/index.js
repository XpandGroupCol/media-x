import styles from './profile.module.css'

import useSWR from 'swr'

import Typography from 'components/typography'
import { Avatar } from '@mui/material'
import Button from 'components/button'
import { useState } from 'react'
import ChangePassword from 'components/changePassword'
import CompanyProfile from 'components/companyProfile'
import { BASE_URL } from 'utils/config'

const getCompany = ({
  address,
  company,
  companyEmail,
  nit,
  phone,
  phonePrefixed,
  rut
}) => ({
  address,
  company,
  companyEmail,
  nit,
  phone,
  phonePrefixed,
  rut
})

const Profile = () => {
  const { data = {}, error } = useSWR(`${BASE_URL}/users/profile`)
  const { data: user } = data

  const [showModal, setShowModal] = useState(false)

  const [showCompanyModal, setShowCompanyModal] = useState(false)

  const handleSetShowModal = () => {
    setShowModal(true)
  }

  const handleSetCloseModal = () => {
    setShowModal(false)
  }

  const handlesetShowCompanyModal = () => {
    setShowCompanyModal(true)
  }

  const handleSetClosesetCompanyModal = () => {
    setShowCompanyModal(false)
  }

  if (!user && !error) return <p>loading...</p>

  return (
    <section className={styles.profile}>
      <Avatar src={user?.avatar} sx={{ width: '100px', height: '100px' }} />
      <Typography className={styles.name}>{user?.fullName}</Typography>
      <Typography className={styles.email}>{user?.email}</Typography>
      <Typography className={styles.role}>{user?.role?.label}</Typography>
      <Button size='small' onClick={handleSetShowModal}>Cambiar contraseña</Button>
      <ChangePassword open={showModal} onClose={handleSetCloseModal} onSubmit={handleSetCloseModal} />

      <Button size='small' onClick={handlesetShowCompanyModal}>Actualizar perfil de empresa</Button>
      <CompanyProfile profile={getCompany(user)} open={showCompanyModal} onClose={handleSetClosesetCompanyModal} onSubmit={handleSetClosesetCompanyModal} />
    </section>
  )
}

export default Profile
