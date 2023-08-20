import PropTypes from 'prop-types'
import { Link as RouterLink, Link } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import YouTubeIcon from '@mui/icons-material/YouTube'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined.js'
import AvatarButtonPopover from '@/components/AvatarButtonPopover.jsx'
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/auth.js';

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({theme, open}) => ({
  background: '#fff',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

function AppBar({open, setOpen}) {
  const user = useSelector(selectUser)

  return (
    <StyledAppBar elevation={0} position="fixed" open={open}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="toggle drawer"
          sx={{marginRight: '16px'}}
          onClick={() => setOpen(!open)}
        >
          <MenuOutlinedIcon sx={{color: '#000'}}/>
        </IconButton>

        <Link to="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
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

        <div style={{flexGrow: 1}}></div>

        {user ? (
          <AvatarButtonPopover/>
        ) : (
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            startIcon={<AccountCircleOutlinedIcon/>}
            sx={{borderRadius: '20px'}}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}

AppBar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
}

export default AppBar
