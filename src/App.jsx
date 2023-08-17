import { Outlet } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AlertContainer from './components/AlertContainer.jsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#CC0904',
    },
    secondary: {
      main: '#095FD4',
    },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AlertContainer />

      <Outlet/>
    </ThemeProvider>
  )
}
