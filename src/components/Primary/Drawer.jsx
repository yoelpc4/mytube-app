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

function MobileDrawer({children, isOpen, drawerWidth, toggleIsOpen}) {
  return (
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
      {children}
    </MuiDrawer>
  )
}

function NonMobileDrawer({children, isOpen, drawerWidth}) {
  return (
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
      {children}
    </MuiDrawer>
  )
}

function Nav() {
  return (
    <nav>
      <List>
        {routes.map((route, index) => (
          <ListItem key={index} disablePadding sx={{display: 'block'}}>
            <DrawerListItemButton route={route}/>
          </ListItem>
        ))}
      </List>
    </nav>
  )
}

function Drawer({isOpen, isMobile, drawerWidth, toggleIsOpen}) {
  return (
    <aside>
      {isMobile ? (
        <MobileDrawer isOpen={isOpen} drawerWidth={drawerWidth} toggleIsOpen={toggleIsOpen}>
          <Nav />
        </MobileDrawer>
      ) : (
        <NonMobileDrawer isOpen={isOpen} drawerWidth={drawerWidth}>
          <Nav />
        </NonMobileDrawer>
      )}
    </aside>
  )
}

MobileDrawer.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  drawerWidth: PropTypes.number,
  toggleIsOpen: PropTypes.func,
}

NonMobileDrawer.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  drawerWidth: PropTypes.number,
}

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  children: PropTypes.node,
  drawerWidth: PropTypes.number,
  toggleIsOpen: PropTypes.func,
}

export default Drawer
