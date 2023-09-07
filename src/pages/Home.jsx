import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { openAlert } from '@/store/alert.js'
import FeedContentCard from '@/components/FeedContentCard.jsx'
import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx'

export default function Home() {
  const dispatch = useDispatch()

  const {ref, records: contents, error, hasMoreRecords} = useInfiniteScroll('contents/feeds', {
    take: 12,
  })

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching feeds',
    }))
  }, [dispatch, error])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Grid container rowSpacing={2} maxWidth="xl">
        {contents.map(content => (
          <Grid key={content.id} xs={12} sm={6} md={4} lg={3}>
            <FeedContentCard content={content}/>
          </Grid>
        ))}
      </Grid>

      {hasMoreRecords && <CircularProgress ref={ref}/>}
    </Box>
  )
}
