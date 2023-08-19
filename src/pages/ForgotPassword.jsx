import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
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

export default function ForgotPassword() {
  const dispatch = useDispatch()

  const {error, isLoading, isSuccess, run} = useAsync()

  const {inputs, errors, setErrors, handleInput, handleSubmit, handleServerErrors, handleReset} = useForm({
    email: '',
  })

  const submit = () => {
    if (isLoading) {
      return
    }

    run(client.post('auth/forgot-password', {
      email: inputs.email,
    }).then(({data}) => data))
  }

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    dispatch(openAlert({
      type: 'success',
      message: 'A reset password link has been sent to your email',
    }))

    handleReset()
  }, [dispatch, isSuccess, handleReset])

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

      if (response.status === 424) {
        dispatch(openAlert({
          type: 'error',
          message: response.data.message,
        }))

        return
      }
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while sending reset password link email',
    }))
  }, [dispatch, error, setErrors, handleServerErrors])

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
        <LockOutlinedIcon/>
      </Avatar>

      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>

      <Typography component="h2" variant="caption" sx={{ mt: 1 }}>
        Please provide an email address and we will send you a reset password link
      </Typography>

      <Box
        component="form"
        id="forgot-password-form"
        sx={{mt: 1, width: '100%', maxWidth: '400px'}}
        onSubmit={handleSubmit(submit)}
      >
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          required
          fullWidth
          autoFocus
          margin="normal"
          value={inputs.email}
          error={!!errors.email}
          helperText={errors.email}
          onInput={handleInput}
        />

        <LoadingButton
          type="submit"
          form="forgot-password-form"
          fullWidth
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
          sx={{mt: 3, mb: 2}}
        >
          <span>Send</span>
        </LoadingButton>
      </Box>
    </Box>
  )
}
