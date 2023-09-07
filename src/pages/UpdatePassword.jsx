import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { openAlert } from '@/store/alert.js'
import useAsync from '@/hooks/useAsync.jsx'
import useForm from '@/hooks/useForm.jsx'
import client from '@/utils/client.js'

export default function UpdatePassword() {
  const dispatch = useDispatch()

  const {error, isLoading, isSuccess, run} = useAsync()

  const {inputs, errors, handleInput, handleSubmit, handleServerErrors, handleReset} = useForm({
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  })

  const submit = () => {
    if (isLoading) {
      return
    }

    run(client.post('auth/update-password', inputs))
  }

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    handleReset()

    dispatch(openAlert({
      type: 'success',
      message: 'Password has been updated'
    }))
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
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while updating password'
    }))
  }, [dispatch, error, handleServerErrors])

  return (
    <Grid container rowSpacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h2" variant="h5" sx={{fontWeight: 500}}>
          Update Password
        </Typography>
      </Grid>

      <Grid xs={12} md={6}>
        <Box component="form" id="update-password-form" sx={{mt: 1}} onSubmit={handleSubmit(submit)}>
          <TextField
            id="currentPassword"
            name="currentPassword"
            type="password"
            label="Current Password"
            required
            fullWidth
            autoFocus
            margin="normal"
            value={inputs.currentPassword}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
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
            id="passwordConfirmation"
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

          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <LoadingButton
              type="submit"
              form="update-password-form"
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              sx={{mt: 3, mb: 2}}
            >
              <span>Update</span>
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
