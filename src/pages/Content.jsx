import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import useFindContent from '../hooks/useFindContent.jsx';
import { openAlert } from '../store/alert.js';
import useContent from '../hooks/useContent.jsx';
import RelatedContent from '../components/RelatedContent.jsx';
import LikeDislikeButtons from '../components/LikeDislikeButtons.jsx';

export default function Content() {
  const dispatch = useDispatch()

  const {contentId} = useParams()

  const {data: content, error, isLoading, setData} = useFindContent(contentId)

  const { description, createdAt, countViews, countLikes, countDislikes } = useContent(content)

  useEffect(() => {
    if (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while fetching contents',
      }))
    }
  }, [error])

  function onLiked() {
    setData({
      ...content,
      countLikes: content.countLikes + (content.isLiked ? -1 : 1),
      countDislikes: content.countDislikes + (content.isDisliked ? -1 : 0),
      isLiked: !content.isLiked,
      isDisliked: false,
    })
  }

  function onDisliked() {
    setData({
      ...content,
      countLikes: content.countLikes + (content.isLiked ? -1 : 0),
      countDislikes: content.countDislikes + (content.isDisliked ? -1 : 1),
      isLiked: false,
      isDisliked: !content.isDisliked,
    })
  }

  return content && (
    <Grid container rowSpacing={5} maxWidth="xl">
      <Grid md={12} lg={8} sx={{display: 'flex', flexDirection: 'column', rowGap: 2}}>
        <video
          title={content.title}
          controls
          src={content.videoUrl}
          poster={content.thumbnailUrl}
          width="100%"
          style={{borderRadius: '10px'}}
        >
        </video>

        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          {content.title}
        </Typography>

        <Box sx={{display: 'flex', alignItems: 'center', columnGap: 2}}>
          <Avatar alt="avatar" src="https://i.pravatar.cc/200"/>

          <Box>
            <Typography component="h2" variant="h6">
              {content.createdBy?.name}
            </Typography>

            <Typography>
              {content.createdBy?.countSubscribers || 'No' } subscribers
            </Typography>
          </Box>

          <LikeDislikeButtons
            contentId={content.id}
            countLikes={countLikes}
            countDislikes={countDislikes}
            isLiked={content.isLiked}
            isDisliked={content.isDisliked}
            onLiked={onLiked}
            onDisliked={onDisliked}
          />
        </Box>

        <Box
          sx={{
            background: (theme) => theme.palette.grey[200],
            height: '200px',
            overflowY: 'hidden',
            borderRadius: '10px',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', columnGap: 1 }}>
            <Typography sx={{ fontWeight: 500 }}>
              {countViews} views
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>
              {createdAt}
            </Typography>
          </Box>

          <Box dangerouslySetInnerHTML={{ __html: description }} sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
          </Box>
        </Box>
      </Grid>

      <Grid md={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, px: 3 }}>
        {content.relatedContents?.map(content => (
          <RelatedContent key={content.id} content={content}/>
        ))}
      </Grid>
    </Grid>
  )
}
