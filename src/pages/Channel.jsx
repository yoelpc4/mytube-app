import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ChannelContentCards from '../components/ChannelContentCards.jsx';
import useFindChannel from '../hooks/useFindChannel.jsx';
import useChannel from '../hooks/useChannel.jsx';
import { openAlert } from '../store/alert.js';
import ButtonSubscribe from '../components/ButtonSubscribe.jsx';

export default function Channel() {
  const dispatch = useDispatch()

  const {username} = useParams()

  const {data: channel, error, isLoading, setData} = useFindChannel(username)

  const {countSubscribers, countContents} = useChannel(channel)

  useEffect(() => {
    if (!error) {
      return
    }

    if (import.meta.env.DEV) {
      console.log(error)
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching channel',
    }))
  }, [error])

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
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
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

        <ButtonSubscribe channel={channel} onSubscribed={onSubscribed} onUnsubscribed={onUnsubscribed}/>
      </Box>

      <ChannelContentCards channelId={channel.id}/>
    </Box>
  )
}
