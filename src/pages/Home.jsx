import Grid from '@mui/material/Unstable_Grid2'
import PublishedContentCards from '../components/PublishedContentCards.jsx';

export default function Home() {
  return (
    <Grid container rowSpacing={5} maxWidth="xl" sx={{ mx: 4 }}>
      <Grid xs={12}>
        <PublishedContentCards />
      </Grid>
    </Grid>
  )
}
