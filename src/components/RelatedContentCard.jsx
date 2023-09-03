import PropTypes from 'prop-types'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ContentLink from '@/components/ContentLink.jsx'
import ChannelLink from '@/components/ChannelLink.jsx'
import useContent from '@/hooks/useContent.jsx'

function RelatedContentCard({content}) {
  const {createdAt, viewsCount} = useContent(content)

  return (
    <Grid container columnSpacing={2} rowSpacing={0} sx={{p: 0}}>
      <Grid md={12} lg={6}>
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
      </Grid>

      <Grid md={12} lg={6}>
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

          <ChannelLink username={content.createdBy.name}>
            <Typography component="h3" variant="body2" color="grey.600" sx={{fontWeight: 500}}>
              {content.createdBy.name}
            </Typography>

            <Typography variant="body2" color="grey.600" sx={{fontWeight: 500}}>
              {viewsCount} views • {createdAt}
            </Typography>
          </ChannelLink>
        </Box>
      </Grid>
    </Grid>
  )
}

RelatedContentCard.propTypes = {
  content: PropTypes.object,
}

export default RelatedContentCard
