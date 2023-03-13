import { useMemo } from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function PublishedContentCard({ content }) {
  const createdAt = useMemo(() => DateTime.fromISO(content.createdAt).toRelative(), [content.createdAt])

  return (
    <Box>
      <video
        title={content.title}
        poster={content.thumbnailUrl}
        width="100%"
        style={{ borderRadius: '10px' }}
      >
        <source src={content.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Box sx={{ display: 'flex', mt: '3px' }}>
        <Avatar alt="avatar" src="https://i.pravatar.cc/200" sx={{ mr: '8px' }} />

        <Box>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{
              display: '-webkit-box',
              '-webkit-line-clamp': '2',
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 700,
              lineHeight: 1.5,
          }}>
            {content.title}
          </Typography>

          <Typography component="h3" variant="body2" color="grey.600" sx={{ fontWeight: 500 }}>
            {content.createdBy?.name}
          </Typography>

          <Typography variant="body2" color="grey.600" sx={{ fontWeight: 500 }}>
            100K views • {createdAt}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
