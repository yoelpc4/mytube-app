import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import AppBar from '@/components/Primary/AppBar.jsx'
import Drawer from '@/components/Drawer.jsx'
import Container from '@mui/material/Container'

export default function Primary() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleIsOpen = () => setIsOpen(isOpen => !isOpen)

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>

      <AppBar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />

      <Drawer isOpen={isOpen} />

      <Container component="main" maxWidth="xl" sx={{mt: 8}}>
        <Outlet/>
      </Container>
    </Box>
  )
}
