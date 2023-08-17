import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined.js'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import { unsetUser } from '@/store/auth.js'
import { openAlert } from '@/store/alert.js'
import useAsync from '@/hooks/useAsync.jsx'
import client from '@/utils/client.js'

export default function ListItemLogout() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {error, isLoading, isSuccess, run} = useAsync()

  const handleClick = () => {
    if (isLoading) {
      return
    }

    run(client.post('auth/logout'))
  }

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    dispatch(unsetUser())

    navigate('/')
  }, [dispatch, navigate, isSuccess])

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while logging out'
    }))
  }, [dispatch, error])

  return (
    <ListItem disablePadding>
      <ListItemButton disabled={isLoading} onClick={handleClick}>
        <ListItemIcon>
          <LogoutOutlinedIcon/>
        </ListItemIcon>

        <ListItemText primary="Logout"/>
      </ListItemButton>
    </ListItem>
  )
}
