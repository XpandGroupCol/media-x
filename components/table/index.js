import { Pagination } from '@mui/material'
import NoData from 'components/noData'
import styles from './table.module.css'

const Table = ({ children, pages, currentPage, onChangePage, headers, error, noData }) => {
  if (noData || error) {
    return (
      <div className={styles.tableContainer}>
        <NoData error={error} />
      </div>
    )
  }

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        {Boolean(pages) && <Pagination count={pages} variant='outlined' color='primary' page={currentPage} onChange={onChangePage} />}
      </div>
    </>
  )
}

export default Table
