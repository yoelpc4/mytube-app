import PropTypes from 'prop-types'
import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import Button from '@mui/material/Button'
import { openAlert } from '@/store/alert.js'
import { selectUser } from '@/store/auth.js'
import useAsync from '@/hooks/useAsync.jsx';
import client from '@/utils/client.js'

function ButtonsExpression(
  {
    contentId,
    likesCount,
    dislikesCount,
    isLiked,
    isDisliked,
    onLiked,
    onDisliked
  }
) {
  const dispatch = useDispatch()

  const location = useLocation()

  const navigate = useNavigate()

  const user = useSelector(selectUser)

  const {error, isLoading, isSuccess, run} = useAsync()

  const [state, setState] = useReducer((state, action) => {
    switch (action) {
      case 'like':
        return {
          acting: 'liking',
          callback: onLiked,
        }
      case 'dislike':
        return {
          acting: 'disliking',
          callback: onDisliked,
        }
      default:
        throw new Error('Unsupported action')
    }
  },null)

  const handleLike = async () => {
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

    setState('like')

    run(client.post(`contents/${contentId}/like`))
  }

  const handleDislike = async () => {
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

    setState('dislike')

    run(client.post(`contents/${contentId}/dislike`))
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

    dispatch(openAlert({
      type: 'error',
      message: `An error occurred while ${state.acting}`,
    }))
  }, [dispatch, error, state])

  return (
    <Box sx={{display: 'flex'}}>
      <Button
        disabled={isLoading}
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: .5,
          background: (theme) => theme.palette.grey[200],
          color: 'black',
          borderRight: '1px solid #e3e3e3',
          borderRadius: '10px 0 0 10px',
          py: 1,
          px: 2,
          '&:hover': {
            background: (theme) => theme.palette.grey[300],
          },
        }}
        onClick={handleLike}
      >
        {isLiked && <ThumbUpIcon/>}

        {!isLiked && <ThumbUpOutlinedIcon/>}

        {likesCount > 0 ? likesCount : ''}
      </Button>

      <Button
        disabled={isLoading}
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: .5,
          background: (theme) => theme.palette.grey[200],
          color: 'black',
          borderRadius: '0 10px 10px 0',
          py: 1,
          px: 2,
          '&:hover': {
            background: (theme) => theme.palette.grey[300],
          },
        }}
        onClick={handleDislike}
      >
        {isDisliked && <ThumbDownIcon/>}

        {!isDisliked && <ThumbDownOutlinedIcon/>}

        {dislikesCount > 0 ? dislikesCount : ''}
      </Button>
    </Box>
  )
}

ButtonsExpression.propTypes = {
  contentId: PropTypes.number,
  likesCount: PropTypes.number,
  dislikesCount: PropTypes.number,
  isLiked: PropTypes.bool,
  isDisliked: PropTypes.bool,
  onLiked: PropTypes.func,
  onDisliked: PropTypes.func,
}

export default ButtonsExpression
