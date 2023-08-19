import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { openAlert } from '@/store/alert.js'
import useAsync from '@/hooks/useAsync.jsx'
import useForm from '@/hooks/useForm.jsx'
import client from '@/utils/client.js'

export default function ResetPassword() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const location = useLocation()

  const [searchParams] = useSearchParams()

  const {error, isLoading, isSuccess, run} = useAsync()

  const {inputs, errors, setErrors, handleInput, handleSubmit, handleServerErrors} = useForm({
    email: searchParams.get('email'),
    password: '',
    passwordConfirmation: '',
  })

  const submit = () => {
    if (isLoading) {
      return
    }

    run(client.post('auth/reset-password', {
      token: searchParams.get('token'),
      email: searchParams.get('email'),
      password: inputs.password,
      passwordConfirmation: inputs.passwordConfirmation,
    }).then(({data}) => data))
  }

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    dispatch(openAlert({
      type: 'success',
      message: 'Password has been reset',
    }))

    navigate('/login')
  }, [dispatch, navigate, isSuccess])

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
      message: 'An error occurred while resetting password',
    }))
  }, [dispatch, error, setErrors, handleServerErrors])

  if (!searchParams.has('token') || !searchParams.has('email')) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
        <LockOutlinedIcon/>
      </Avatar>

      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>

      <Box
        component="form"
        id="reset-password-form"
        sx={{mt: 1, width: '100%', maxWidth: '400px'}}
        onSubmit={handleSubmit(submit)}
      >
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          margin="normal"
          required
          disabled
          fullWidth
          value={inputs.email}
          error={!!errors.email}
          helperText={errors.email}
          onInput={handleInput}
        />

        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          margin="normal"
          required
          autoFocus
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
          form="reset-password-form"
          fullWidth
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
          sx={{mt: 3, mb: 2}}
        >
          <span>Reset</span>
        </LoadingButton>
      </Box>
    </Box>
  )
}
