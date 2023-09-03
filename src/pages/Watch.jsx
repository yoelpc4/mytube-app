import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { openAlert } from '@/store/alert.js'
import RelatedContentCard from '@/components/RelatedContentCard.jsx'
import ButtonSubscription from '@/components/ButtonSubscription.jsx'
import ChannelLink from '@/components/ChannelLink.jsx'
import ButtonsExpression from '@/components/ButtonsExpression.jsx'
import useAsync from '@/hooks/useAsync.jsx'
import useChannel from '@/hooks/useChannel.jsx'
import useContent from '@/hooks/useContent.jsx'
import client from '@/utils/client.js'
import { pluralize } from '@/utils/helpers.js';

export default function Watch() {
  const dispatch = useDispatch()

  const {contentId} = useParams()

  const {data, error, run} = useAsync()

  const {
    content,
    description,
    createdAt,
    viewsCount,
    likesCount,
    dislikesCount,
    setContent,
    handleLiked,
    handleDisliked,
  } = useContent()

  const {
    channel,
    hasSubscribed,
    subscribersCount,
    setChannel,
    handleSubscribed,
    handleUnsubscribed,
  } = useChannel()

  useEffect(() => {
    const controller = new AbortController()

    run(client.get(`contents/${contentId}`, {
      signal: controller.signal,
    }).then(({data}) => data))

    return () => controller.abort()
  }, [run, contentId])

  useEffect(() => {
    if (!data) {
      return
    }

    const {createdBy, ...contentData} = data

    setContent(contentData)

    setChannel(createdBy)
  }, [data, setContent, setChannel])

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching content',
    }))
  }, [dispatch, error])

  return content && channel && (
    <Grid container columnSpacing={2} rowSpacing={3}>
      <Grid md={12} lg={8} sx={{display: 'flex', flexDirection: 'column', rowGap: 2}}>
        <video
          title={content.title}
          controls
          src={content.videoUrl}
          poster={content.thumbnailUrl}
          width="100%"
          style={{borderRadius: '10px', maxWidth: '100%'}}
        >
        </video>

        <Typography component="h1" variant="h5" sx={{fontWeight: 500}}>
          {content.title}
        </Typography>

        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', alignItems: 'center', columnGap: 2}}>
            <ChannelLink username={channel.username}>
              <Avatar alt={channel.name} src={channel.profileUrl}/>
            </ChannelLink>

            <Box>
              <ChannelLink username={channel.username}>
                <Typography component="h2" variant="h6">
                  {channel.name}
                </Typography>
              </ChannelLink>

              <Typography sx={{fontSize: '0.875rem'}}>
                {subscribersCount || 'No'} {pluralize('subscriber', subscribersCount)}
              </Typography>
            </Box>

            <ButtonSubscription
              channel={channel}
              hasSubscribed={hasSubscribed}
              onSubscribed={handleSubscribed}
              onUnsubscribed={handleUnsubscribed}
            />
          </Box>

          <ButtonsExpression
            contentId={content.id}
            likesCount={likesCount}
            dislikesCount={dislikesCount}
            isLiked={content.isLiked}
            isDisliked={content.isDisliked}
            onLiked={handleLiked}
            onDisliked={handleDisliked}
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
              {viewsCount} views
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

      <Grid md={12} lg={4} sx={{display: 'flex', flexDirection: 'column', rowGap: 2}}>
        {content.relatedContents?.map(content => (
          <RelatedContentCard key={content.id} content={content}/>
        ))}
      </Grid>
    </Grid>
  )
}
