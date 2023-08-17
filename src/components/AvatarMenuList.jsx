import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { selectUser } from '@/store/auth.js'
import ListItemLogout from '@/components/ListItemLogout.jsx'

function AvatarMenuList({onMenuClick}) {
  const user = useSelector(selectUser)

  return (
    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <nav>
        {user && (
          <List>
            <ListItem disablePadding>
              <Link to="/account" style={{textDecoration: 'none', color: 'inherit'}} onClick={onMenuClick}>
                <ListItemButton>
                  <ListItemIcon>
                    <ManageAccountsOutlinedIcon/>
                  </ListItemIcon>

                  <ListItemText primary="Account"/>
                </ListItemButton>
              </Link>
            </ListItem>

            <Divider/>

            <ListItemLogout />
          </List>
        )}
      </nav>
    </Box>
  )
}

AvatarMenuList.propTypes = {
  onMenuClick: PropTypes.func,
}

export default AvatarMenuList
