import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useContent from '../hooks/useContent.jsx';

export default function TimelineContent({content}) {
  const { createdAt, countViews } = useContent(content)

  return (
    <Link component={RouterLink} to={`/contents/${content.id}`} color="inherit" underline="none">
      <Box>
        <video
          title={content.title}
          src={content.videoUrl}
          poster={content.thumbnailUrl}
          width="100%"
          style={{borderRadius: '10px'}}
        >
        </video>

        <Box sx={{display: 'flex', mt: '3px'}}>
          <Avatar alt="avatar" src="https://i.pravatar.cc/200" sx={{mr: '8px'}}/>

          <Box>
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

            <Typography component="h3" variant="body2" color="grey.600" sx={{fontWeight: 500}}>
              {content.createdBy?.name}
            </Typography>

            <Typography variant="body2" color="grey.600" sx={{fontWeight: 500}}>
              {countViews} views • {createdAt}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
