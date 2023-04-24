import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FeedContentCard from '../components/FeedContentCard.jsx';
import { openAlert } from '../store/alert.js';
import useGetContentFeeds from '../hooks/useGetContentFeeds.jsx';
import useInfiniteScroll from '../hooks/useInfiniteScroll.jsx';

export default function Home() {
  const dispatch = useDispatch()

  const {data, total, error, isLoading, onLoadMore,
  } = useGetContentFeeds()

  const [contents, setContents] = useState([])

  const {rootRef, targetRef, hasMore} = useInfiniteScroll({
    records: contents,
    total,
    isLoading,
    onLoadMore,
  })

  useEffect(() => {
    setContents(contents.concat(data))
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
      message: 'An error occurred while fetching feeds',
    }))
  }, [error])

  return (
    <Box
      ref={rootRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        overflowY: 'scroll',
      }}
    >
      <Grid container spacing={2} maxWidth="xl">
        {contents.map(content => (
          <Grid key={content.id} sm={12} md={6} lg={4} xl={3}>
            <FeedContentCard content={content}/>
          </Grid>
        ))}
      </Grid>

      {hasMore && <CircularProgress ref={targetRef}/>}
    </Box>
  )
}
