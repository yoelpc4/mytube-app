import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledMain = styled(Box, {
  shouldForwardProp: prop => !['isOpen', 'isMobile', 'drawerWidth'].includes(prop),
})(({theme, isOpen, isMobile, drawerWidth}) => ({
  flexGrow: 1,
  ...(isMobile && {
    padding: theme.spacing(2),
  }),
  ...(!isMobile && {
    padding: theme.spacing(3),
    marginLeft: `-${drawerWidth}px`,
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
  }),
  paddingTop: theme.spacing(9),
}))

function Main({children, isOpen, isMobile, drawerWidth}) {
  return (
    <StyledMain component="main" isOpen={isOpen} isMobile={isMobile} drawerWidth={drawerWidth}>
      {children}
    </StyledMain>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  drawerWidth: PropTypes.number,
}

export default Main
