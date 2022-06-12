import MuiSkeleton from '@mui/material/Skeleton'

const Skeleton = ({ sx, ...props }) => <MuiSkeleton sx={{ transform: 'scale(1)', ...sx }} {...props} />

export default Skeleton
