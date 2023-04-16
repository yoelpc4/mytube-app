import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import ChannelContentCard from './ChannelContentCard.jsx';
import ChannelService from '../services/ChannelService.js';
import useGetChannelContents from '../hooks/useGetChannelContents.jsx';
import { openAlert } from '../store/alert.js';

const channelService = new ChannelService()

export default function ChannelContentCards({ channelId }) {
  const dispatch = useDispatch()

  const { data, dataCount, error, isLoading, onLoadMore } = useGetChannelContents(channelId)

  const [contents, setContents] = useState([])

  const hasMoreContents = useMemo(() => contents.length === dataCount, [contents, dataCount])

  useEffect(() => {
    setContents([
      ...contents,
      ...data,
    ])
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
    <Grid container spacing={2} maxWidth="xl" sx={{ mx: 6 }}>
      {contents.map(content => (
        <Grid key={content.id} sm={6} md={4} lg={3} xl={2}>
          <ChannelContentCard content={content}/>
        </Grid>
      ))}
    </Grid>
  )
}
