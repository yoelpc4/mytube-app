import Grid from '@mui/material/Unstable_Grid2'
import { useDispatch } from 'react-redux';
import useGetPublishedContents from '../hooks/useGetPublishedContents.jsx';
import { useEffect, useMemo, useState } from 'react';
import { openAlert } from '../store/alert.js';
import HomeContent from '../components/HomeContent.jsx';

export default function Home() {
  const dispatch = useDispatch()

  const {
    data,
    dataCount,
    error,
    isLoading,
    onLoadMore,
  } = useGetPublishedContents()

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
        message: 'An error occurred while fetching contents',
      }))
    }
  }, [error])

  return (
    <Grid container rowSpacing={5} maxWidth="xl" sx={{ mx: 4 }}>
      <Grid xs={12}>
        <Grid container spacing={2}>
          {contents.map(content => (
            <Grid key={content.id} sm={12} md={6} lg={4} xl={3}>
              <HomeContent content={content}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
