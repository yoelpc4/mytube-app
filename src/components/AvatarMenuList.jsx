import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { selectUser, unsetUser } from '@/store/auth.js'

export default function AvatarMenuList({onMenuClicked}) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const user = useSelector(selectUser)

  function handleClickLogoutListItem() {
    dispatch(unsetUser())

    navigate('/')

    onMenuClicked()
  }

  return (
    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <nav>
        <List>
          {user && (
            <ListItem disablePadding onClick={handleClickLogoutListItem}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutOutlinedIcon/>
                </ListItemIcon>

                <ListItemText primary="Logout"/>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </nav>
    </Box>
  )
}
