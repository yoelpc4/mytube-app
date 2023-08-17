import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'

function ContentLink({ children, content, sx = {} }) {
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

ContentLink.propTypes = {
  children: PropTypes.node,
  content: PropTypes.object,
  sx: PropTypes.object,
}

export default ContentLink
