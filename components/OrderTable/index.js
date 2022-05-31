import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { getFormatedNumber } from 'utils/transformData'

const OrderTable = ({
  data = [], target, grossValue,
  serviceFee, total
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 800 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell width='20%'>Medio</TableCell>
            <TableCell width='20%'>Objetivo publicitario</TableCell>
            <TableCell width='20%'>Formato</TableCell>
            <TableCell width='10%'>Share</TableCell>
            <TableCell width='10%'>Costo por objetivo</TableCell>
            <TableCell width='10%'>KPI</TableCell>
            <TableCell width='10%'>Tipo de compra</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ rowId, label, objectiveGoal, biddingModel, pricePerUnit, share, publisher }) => (
            <TableRow
              key={rowId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{publisher}</TableCell>
              <TableCell>{label}</TableCell>
              <TableCell>{target}</TableCell>
              <TableCell>{share}%</TableCell>
              <TableCell>${getFormatedNumber(pricePerUnit)}</TableCell>
              <TableCell>{getFormatedNumber(objectiveGoal)}</TableCell>
              <TableCell>{biddingModel}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={5} />
            <TableCell>Valor bruto</TableCell>
            <TableCell align='right'>${getFormatedNumber(grossValue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} />
            <TableCell>Inpuesto de plataforma</TableCell>

            <TableCell align='right'>${getFormatedNumber(serviceFee)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} />
            <TableCell>Total</TableCell>
            <TableCell align='right'>${getFormatedNumber(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderTable
