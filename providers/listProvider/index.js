
import { createContext, useContext } from 'react'
import useSWR from 'swr'
import { BASE_URL } from 'utils/config'

const ListContext = createContext()

const ListProvider = ({ children }) => {
  const { data = {} } = useSWR(`${BASE_URL}/lists`)
  return (
    <ListContext.Provider value={{ ...data }}>
      {children}
    </ListContext.Provider>
  )
}

export const useLists = () => useContext(ListContext)

export default ListProvider
