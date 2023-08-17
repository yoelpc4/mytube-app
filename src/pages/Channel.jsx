import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { openAlert } from '@/store/alert.js'
import { selectUser } from '@/store/auth.js'
import ChannelContentCards from '@/components/ChannelContentCards.jsx'
import ButtonSubscribe from '@/components/ButtonSubscribe.jsx'
import useAsync from '@/hooks/useAsync.jsx'
import useChannel from '@/hooks/useChannel.jsx'
import client from '@/utils/client.js'

export default function Channel() {
  const dispatch = useDispatch()

  const {username} = useParams()

  const user = useSelector(selectUser)

  const {data: channel, error, run, setData} = useAsync()

  const {countSubscribers, countContents} = useChannel(channel)

  useEffect(() => {
    const controller = new AbortController()

    run(client.get(`channels/${username}`, {
      signal: controller.signal,
    }).then(({data}) => data))

    return () => controller.abort()
  }, [run, username])

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching channel',
    }))
  }, [dispatch, error])

  function onSubscribed() {
    setData({
      ...channel,
      countChannelSubscriptions: channel.countChannelSubscriptions + 1,
    })
  }

  function onUnsubscribed() {
    setData({
      ...channel,
      countChannelSubscriptions: channel.countChannelSubscriptions - 1,
    })
  }

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
              <strong>@{channel.username}</strong> {countSubscribers || 'No'} subscriber{countSubscribers === 1 ? '' : 's'} {countContents || 'No'} video{countContents === 1 ? '' : 's'}
            </Typography>
          </Box>
        </Box>

        {user.id !== channel.id && (
          <ButtonSubscribe channel={channel} onSubscribed={onSubscribed} onUnsubscribed={onUnsubscribed}/>
        )}
      </Box>

      <ChannelContentCards channelId={channel.id}/>
    </Box>
  )
}
