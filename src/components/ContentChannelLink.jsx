import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'

function ContentChannelLink({ children, content, sx = {} }) {
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

ContentChannelLink.propTypes = {
  children: PropTypes.node,
  content: PropTypes.object,
  sx: PropTypes.object,
}

export default ContentChannelLink
