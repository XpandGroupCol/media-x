import { IconButton, Skeleton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../rows.module.css'

export const HEADERS = ['Nombre',
  'Correo',
  'rol',
  'auth',
  'Compañia',
  'estado',
  'acciones']
const UserRow = ({ loading, row, onUpdate, onDelete }) => {
  return (
    loading
      ? (
        <tr>
          <td width='20%'> <Skeleton variant='rectangular' width={150} height={34} /></td>
          <td width='20%'> <Skeleton variant='rectangular' width={120} height={34} /></td>
          <td width='10%'> <Skeleton variant='rectangular' width={90} height={34} /></td>
          <td width='10%'> <Skeleton variant='rectangular' width={80} height={34} /></td>
          <td width='20%'> <Skeleton variant='rectangular' width={60} height={34} /></td>
          <td width='10%'> <Skeleton variant='rectangular' width={50} height={34} /></td>
          <td width='10%'>
            <div className={styles.actions}>
              <Skeleton variant='rectangular' width={100} height={34} />
            </div>
          </td>
        </tr>
        )
      : (
        <tr>
          <td width='20%'>{`${row.name} ${row.lastName}`}</td>
          <td width='20%'>{row.email}</td>
          <td width='10%'>{row.role?.label}</td>
          <td width='10%'>{row.provider}</td>
          <td width='20%'>{row?.company}</td>
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

export default UserRow
