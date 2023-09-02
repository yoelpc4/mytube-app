import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import AppBar from '@/components/Primary/AppBar.jsx'
import Drawer from '@/components/Primary/Drawer.jsx'
import Main from '@/components/Primary/Main.jsx';

const drawerWidth = 240

export default function Primary() {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [isOpen, setIsOpen] = useState(!isMobile)

  const toggleIsOpen = () => setIsOpen(isOpen => !isOpen)

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>

      <AppBar isOpen={isOpen} toggleIsOpen={toggleIsOpen}/>

      <Drawer isOpen={isOpen} isMobile={isMobile} drawerWidth={drawerWidth} toggleIsOpen={toggleIsOpen}/>

      <Main isOpen={isOpen} isMobile={isMobile} drawerWidth={drawerWidth}>
        <Outlet/>
      </Main>
    </Box>
  )
}
