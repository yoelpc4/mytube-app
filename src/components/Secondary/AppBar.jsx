import { Link } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MuiAppBar from '@mui/material/AppBar'
import YouTubeIcon from '@mui/icons-material/YouTube'

export default function AppBar() {
  return (
    <MuiAppBar color="default" position="fixed">
      <Toolbar>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
          marginLeft: '44px'
        }}>
          <YouTubeIcon fontSize="large" sx={{ mr: .5, color: 'red' }}/>

          <Typography
            component="h1"
            variant="h5"
            color="none"
            noWrap
            sx={{ fontWeight: 'bold' }}
          >
            MyTube
          </Typography>
        </Link>
      </Toolbar>
    </MuiAppBar>
  )
}
