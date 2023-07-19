import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@/components/Primary/AppBar.jsx';
import Drawer from '@/components/Drawer.jsx';
import Container from '@mui/material/Container';

export default function Primary() {
  const [open, setOpen] = useState(true)

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>

      <AppBar open={open} setOpen={setOpen} />

      <Drawer open={open} />

      <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, overflow: 'auto', mt: 8}}>
        <Outlet/>
      </Container>
    </Box>
  )
}
