import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { openAlert } from '@/store/alert.js'
import { selectUser, setUser } from '@/store/auth.js'
import useAsync from '@/hooks/useAsync.jsx'
import useForm from '@/hooks/useForm.jsx'
import client from '@/utils/client.js'

export default function UpdateProfile() {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const {data, error, isLoading, run} = useAsync()

  const {inputs, errors, handleInput, handleSubmit, handleServerErrors} = useForm({
    username: user.username,
    name: user.name,
    email: user.email,
  })

  const submit = () => {
    if (isLoading) {
      return
    }

    run(client.post('auth/update-profile', inputs).then(({data}) => data))
  }

  useEffect(() => {
    if (!data) {
      return
    }

    dispatch(setUser(data))

    dispatch(openAlert({
      type: 'success',
      message: 'Profile has been updated'
    }))
  }, [dispatch, data])

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
      message: 'An error occurred while updating profile'
    }))
  }, [dispatch, error, handleServerErrors])

  return (
    <Grid container spacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h2" variant="h5" sx={{fontWeight: 500}}>
          Update Profile
        </Typography>
      </Grid>

      <Grid xs={12} md={6}>
        <Box component="form" id="update-profile-form" sx={{mt: 1}} onSubmit={handleSubmit(submit)}>
          <TextField
            id="username"
            name="username"
            type="text"
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
            id="name"
            name="name"
            type="text"
            label="Name"
            margin="normal"
            required
            fullWidth
            value={inputs.name}
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
            value={inputs.email}
            error={!!errors.email}
            helperText={errors.email}
            onInput={handleInput}
          />

          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <LoadingButton
              type="submit"
              form="update-profile-form"
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
