import useSWR from 'swr'
import { Skeleton } from '@mui/material'
import { BASE_URL } from 'utils/config'
import Card from './card'
import styles from './list.module.css'

const ListCards = () => {
  const { data = {}, error } = useSWR(`${BASE_URL}/campaigns/byUser`)

  const { data: campaigns } = data

  if (!campaigns && !error) return [1, 2, 3, 4, 5, 6, 7, 8].map((el) => <Skeleton key={el} className={styles.skeleton} />)

  if (error) return <p>error</p>

  if (campaigns.length === 0) return <p>No hay datos</p>

  return (
    <>
      {campaigns?.map((campaign, index) =>
        <Card key={campaign?.id} {...{ ...campaign, percentage: (index + 1) * 20 }} />
      )}
    </>

  )
}

export default ListCards
