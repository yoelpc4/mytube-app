import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ContentLink from '@/components/ContentLink.jsx'
import useContent from '@/hooks/useContent.jsx'

function HistoryContentCard({content}) {
  const {description, countViews} = useContent(content)

  return (
    <ContentLink content={content} sx={{display: 'contents'}}>
      <Box sx={{display: 'flex', columnGap: 2}}>
        <video
          title={content.title}
          src={content.videoUrl}
          poster={content.thumbnailUrl}
          width="15%"
          style={{borderRadius: '10px'}}
        >
        </video>

        <Box>
          <Typography
            component="h2"
            variant="h6"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.5,
            }}>
            {content.title}
          </Typography>

          <Typography component="h3" variant="body2" color="grey.600">
            {content.createdBy?.name} • {countViews} views
          </Typography>

          <Typography
            dangerouslySetInnerHTML={{__html: description}}
            variant="body2"
            color="grey.600"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
          </Typography>
        </Box>
      </Box>
    </ContentLink>
  )
}

HistoryContentCard.propTypes = {
  content: PropTypes.object,
}

export default HistoryContentCard
