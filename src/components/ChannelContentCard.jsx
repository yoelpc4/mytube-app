import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ContentLink from '@/components/ContentLink.jsx'
import ContentChannelLink from '@/components/ContentChannelLink.jsx'
import useContent from '@/hooks/useContent.jsx'

function ChannelContentCard({content}) {
  const {createdAt, viewsCount} = useContent(content)

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

          <Typography variant="body2" color="grey.600" sx={{fontWeight: 500, fontSize: '.875rem'}}>
            {viewsCount} views • {createdAt}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

ChannelContentCard.propTypes = {
  content: PropTypes.object,
}

export default ChannelContentCard
