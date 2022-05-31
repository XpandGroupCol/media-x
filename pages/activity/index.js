import { Avatar, Typography } from '@mui/material'
import styles from './activity.module.css'
const Activity = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7].map(id => (
        <div key={id} className={styles.activityCard}>

          <div className={styles.userInformation}>
            <Avatar>DI</Avatar>
            <div>
              <Typography fontSize='15px' fontWeight='bold'>Diego Contreras</Typography>
              <Typography fontSize='13px'>10/12/2022</Typography>
            </div>
          </div>
          <div>
            <Typography fontSize='14px'>For example, we are still implementing the same "Load More" UI, but also need to display a number about how many items are there in total. We can't use the</Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Activity
