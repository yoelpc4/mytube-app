import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledMain = styled('main')(({theme, isOpen, drawerWidth}) => ({
  flexGrow: 1,
  marginLeft: `-${drawerWidth}px`,
  padding: theme.spacing(3),
  paddingTop: '70px',
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isOpen && {
    marginLeft: 0,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

function Main({children, isOpen, drawerWidth}) {
  return (
    <StyledMain isOpen={isOpen} drawerWidth={drawerWidth}>
      {children}
    </StyledMain>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  drawerWidth: PropTypes.number,
}

export default Main
