import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { openAlert } from '@/store/alert.js'
import ChannelContentCard from '@/components/ChannelContentCard.jsx'
import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx'

function ChannelContentCards({channel}) {
  const dispatch = useDispatch()

  const {ref, records: contents, error, hasMoreRecords} = useInfiniteScroll(`channels/${channel.id}/contents`, {
    take: 12,
  })

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching channel contents',
    }))
  }, [dispatch, error])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Grid container spacing={2} maxWidth="xl">
        {contents.map(content => (
          <Grid key={content.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <ChannelContentCard channel={channel} content={content}/>
          </Grid>
        ))}
      </Grid>

      {hasMoreRecords && <CircularProgress ref={ref}/>}
    </Box>
  )
}

ChannelContentCards.propTypes = {
  channelId: PropTypes.number,
}

export default ChannelContentCards
