import Grid from '@mui/material/Unstable_Grid2'
import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { openAlert } from '../store/alert.js';
import HistoryContentCard from '../components/HistoryContentCard.jsx';
import useGetContentHistories from '../hooks/useGetContentHistories.jsx';

export default function History() {
  const dispatch = useDispatch()

  const {
    data,
    dataCount,
    error,
    isLoading,
    onLoadMore,
  } = useGetContentHistories()

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
      message: 'An error occurred while fetching histories',
    }))
  }, [error])

  return (
    <Grid container rowSpacing={2} maxWidth="xl">
      {contents.map(content => (
        <Grid key={content.id}>
          <HistoryContentCard content={content}/>
        </Grid>
      ))}
    </Grid>
  )
}
