import styles from "./Campaigns.module.css";
import Grid from "@mui/material/Grid";

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid container justifyContent="center" className={styles.container}>
      <Grid item className={styles.content}>
        {children}
      </Grid>
    </Grid>
  );
}
