import useSWR from 'swr'
import { BASE_URL } from 'utils/config'

const useLists = () => {
  const { data = {} } = useSWR(`${BASE_URL}/lists`)

  return {
    ...data
  }
}

export default useLists
