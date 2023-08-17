import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { setUser } from '@/store/auth.js'
import { openAlert } from '@/store/alert.js'
import useAsync from '@/hooks/useAsync.jsx'
import useForm from '@/hooks/useForm.jsx'
import client from '@/utils/client.js'

export default function Register() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {data, error, isLoading, run} = useAsync()

  const {inputs, errors, handleInput, handleSubmit, handleServerErrors} = useForm({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const submit = () => {
    if (isLoading) {
      return
    }

    run(client.post('auth/register', inputs).then(({data}) => data))
  }

  useEffect(() => {
    if (!data) {
      return
    }

    dispatch(setUser(data))

    navigate('/')
  }, [dispatch, navigate, data])

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
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while registering',
    }))
  }, [dispatch, error, handleServerErrors])

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
        <LockOutlinedIcon/>
      </Avatar>

      <Typography component="h1" variant="h5">
        Register
      </Typography>

      <Box component="form" id="register-form" sx={{mt: 1}} onSubmit={handleSubmit(submit)}>
        <TextField
          id="name"
          name="name"
          label="Name"
          required
          fullWidth
          autoFocus
          margin="normal"
          value={inputs.name}
          error={!!errors.name}
          helperText={errors.name}
          onInput={handleInput}
        />

        <TextField
          id="username"
          name="username"
          label="Username"
          required
          fullWidth
          margin="normal"
          value={inputs.username}
          error={!!errors.username}
          helperText={errors.username}
          onInput={handleInput}
        />

        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          required
          fullWidth
          margin="normal"
          value={inputs.email}
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

        <TextField
          id="password-confirmation"
          name="passwordConfirmation"
          type="password"
          label="Password Confirmation"
          margin="normal"
          required
          fullWidth
          value={inputs.passwordConfirmation}
          error={!!errors.passwordConfirmation}
          helperText={errors.passwordConfirmation}
          onInput={handleInput}
        />

        <LoadingButton
          type="submit"
          form="register-form"
          fullWidth
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
          sx={{mt: 3, mb: 2}}
        >
          <span>Register</span>
        </LoadingButton>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Login here
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
