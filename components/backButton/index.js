import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Link from 'next/link'

const BackButton = ({ href, onBack }) => {
  return (
    <Link href={href}>
      <IconButton component='a' onClick={onBack}>
        <ArrowBackIosNewIcon />
      </IconButton>
    </Link>
  )
}

export default BackButton
