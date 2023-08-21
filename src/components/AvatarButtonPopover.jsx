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
import Typography from '@mui/material/Typography';

export default function AvatarButtonPopover() {
  const [anchorEl, setAnchorEl] = useState(null)

  const user = useSelector(selectUser)

  const isOpen = !!anchorEl

  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Button onClick={handleClick}>
        <Avatar alt="avatar" src="https://i.pravatar.cc/200"/>
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
                  <Avatar alt="avatar" src="https://i.pravatar.cc/200"/>
                </ListItemAvatar>

                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{color: '#000', mb: '5px'}}>
                        @{user.username}
                      </Typography>

                      <RouterLink
                        to="/account"
                        style={{textDecoration: 'none'}}
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
