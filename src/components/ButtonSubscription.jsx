import PropTypes from 'prop-types'
import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { openAlert } from '@/store/alert.js'
import { selectUser } from '@/store/auth.js'
import useAsync from '@/hooks/useAsync.jsx'
import client from '@/utils/client.js'
import { transformServerErrors } from '@/utils/helpers.js'

function ButtonSubscription({channel, hasSubscribed, onSubscribed, onUnsubscribed}) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const user = useSelector(selectUser)

  const {error, isLoading, isSuccess, run} = useAsync()

  const [state, setState] = useReducer((state, action) => {
    switch (action) {
      case 'subscribe':
        return {
          acting: 'subscribing',
          callback: onSubscribed,
        }
      case 'unsubscribe':
        return {
          acting: 'unsubscribing',
          callback: onUnsubscribed,
        }
      default:
        throw new Error('Unsupported action')
    }
  },null)

  const handleToggleSubscription = () => {
    if (!user) {
      navigate('/login', {
        state: {
          from: location.pathname,
        },
      })

      return
    }

    if (isLoading) {
      return
    }

    const action = hasSubscribed ? 'unsubscribe' : 'subscribe'

    setState(action)

    run(client.post(`channels/${channel.id}/${action}`))
  }

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    state.callback()
  }, [isSuccess, state])

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
      message: `An error occurred while ${state.acting}`,
    }))
  }, [dispatch, error, state])

  return user?.id !== channel.id && (
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
      Subscribe{hasSubscribed ? 'd' : ''}
    </Button>
  )
}

ButtonSubscription.propTypes = {
  channel: PropTypes.object,
  hasSubscribed: PropTypes.bool,
  onSubscribed: PropTypes.func,
  onUnsubscribed: PropTypes.func,
}

export default ButtonSubscription
