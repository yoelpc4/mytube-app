import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useForm from '@/hooks/useForm.jsx';
import AuthService from '@/services/AuthService.js'
import { openAlert } from '@/store/alert.js';
import { selectUser, setUser } from '@/store/auth.js';
import { useState } from 'react';

const authService = new AuthService()

export default function EditProfile() {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const {form, errors, isLoading, handleInput, handleSubmit} = useForm({
    data: {
      username: user.username,
      name: user.name,
      email: user.email,
    },
    handleSuccess,
    handleError,
  })

  async function handleSuccess() {
    const updatedUser = await authService.updateProfile(form)

    dispatch(setUser(updatedUser))

    dispatch(openAlert({
      type: 'success',
      message: 'Profile has been updated'
    }))
  }

  function handleError() {
    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while updating profile'
    }))
  }

  return (
    <Grid container spacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 500 }}>
          Edit Profile
        </Typography>
      </Grid>

      <Grid xs={12} md={6}>
        <Box component="form" id="edit-profile-form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            id="username"
            name="username"
            type="text"
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
            id="name"
            name="name"
            type="text"
            label="Name"
            margin="normal"
            required
            fullWidth
            value={form.name}
            error={!!errors.name}
            helperText={errors.name}
            onInput={handleInput}
          />

          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            margin="normal"
            required
            fullWidth
            value={form.email}
            error={!!errors.email}
            helperText={errors.email}
            onInput={handleInput}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              form="edit-profile-form"
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
