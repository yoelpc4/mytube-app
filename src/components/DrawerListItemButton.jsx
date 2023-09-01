import PropTypes from 'prop-types'
import { NavLink, useMatch } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

function DrawerListItemButton({route}) {
  const match = useMatch({
    path: route.to,
  })

  const color = match ? 'primary' : 'inherit'

  const MenuIcon = route.icon

  return (
    <ListItemButton
      component={NavLink}
      to={route.to}
      selected={!!match}
      sx={{
        minHeight: 48,
        flexDirection: 'row',
        justifyContent: 'initial',
        alignItems: 'center',
        px: 2.5,
        borderRadius: '0 10px 10px 0',
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MenuIcon color={color} />
      </ListItemIcon>

      <ListItemText
        primary={route.text}
        primaryTypographyProps={{
          color,
          sx: {
            fontSize: '1rem',
          },
      }}
      />
    </ListItemButton>
  )
}

DrawerListItemButton.propTypes = {
  route: PropTypes.object,
}

export default DrawerListItemButton
