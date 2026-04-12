import styles from './layout.module.css'
import Grid from '@mui/material/Grid'

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Grid
      container
      justifyContent="center"
      className={styles.container}
    >
      {children}
    </Grid>
  )
}
