import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'

function ChannelLink({children, username, sx = {}}) {
  return (
    <Link
      component={RouterLink}
      to={`/channel/${username}`}
      color="inherit"
      underline="none"
      sx={sx}
    >
      {children}
    </Link>
  )
}

ChannelLink.propTypes = {
  children: PropTypes.node,
  username: PropTypes.string,
  sx: PropTypes.object,
}

export default ChannelLink
