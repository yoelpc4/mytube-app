import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '../components/Secondary/AppBar.jsx';

export default function Secondary() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar />

      <Container component="main" maxWidth="xs" sx={{ pt: 10 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
