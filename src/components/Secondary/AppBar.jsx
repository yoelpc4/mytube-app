import { Link } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MuiAppBar from '@mui/material/AppBar'
import YouTubeIcon from '@mui/icons-material/YouTube'

export default function AppBar() {
  return (
    <MuiAppBar elevation={0} position="fixed" sx={{background: '#fff'}}>
      <Toolbar>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            marginLeft: '44px'
          }}
        >
          <YouTubeIcon fontSize="large" sx={{mr: .5, color: 'red'}}/>

          <Typography
            component="span"
            variant="h5"
            color="black"
            noWrap
            sx={{fontWeight: 600}}
          >
            MyTube
          </Typography>
        </Link>
      </Toolbar>
    </MuiAppBar>
  )
}
