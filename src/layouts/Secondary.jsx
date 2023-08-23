import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import AppBar from '@/components/Secondary/AppBar.jsx'
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/auth.js';

export default function Secondary() {
  const location = useLocation()

  const user = useSelector(selectUser)

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>

      <AppBar/>

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          height: '90vh',
          overflow: 'auto',
          mt: 8
        }}
      >
        <Outlet/>
      </Container>
    </Box>
  )
}
