import { Link } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube.js';
import Typography from '@mui/material/Typography';

export default function PrimaryIcon() {
  return (
    <Link to="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
      <YouTubeIcon fontSize="large" sx={{mr: .5, color: 'red'}}/>

      <Typography
        component="span"
        variant="h5"
        color="black"
        noWrap
        sx={{fontWeight: 600}}
      >
        MyTube
      </Typography>
    </Link>
  )
}
