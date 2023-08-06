import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useForm from '@/hooks/useForm.jsx';
import AuthService from '@/services/AuthService.js'
import { openAlert } from '@/store/alert.js';

const authService = new AuthService()

export default function EditPassword() {
  const dispatch = useDispatch()

  const {form, errors, isLoading, handleInput, handleSubmit, handleReset} = useForm({
    data: {
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
    },
    handleSuccess,
    handleError,
  })

  async function handleSuccess() {
    await authService.updatePassword(form)

    handleReset()

    dispatch(openAlert({
      type: 'success',
      message: 'Password has been updated'
    }))
  }

  function handleError() {
    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while updating password'
    }))
  }

  return (
    <Grid container spacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 500 }}>
          Edit Password
        </Typography>
      </Grid>

      <Grid xs={12} md={6}>
        <Box component="form" id="edit-password-form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            id="currentPassword"
            name="currentPassword"
            type="password"
            label="Current Password"
            required
            fullWidth
            autoFocus
            margin="normal"
            value={form.currentPassword}
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
            value={form.password}
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
            value={form.passwordConfirmation}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation}
            onInput={handleInput}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              form="edit-password-form"
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              <span>Update</span>
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
