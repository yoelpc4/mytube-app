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

function DrawerMobile({isOpen, drawerWidth, toggleIsOpen, ...props}) {
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
      {...props}
    />
  )
}

function DrawerNonMobile({isOpen, drawerWidth, ...props}) {
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
      {...props}
    />
  )
}

function Nav({onClick}) {
  return (
    <nav>
      <List onClick={onClick}>
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
  const handleClick = () => {
    if (!isMobile) {
      return
    }

    toggleIsOpen()
  }

  return (
    <aside>
      {isMobile ? (
        <DrawerMobile isOpen={isOpen} drawerWidth={drawerWidth} toggleIsOpen={toggleIsOpen}>
          <Nav onClick={handleClick}/>
        </DrawerMobile>
      ) : (
        <DrawerNonMobile isOpen={isOpen} drawerWidth={drawerWidth}>
          <Nav onClick={handleClick}/>
        </DrawerNonMobile>
      )}
    </aside>
  )
}

DrawerMobile.propTypes = {
  isOpen: PropTypes.bool,
  drawerWidth: PropTypes.number,
  toggleIsOpen: PropTypes.func,
}

DrawerNonMobile.propTypes = {
  isOpen: PropTypes.bool,
  drawerWidth: PropTypes.number,
}

Nav.propTypes = {
  onClick: PropTypes.func,
}

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  children: PropTypes.node,
  drawerWidth: PropTypes.number,
  toggleIsOpen: PropTypes.func,
}

export default Drawer
