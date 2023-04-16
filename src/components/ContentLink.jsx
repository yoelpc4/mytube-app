import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function ContentLink({ children, content, sx = {} }) {
  return (
    <Link
      component={RouterLink}
      to={`/watch/${content.id}`}
      color="inherit"
      underline="none"
      sx={sx}
    >
      {children}
    </Link>
  )
}
