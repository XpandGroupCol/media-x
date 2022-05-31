import useSWR from 'swr'
import { GET_PROFILE_URL } from 'utils/config'

const useGetProfile = () => {
  const { data, error } = useSWR(GET_PROFILE_URL)

  return {
    isLoading: !data && !error,
    error,
    user: data?.data || null
  }
}

export default useGetProfile
