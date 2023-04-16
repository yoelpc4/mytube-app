import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useContent from '../hooks/useContent.jsx';
import ContentLink from './ContentLink.jsx';
import ContentChannelLink from './ContentChannelLink.jsx';

export default function FeedContentCard({content}) {
  const {createdAt, countViews} = useContent(content)

  return (
    <Box>
      <ContentLink content={content}>
        <video
          title={content.title}
          src={content.videoUrl}
          poster={content.thumbnailUrl}
          width="100%"
          style={{borderRadius: '10px'}}
        >
        </video>
      </ContentLink>

      <Box sx={{display: 'flex', mt: '3px'}}>
        <ContentChannelLink content={content}>
          <Avatar alt="avatar" src="https://i.pravatar.cc/200" sx={{mr: '8px'}}/>
        </ContentChannelLink>

        <Box>
          <ContentLink content={content}>
            <Typography
              component="h2"
              variant="subtitle1"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 700,
                lineHeight: 1.5,
              }}>
              {content.title}
            </Typography>
          </ContentLink>

          <ContentChannelLink content={content}>
            <Typography component="h3" variant="body2" color="grey.600" sx={{fontWeight: 500}}>
              {content.createdBy?.name}
            </Typography>
          </ContentChannelLink>

          <Typography variant="body2" color="grey.600" sx={{fontWeight: 500}}>
            {countViews} views • {createdAt}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
