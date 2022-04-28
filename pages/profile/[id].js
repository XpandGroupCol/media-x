import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

const Profile = () => {
  const { query, replace } = useRouter()

  const path = query?.id ? `${process.env.NEXT_PUBLIC_BASE_URL}/users/${query?.id}` : null

  const { data, error } = useSWR(path)

  return (
    <h1>{JSON.stringify(data, null, 2)}</h1>
  )
}

export default Profile
