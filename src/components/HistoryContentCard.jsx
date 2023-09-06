import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import ContentLink from '@/components/ContentLink.jsx'
import useContent from '@/hooks/useContent.jsx'

function HistoryContentCard({content}) {
  const {description, viewsCount} = useContent(content)

  return (
    <ContentLink content={content} sx={{display: 'contents'}}>
      <Grid container columnSpacing={2} maxWidth="xl">
        <Grid xs={12} sm={5} md={4} lg={3} xl={2}>
          <video
            title={content.title}
            src={content.videoUrl}
            poster={content.thumbnailUrl}
            width="100%"
            style={{borderRadius: '10px'}}
          >
          </video>
        </Grid>

        <Grid xs={12} sm={7} md={8} lg={9} xl={10}>
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
              {content.createdBy?.name} • {viewsCount} views
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
        </Grid>
      </Grid>
    </ContentLink>
  )
}

HistoryContentCard.propTypes = {
  content: PropTypes.object,
}

export default HistoryContentCard
