import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { openAlert } from '@/store/alert.js';
import { selectUser } from '@/store/auth.js';
import { transformValidationErrors } from '@/helpers.js';
import client from '@/utils/client.js';

export default function ButtonSubscribe({ channel, onSubscribed, onUnsubscribed }) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const user = useSelector(selectUser)

  const [hasSubscribed, setHasSubscribed] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!Array.isArray(channel?.channelSubscriptions) || !channel?.channelSubscriptions.length) {
      return
    }

    setHasSubscribed(channel.channelSubscriptions[0].subscriberId === user?.id)
  }, [channel?.channelSubscriptions])

  async function onToggleSubscription() {
    if (isLoading) {
      return
    }

    if (!user) {
      navigate('/login', {
        state: {
          from: location.pathname,
        },
      })

      return
    }

    setIsLoading(true)

    try {
      if (hasSubscribed) {
        await client.post(`channels/${channel.id}/unsubscribe`)

        setHasSubscribed(false)

        onUnsubscribed()
      } else {
        await client.post(`channels/${channel.id}/subscribe`)

        setHasSubscribed(true)

        onSubscribed()
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      const response = error.response

      if (response.status === 400) {
        const errors = transformValidationErrors(response)

        dispatch(openAlert({
          type: 'error',
          message: `${errors.id}`
        }))

        return
      }

      dispatch(openAlert({
        type: 'error',
        message: `An error occurred while ${hasSubscribed ? 'unsubscribing' : 'subscribing'}`
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="contained"
      disabled={isLoading}
      sx={{
        borderRadius: '20px',
        background: (theme) => hasSubscribed ? theme.palette.grey[200] : '#000',
        color: hasSubscribed ? '#000' : '#fff',
        textTransform: 'inherit',
        '&:hover': {
          background: (theme) => hasSubscribed ? theme.palette.grey[300] : theme.palette.grey[900],
        },
    }}
      onClick={onToggleSubscription}
    >
      {hasSubscribed && <NotificationsOutlinedIcon />}
      {hasSubscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  )
}
