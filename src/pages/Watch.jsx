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
import RelatedContentCard from '../components/RelatedContentCard.jsx';
import ButtonSubscribe from '../components/ButtonSubscribe.jsx';
import ContentChannelLink from '../components/ContentChannelLink.jsx';
import LikeDislikeButtons from '../components/LikeDislikeButtons.jsx';
import useChannel from '../hooks/useChannel.jsx';

export default function Watch() {
  const dispatch = useDispatch()

  const {contentId} = useParams()

  const {data: content, error, isLoading, setData} = useFindContent(contentId)

  const {description, createdAt, countViews, countLikes, countDislikes} = useContent(content)

  const {countSubscribers} = useChannel(content?.createdBy)

  useEffect(() => {
    if (!error) {
      return
    }

    if (import.meta.env.DEV) {
      console.log(error)
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching content',
    }))
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

  function onSubscribed() {
    setData({
      ...content,
      createdBy: {
        ...content.createdBy,
        countChannelSubscriptions: content.createdBy.countChannelSubscriptions + 1,
      },
    })
  }

  function onUnsubscribed() {
    setData({
      ...content,
      createdBy: {
        ...content.createdBy,
        countChannelSubscriptions: content.createdBy.countChannelSubscriptions - 1,
      },
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

        <Typography component="h1" variant="h5" sx={{fontWeight: 500}}>
          {content.title}
        </Typography>

        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', alignItems: 'center', columnGap: 2}}>
            <ContentChannelLink content={content}>
              <Avatar alt="avatar" src="https://i.pravatar.cc/200"/>
            </ContentChannelLink>

            <Box>
              <ContentChannelLink content={content}>
                <Typography component="h2" variant="h6">
                  {content.createdBy?.name}
                </Typography>
              </ContentChannelLink>

              <Typography sx={{ fontSize: '0.875rem' }}>
                {countSubscribers || 'No'} subscriber{countSubscribers === 1 ? '' : 's'}
              </Typography>
            </Box>

            <ButtonSubscribe channel={content.createdBy} onSubscribed={onSubscribed} onUnsubscribed={onUnsubscribed}/>
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
          <Box sx={{display: 'flex', columnGap: 1}}>
            <Typography sx={{fontWeight: 500}}>
              {countViews} views
            </Typography>

            <Typography sx={{fontWeight: 500}}>
              {createdAt}
            </Typography>
          </Box>

          <Typography
            dangerouslySetInnerHTML={{__html: description}}
            variant="body2"
            sx={{
              maxHeight: '200px',
              overflowY: 'scroll'
            }}
          >
          </Typography>
        </Box>
      </Grid>

      <Grid md={12} lg={4} sx={{display: 'flex', flexDirection: 'column', rowGap: 2, px: 3}}>
        {content.relatedContents?.map(content => (
          <RelatedContentCard key={content.id} content={content}/>
        ))}
      </Grid>
    </Grid>
  )
}
