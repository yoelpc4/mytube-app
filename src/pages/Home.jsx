import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2'
import ContentFeed from '../components/ContentFeed.jsx';
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
    if (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while fetching feeds',
      }))
    }
  }, [error])

  return (
    <Grid container rowSpacing={5} maxWidth="xl" sx={{ mx: 4 }}>
      <Grid xs={12}>
        <Grid container spacing={2}>
          {contents.map(content => (
            <Grid key={content.id} sm={12} md={6} lg={4} xl={3}>
              <ContentFeed content={content}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
