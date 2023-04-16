import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function ContentChannelLink({ children, content, sx = {} }) {
  return (
    <Link
      component={RouterLink}
      to={`/channel/${content.createdBy?.username}`}
      color="inherit"
      underline="none"
      sx={sx}
    >
      {children}
    </Link>
  )
}
