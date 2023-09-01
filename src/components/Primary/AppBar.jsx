import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined.js'
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { selectUser } from '@/store/auth.js';
import AvatarButtonPopover from '@/components/AvatarButtonPopover.jsx'
import PrimaryIcon from '@/components/PrimaryIcon.jsx';

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({theme, open}) => ({
  background: '#fff',
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

function AppBar({isOpen, toggleIsOpen}) {
  const user = useSelector(selectUser)

  return (
    <StyledAppBar elevation={0} position="fixed" open={isOpen}>
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

        <PrimaryIcon />

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
  isOpen: PropTypes.bool,
  toggleIsOpen: PropTypes.func,
}

export default AppBar
