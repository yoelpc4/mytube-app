import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ListItemLogout from '@/components/ListItemLogout.jsx';
import { selectUser } from '@/store/auth.js';

export default function AvatarButtonPopover() {
  const [anchorEl, setAnchorEl] = useState(null)

  const user = useSelector(selectUser)

  const isOpen = !!anchorEl

  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Button onClick={handleClick}>
        <Avatar alt={user.name} src={user.profileUrl}/>
      </Button>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
          <nav>
            <List>
              <ListItem alignItems="flex-start" onClick={handleClose}>
                <ListItemAvatar>
                  <Avatar alt={user.name} src={user.profileUrl}/>
                </ListItemAvatar>

                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      <span style={{display: 'block', color: '#000', marginBottom: '5px'}}>
                        @{user.username}
                      </span>

                      <RouterLink
                        to="/account"
                        style={{display: 'block', textDecoration: 'none'}}
                        onClick={handleClose}
                      >
                        Manage your account
                      </RouterLink>
                    </>
                  }
                />
              </ListItem>

              <Divider/>

              <li>
                <ListItem
                  component={RouterLink}
                  to={`/channel/${user.username}`}
                  disablePadding
                  sx={{textDecoration: 'none', color: 'inherit'}}
                >
                  <ListItemButton onClick={handleClose}>
                    <ListItemIcon>
                      <PortraitOutlinedIcon/>
                    </ListItemIcon>

                    <ListItemText primary="Your Channel"/>
                  </ListItemButton>
                </ListItem>
              </li>

              <li>
                <ListItem
                  component={Link}
                  href={import.meta.env.VITE_STUDIO_URL}
                  disablePadding
                  style={{textDecoration: 'none', color: 'inherit'}}
                >
                  <ListItemButton onClick={handleClose}>
                    <ListItemIcon>
                      <PlayCircleOutlinedIcon/>
                    </ListItemIcon>

                    <ListItemText primary="MyTube Studio"/>
                  </ListItemButton>
                </ListItem>
              </li>

              <ListItemLogout/>
            </List>
          </nav>
        </Box>
      </Popover>
    </>
  )
}
