import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { openAlert } from '@/store/alert.js'
import { selectUser } from '@/store/auth.js'
import useAsync from '@/hooks/useAsync.jsx'
import client from '@/utils/client.js'
import { transformServerErrors } from '@/utils/helpers.js'

function ButtonSubscribe({channel, onSubscribed, onUnsubscribed}) {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const [hasSubscribed, setHasSubscribed] = useState(false)

  const {error, isLoading, run} = useAsync()

  const handleToggleSubscription = () => {
    if (isLoading) {
      return
    }

    if (hasSubscribed) {
      run(
        client.post(`channels/${channel.id}/unsubscribe`)
          .then(() => {
            setHasSubscribed(false)

            onUnsubscribed()
          })
      )

      return
    }

    run(
      client.post(`channels/${channel.id}/subscribe`)
        .then(() => {
          setHasSubscribed(true)

          onSubscribed()
        })
    )
  }

  useEffect(() => {
    if (!Array.isArray(channel?.channelSubscriptions) || !channel?.channelSubscriptions.length) {
      return
    }

    setHasSubscribed(channel.channelSubscriptions[0].subscriberId === user?.id)
  }, [channel, user])

  useEffect(() => {
    if (!error) {
      return
    }

    const {response} = error

    if (response) {
      if (response.status === 400) {
        const errors = transformServerErrors(response.data.errors)

        dispatch(openAlert({
          type: 'error',
          message: errors.id
        }))

        return
      }
    }

    dispatch(openAlert({
      type: 'error',
      message: `An error occurred while ${hasSubscribed ? 'unsubscribing' : 'subscribing'}`
    }))
  }, [dispatch, error, hasSubscribed])

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
      onClick={handleToggleSubscription}
    >
      {hasSubscribed && <NotificationsOutlinedIcon/>}
      {hasSubscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  )
}

ButtonSubscribe.propTypes = {
  channel: PropTypes.object,
  onSubscribed: PropTypes.func,
  onUnsubscribed: PropTypes.func,
}

export default ButtonSubscribe
