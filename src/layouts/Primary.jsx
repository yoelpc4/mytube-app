import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '../components/Primary/AppBar.jsx';
import Drawer from '../components/Drawer.jsx';

export default function Primary() {
  const [open, setOpen] = useState(true)

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>

      <AppBar open={open} setOpen={setOpen} />

      <Drawer open={open} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          pt: 10
        }}
      >
        <Outlet/>
      </Box>
    </Box>
  )
}
