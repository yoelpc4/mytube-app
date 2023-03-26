import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Button from '@mui/material/Button';

export default function LikeDislikeButtons({ countLikes, countDislikes, isLiked, isDisliked, isLoading, onLike, onDislike }) {
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
