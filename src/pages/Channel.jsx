import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { openAlert } from '@/store/alert.js'
import ChannelContentCards from '@/components/ChannelContentCards.jsx'
import ButtonSubscription from '@/components/ButtonSubscription.jsx'
import useAsync from '@/hooks/useAsync.jsx'
import useChannel from '@/hooks/useChannel.jsx'
import client from '@/utils/client.js'

export default function Channel() {
  const dispatch = useDispatch()

  const {username} = useParams()

  const {data, error, run} = useAsync()

  const {
    channel,
    hasSubscribed,
    subscribersCount,
    contentsCount,
    setChannel,
    handleSubscribed,
    handleUnsubscribed,
  } = useChannel()

  useEffect(() => {
    const controller = new AbortController()

    run(client.get(`channels/${username}`, {
      signal: controller.signal,
    }).then(({data}) => data))

    return () => controller.abort()
  }, [run, username])

  useEffect(() => {
    if (!data) {
      return
    }

    setChannel(data)
  }, [data, setChannel])

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching channel',
    }))
  }, [dispatch, error])

  return channel && (
    <Box sx={{display: 'flex', flexDirection: 'column', rowGap: 3}}>
      <Box
        sx={{
          backgroundImage: "url('https://picsum.photos/1920/1080')",
          height: '240px',
          margin: 0,
        }}
      />

      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 6}}>
        <Box sx={{display: 'flex', alignItems: 'center', columnGap: 2}}>
          <Avatar alt="avatar" src="https://i.pravatar.cc/200" sx={{width: 120, height: 120}}/>

          <Box>
            <Typography component="h2" variant="h6">
              {channel.name}
            </Typography>

            <Typography>
              <strong>@{channel.username}</strong> {subscribersCount || 'No'} subscriber{subscribersCount === 1 ? '' : 's'} {contentsCount || 'No'} video{contentsCount === 1 ? '' : 's'}
            </Typography>
          </Box>
        </Box>

        <ButtonSubscription
          channel={channel}
          hasSubscribed={hasSubscribed}
          onSubscribed={handleSubscribed}
          onUnsubscribed={handleUnsubscribed}
        />
      </Box>

      <ChannelContentCards channelId={channel.id}/>
    </Box>
  )
}
