import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined.js'
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import { selectUser } from '@/store/auth.js';
import AvatarButtonPopover from '@/components/AvatarButtonPopover.jsx'

const StyledAppBar = styled(MuiAppBar)(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: '#fff',
}))

function AppBar({toggleIsOpen}) {
  const user = useSelector(selectUser)

  return (
    <StyledAppBar elevation={0} position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="toggle drawer"
          sx={{marginRight: '16px'}}
          onClick={toggleIsOpen}
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

        {user ? <AvatarButtonPopover/> : (
          <Button
            component={Link}
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
  toggleIsOpen: PropTypes.func,
}

export default AppBar
