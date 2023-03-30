import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useContent from '../hooks/useContent.jsx';

export default function ContentHistory({content}) {
  const {createdAt, countViews} = useContent(content)

  return (
    <Link component={RouterLink} to={`/contents/${content.id}`} color="inherit" underline="none">
      <Box sx={{display: 'flex', columnGap: 2}}>
        <video
          title={content.title}
          src={content.videoUrl}
          poster={content.thumbnailUrl}
          width="15%"
          style={{borderRadius: '10px'}}
        >
        </video>

        <Box sx={{display: 'flex'}}>
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
              {content.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
