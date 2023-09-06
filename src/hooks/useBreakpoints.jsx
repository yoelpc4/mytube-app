import { useMediaQuery } from '@mui/material';

export default function useBreakpoints() {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return {
    isMobile,
  }
}
