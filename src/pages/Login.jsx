import { useDispatch } from 'react-redux'
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import useForm from '@/hooks/useForm.jsx';
import { setUser } from '@/store/auth.js'
import { openAlert } from '@/store/alert.js'
import client from '@/utils/client.js';

export default function Login() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {state} = useLocation()

  const [searchParams] = useSearchParams()

  const redirect = searchParams.get('redirect')

  const {form, errors, isLoading, setErrors, handleInput, handleSubmit} = useForm({
    data: {
      username: '',
      password: '',
    },
    handleSuccess,
    handleError,
  })

  async function handleSuccess() {
    await client.post('auth/login', form)

    const {data} = await client.get('auth/user')

    dispatch(setUser(data))

    if (redirect) {
      window.location.replace(redirect)

      return
    }

    navigate(state.from ?? '/')
  }

  function handleError(response) {
    if (response.status === 401) {
      setErrors({
        username: 'The given credentials are incorrect',
      })

      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while log in'
    }))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
        <LockOutlinedIcon/>
      </Avatar>

      <Typography component="h1" variant="h5">
        Login
      </Typography>

      <Box component="form" id="login-form" sx={{mt: 1}} onSubmit={handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Username"
          required
          fullWidth
          autoFocus
          margin="normal"
          value={form.username}
          error={!!errors.username}
          helperText={errors.username}
          onInput={handleInput}
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
          error={!!errors.password}
          helperText={errors.password}
          onInput={handleInput}
        />

        <LoadingButton
          type="submit"
          form="login-form"
          fullWidth
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
          sx={{mt: 3, mb: 2}}
        >
          <span>Login</span>
        </LoadingButton>

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
