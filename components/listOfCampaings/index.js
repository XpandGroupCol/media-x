import Link from 'next/link'
import { useAtom } from 'jotai'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import CampaignCard from 'components/campaignCard'
import CardSkeleton from 'components/campaignCard/cardSkeleton'
import Typography from 'components/typography'
import { campaignAtom, InitCampaignState } from 'globalState/campaignAtom'
import styles from './listOfCampaings.module.css'

const ListOfCampaings = ({ data, isLoading }) => {
  const [, updateCampaign] = useAtom(campaignAtom)

  return (
    <div className={styles.campaignsPage}>

      <Link href='/new-campaign'>
        <IconButton
          onClick={() => updateCampaign({ ...InitCampaignState })}
          component='a' size='large' sx={{
            position: 'fixed',
            background: '#5b27ed',
            bottom: '30px',
            zIndex: 100,
            right: '30px',
            boxShadow: '0 4px 12px rgb(0 0 0 / 10%)',
            '&:hover': {
              background: '#5327d1'
            }
          }}
        >
          <AddIcon fontSize='large' sx={{ color: 'white' }} />
        </IconButton>
      </Link>

      {
         data.length > 0
           ? (
             <div className={styles.listOfCards}>
               {data.map((campaign, index) => (
                 <div className={styles.card} key={campaign.id || index}>
                   {isLoading ? <CardSkeleton /> : <CampaignCard {...campaign} />}
                 </div>
               ))}
             </div>
             )
           : (
             <div className={styles.empty}>
               <Typography>Aun no se han creado campañas</Typography>
             </div>)
}
    </div>
  )
}

export default ListOfCampaings
