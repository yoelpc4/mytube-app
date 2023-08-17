import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { openAlert } from '@/store/alert.js'
import HistoryContentCard from '@/components/HistoryContentCard.jsx'
import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx'

export default function History() {
  const dispatch = useDispatch()

  const {ref, records: contentViews, error, hasMoreRecords} = useInfiniteScroll('contents/histories', {
    take: 15,
  })

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching histories',
    }))
  }, [dispatch, error])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
        overflowY: 'scroll',
      }}
    >
      <Grid container rowSpacing={2} maxWidth="xl">
        {contentViews.map(contentView => (
          <Grid key={contentView.id} xs={12}>
            <HistoryContentCard content={contentView.content}/>
          </Grid>
        ))}
      </Grid>

      {hasMoreRecords && <CircularProgress ref={ref}/>}
    </Box>
  )
}
