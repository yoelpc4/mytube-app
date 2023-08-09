import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { selectUser, unsetUser } from '@/store/auth.js'
import { openAlert } from '@/store/alert.js';
import client from '@/utils/client.js';

export default function AvatarMenuList({onMenuClicked}) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const user = useSelector(selectUser)

  async function handleClickLogoutListItem() {
    try {
      await client.post('auth/logout')

      dispatch(unsetUser())

      navigate('/')
    } catch (error) {
      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while logging out'
      }))
    }
  }

  return (
    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <nav>
        {user && (
          <List>
            <ListItem disablePadding>
              <Link to="/account" style={{textDecoration: 'none', color: 'inherit'}} onClick={onMenuClicked}>
                <ListItemButton>
                  <ListItemIcon>
                    <ManageAccountsOutlinedIcon/>
                  </ListItemIcon>

                  <ListItemText primary="Account"/>
                </ListItemButton>
              </Link>
            </ListItem>

            <Divider/>

            <ListItem disablePadding onClick={handleClickLogoutListItem}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutOutlinedIcon/>
                </ListItemIcon>

                <ListItemText primary="Logout"/>
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </nav>
    </Box>
  )
}
