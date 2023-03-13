import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { unsetUser } from '../store/auth.js'

export default function AvatarMenuList() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  function onClickLogoutListItem() {
    localStorage.removeItem('accessToken')

    dispatch(unsetUser())

    navigate('/login')
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav>
        <List>
          <ListItem disablePadding onClick={onClickLogoutListItem}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlinedIcon/>
              </ListItemIcon>

              <ListItemText primary="Logout"/>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
}
