import PropTypes from 'prop-types'
import List from '@mui/material/List'
import MuiDrawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import HomeIcon from '@mui/icons-material/Home'
import HistoryIcon from '@mui/icons-material/History'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined.js'
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import DrawerListItemButton from '@/components/DrawerListItemButton.jsx'
import PrimaryIcon from '@/components/PrimaryIcon.jsx';

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

const container = window !== undefined ? () => window.document.body : undefined

function Drawer({isOpen, toggleIsOpen}) {
  return (
    <MuiDrawer
      component="aside"
      variant="temporary"
      container={container}
      open={isOpen}
      ModalProps={{keepMounted: true}}
      sx={{
        display: 'block',
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 240,
        },
      }}
      onClose={toggleIsOpen}
    >
      <Box sx={{display: 'flex', p: 2}}>
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
      </Box>

      <nav>
        <List onClick={toggleIsOpen}>
          {routes.map((route, index) => (
            <ListItem key={index} disablePadding sx={{display: 'block'}}>
              <DrawerListItemButton route={route} />
            </ListItem>
          ))}
        </List>
      </nav>
    </MuiDrawer>
  )
}

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  toggleIsOpen: PropTypes.func,
}

export default Drawer
