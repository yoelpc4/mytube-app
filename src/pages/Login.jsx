import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { setUser } from '@/store/auth.js'
import { openAlert } from '@/store/alert.js'
import useAsync from '@/hooks/useAsync.jsx'
import useForm from '@/hooks/useForm.jsx'
import client from '@/utils/client.js'

export default function Login() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {state} = useLocation()

  const [searchParams] = useSearchParams()

  const {data, error, isLoading, run} = useAsync()

  const {inputs, errors, setErrors, handleInput, handleSubmit, handleServerErrors} = useForm({
    username: '',
    password: '',
  })

  const submit = () => {
    if (isLoading) {
      return
    }

    run(client.post('auth/login', {
      username: inputs.username,
      password: inputs.password,
    }).then(({data}) => data))
  }

  useEffect(() => {
    if (!data) {
      return
    }

    if (searchParams.has('redirect')) {
      window.location.replace(searchParams.get('redirect'))

      return
    }

    dispatch(setUser(data))

    navigate(state ? state.from : '/')
  }, [dispatch, navigate, state, searchParams, data])

  useEffect(() => {
    if (!error) {
      return
    }

    const {response} = error

    if (response) {
      if (response.status === 400) {
        handleServerErrors(response.data.errors)

        return
      }

      if (response.status === 401) {
        setErrors({
          username: 'The given credentials are incorrect',
        })

        return
      }
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while logging in',
    }))
  }, [dispatch, error, setErrors, handleServerErrors])

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
        <LockOutlinedIcon/>
      </Avatar>

      <Typography component="h1" variant="h5">
        Login
      </Typography>

      <Box
        component="form"
        id="login-form"
        sx={{mt: 1, width: '100%', maxWidth: '400px'}}
        onSubmit={handleSubmit(submit)}
      >
        <TextField
          id="username"
          name="username"
          label="Username"
          required
          fullWidth
          autoFocus
          margin="normal"
          value={inputs.username}
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
          value={inputs.password}
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

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/register" variant="body2">
              Don&apos;t have an account? Register here
            </Link>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Forgot password
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
