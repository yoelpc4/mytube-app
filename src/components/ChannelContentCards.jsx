import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ChannelContentCard from './ChannelContentCard.jsx';
import { openAlert } from '../store/alert.js';
import useGetChannelContents from '../hooks/useGetChannelContents.jsx';
import useInfiniteScroll from '../hooks/useInfiniteScroll.jsx';

export default function ChannelContentCards({channelId}) {
  const dispatch = useDispatch()

  const {data, total, error, isLoading, onLoadMore} = useGetChannelContents(channelId)

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
      message: 'An error occurred while fetching channel contents',
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
      <Grid container spacing={2} maxWidth="xl" sx={{mx: 6}}>
        {contents.map(content => (
          <Grid key={content.id} sm={6} md={4} lg={3} xl={2}>
            <ChannelContentCard content={content}/>
          </Grid>
        ))}
      </Grid>

      {hasMore && <CircularProgress ref={targetRef}/>}
    </Box>
  )
}
