import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import HistoryContentCard from '../components/HistoryContentCard.jsx';
import { openAlert } from '../store/alert.js';
import useGetContentHistories from '../hooks/useGetContentHistories.jsx';
import useInfiniteScroll from '../hooks/useInfiniteScroll.jsx';

export default function History() {
  const dispatch = useDispatch()

  const {data, total, error, isLoading, onLoadMore} = useGetContentHistories()

  const [contentViews, setContentViews] = useState([])

  const {ref, hasMore} = useInfiniteScroll({
    records: contentViews,
    total,
    isLoading,
    onLoadMore,
  })

  useEffect(() => {
    setContentViews(contentViews.concat(data))
  }, [data])

  useEffect(() => {
    if (!error) {
      return
    }

    if (import.meta.env.DEV) {
      console.log(error)
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching histories',
    }))
  }, [error])

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

      {hasMore && <CircularProgress ref={ref}/>}
    </Box>
  )
}
