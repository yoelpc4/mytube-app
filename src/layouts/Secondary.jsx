import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { selectUser } from '@/store/auth.js';
import AppBar from '@/components/Secondary/AppBar.jsx'

export default function Secondary() {
  const location = useLocation()

  const user = useSelector(selectUser)

  return user ? (
    <Navigate to="/" state={{from: location}} replace/>
  ) : (
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
