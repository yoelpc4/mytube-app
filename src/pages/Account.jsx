import { Link, Outlet } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useMatchPath from '@/hooks/useMatchPath.jsx';

export default function Account() {
  const tabs = [
    {
      label: 'Profile',
      icon: <PersonOutlinedIcon />,
      to: '/account',
    },
    {
      label: 'Password',
      icon: <LockOutlinedIcon />,
      to: '/account/password',
    },
  ]

  const matchedPath = useMatchPath(tabs.map(tab => tab.to))

  return (
    <Grid container spacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 500 }}>
          Account
        </Typography>
      </Grid>

      <Grid xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={matchedPath}>
            {tabs.map(tab => (
              <Tab key={tab.to} label={tab.label} icon={tab.icon} value={tab.to} to={tab.to} component={Link} />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  )
}
