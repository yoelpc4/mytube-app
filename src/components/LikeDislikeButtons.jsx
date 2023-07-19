import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Button from '@mui/material/Button';
import { openAlert } from '@/store/alert.js';
import ContentService from '@/services/ContentService.js';
import { selectUser } from '@/store/auth.js';

const contentService = new ContentService()

export default function LikeDislikeButtons({
                                             contentId,
                                             countLikes,
                                             countDislikes,
                                             isLiked,
                                             isDisliked,
                                             onLiked,
                                             onDisliked
                                           }) {
  const dispatch = useDispatch()

  const location = useLocation()

  const navigate = useNavigate()

  const user = useSelector(selectUser)

  const [isLoading, setIsLoading] = useState(false)

  async function onLike() {
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
      await contentService.likeContent(contentId)

      onLiked()
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while liking content'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  async function onDislike() {
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
      await contentService.dislikeContent(contentId)

      onDisliked()
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while disliking content'
      }))
    } finally {
      setIsLoading(false)
    }
  }

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
        onClick={onLike}
      >
        {isLiked && <ThumbUpIcon/>}

        {!isLiked && <ThumbUpOutlinedIcon/>}

        {countLikes > 0 ? countLikes : ''}
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
        onClick={onDislike}
      >
        {isDisliked && <ThumbDownIcon/>}

        {!isDisliked && <ThumbDownOutlinedIcon/>}

        {countDislikes > 0 ? countDislikes : ''}
      </Button>
    </Box>
  )
}
