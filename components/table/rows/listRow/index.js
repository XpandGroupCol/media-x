import { IconButton, Skeleton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../rows.module.css'

export const HEADERS = [
  'Objetivo',
  'User',
  'Estado',
  'Acciones'
]
const ListRow = ({ loading, row, onUpdate, onDelete }) => {
  return (
    loading
      ? (
        <tr>
          <td width='50%'> <Skeleton variant='rectangular' width={150} height={34} /></td>
          <td width='30%'> <Skeleton variant='rectangular' width={120} height={34} /></td>
          <td width='10%'> <Skeleton variant='rectangular' width={90} height={34} /></td>
          <td width='10%'> <Skeleton variant='rectangular' width={80} height={34} /></td>
        </tr>
        )
      : (
        <tr>
          <td width='50%'>{row.name}</td>
          <td width='30%'>{row?.user || ''}</td>
          <td width='10%'>{row?.status ? 'Activo' : 'Inactivo'}</td>
          <td width='10%'>
            <div className={styles.actions}>
              <IconButton size='small' onClick={onUpdate}>
                <EditIcon />
              </IconButton>
              <IconButton size='small' onClick={onDelete} disabled={!row?.status}>
                <DeleteIcon />
              </IconButton>
            </div>
          </td>
        </tr>
        )
  )
}

export default ListRow
