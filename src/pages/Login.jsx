import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import AuthService from '../services/AuthService.js'
import { setUser } from '../store/auth.js'
import { openAlert } from '../store/alert.js'
import {KEY_ACCESS_TOKEN} from '../constants.js';

const authService = new AuthService()

export default function Login() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [ form, setForm ] = useState({
    email: '',
    password: '',
  })

  function onInput(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  async function onSubmit(event) {
    event.preventDefault()

    try {
      const { accessToken } = await authService.login(form)

      localStorage.setItem(KEY_ACCESS_TOKEN, accessToken)

      const user = await authService.getUser()

      dispatch(setUser(user))

      navigate('/')
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while logging in'
      }))
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon/>
      </Avatar>

      <Typography component="h1" variant="h5">
        Login
      </Typography>

      <Box component="form" id="login-form" sx={{ mt: 1 }} onSubmit={onSubmit}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          required
          fullWidth
          autoFocus
          margin="normal"
          value={form.email}
          onInput={onInput}
        />

        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          margin="normal"
          required
          fullWidth
          value={form.password}
          onInput={onInput}
        />

        <Button
          type="submit"
          htmlFor="login-form"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              Don't have an account? Register here
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
