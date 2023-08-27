import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import notFoundImageUrl from '@/assets/images/not-found.svg'

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: '20px',
  height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`
}))

export default function NotFound() {
  return (
    <StyledBox>
      <img src={notFoundImageUrl} alt="Not Found" width="240" />

      <Typography component="h1" variant="h2">
        Page Not Found
      </Typography>
    </StyledBox>
  )
}
