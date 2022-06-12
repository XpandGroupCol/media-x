
import ProfileForm from 'components/profileForm'
import ProfileSkeleton from 'components/profileForm/profileSkeleton'
import useGetProfile from 'hooks/useGetProfile'

const Profile = () => {
  const { user, error, isLoading } = useGetProfile()

  if (isLoading) return <ProfileSkeleton />

  if (error) return <p>Error page</p>

  return (
    <ProfileForm user={user} />
  )
}

export default Profile
