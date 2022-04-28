import useSWR from 'swr'

const useLists = () => {
  const { data = {} } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/lists`)

  return {
    ...data
  }
}

export default useLists
