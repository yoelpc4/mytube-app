import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2'
import useGetPublishedContents from '../hooks/useGetPublishedContents.jsx';
import PublishedContentCard from './PublishedContentCard.jsx';
import { openAlert } from '../store/alert.js';

export default function PublishedContentCards() {
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
    <Grid container spacing={2}>
      {contents.map(content => (
        <Grid key={content.id} sm={12} md={6} lg={4} xl={3}>
          <PublishedContentCard content={content}/>
        </Grid>
      ))}
    </Grid>
  )
}
