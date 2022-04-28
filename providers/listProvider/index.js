
import { createContext, useContext } from 'react'
import useSWR from 'swr'

const ListContext = createContext()

const ListProvider = ({ children }) => {
  const { data = {} } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/lists`)
  return (
    <ListContext.Provider value={{ ...data }}>
      {children}
    </ListContext.Provider>
  )
}

export const useLists = () => useContext(ListContext)

export default ListProvider
