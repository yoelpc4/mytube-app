import PropTypes from 'prop-types'
import List from '@mui/material/List'
import MuiDrawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import HomeIcon from '@mui/icons-material/Home'
import HistoryIcon from '@mui/icons-material/History'
import DrawerListItemButton from '@/components/DrawerListItemButton.jsx'

const routes = [
  {
    to: '/',
    text: 'Home',
    icon: HomeIcon,
  },
  {
    to: '/history',
    text: 'History',
    icon: HistoryIcon,
  },
]

function Drawer({isOpen, isMobile, drawerWidth, toggleIsOpen}) {
  return (
    <aside>
      {isMobile ? (
        <MuiDrawer
          variant="temporary"
          open={isOpen}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              pt: 8,
              width: drawerWidth,
              border: 'none',
            },
          }}
          onClose={toggleIsOpen}
        >
          <nav>
            <List>
              {routes.map((route, index) => (
                <ListItem key={index} disablePadding sx={{display: 'block'}}>
                  <DrawerListItemButton route={route}/>
                </ListItem>
              ))}
            </List>
          </nav>
        </MuiDrawer>
      ) : (
        <MuiDrawer
          variant="persistent"
          open={isOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              pt: 8,
              width: drawerWidth,
              border: 'none',
            },
          }}
        >
          <nav>
            <List>
              {routes.map((route, index) => (
                <ListItem key={index} disablePadding sx={{display: 'block'}}>
                  <DrawerListItemButton route={route}/>
                </ListItem>
              ))}
            </List>
          </nav>
        </MuiDrawer>
      )}
    </aside>
  )
}

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  drawerWidth: PropTypes.number,
  toggleIsOpen: PropTypes.func,
}

export default Drawer
