import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2'
import FeedContentCard from '../components/FeedContentCard.jsx';
import useGetContentFeeds from '../hooks/useGetContentFeeds.jsx';
import { openAlert } from '../store/alert.js';

export default function Home() {
  const dispatch = useDispatch()

  const {
    data,
    dataCount,
    error,
    isLoading,
    onLoadMore,
  } = useGetContentFeeds()

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
      message: 'An error occurred while fetching feeds',
    }))
  }, [error])

  return (
    <Grid container spacing={2} maxWidth="xl">
      {contents.map(content => (
        <Grid key={content.id} sm={12} md={6} lg={4} xl={3}>
          <FeedContentCard content={content}/>
        </Grid>
      ))}
    </Grid>
  )
}
