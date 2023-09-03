import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledMain = styled(Box, {
  shouldForwardProp: prop => !['isOpen', 'isMobile', 'drawerWidth'].includes(prop),
})(({theme, isOpen, isMobile, drawerWidth}) => ({
  flexGrow: 1,
  ...(isMobile && {
    padding: '80px 5px 0 5px',
  }),
  ...(!isMobile && {
    padding: theme.spacing(3),
    paddingTop: '80px',
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
