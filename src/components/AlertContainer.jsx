import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material'
import Alert from '@mui/material/Alert'
import { closeAlert, selectAlerts } from '../store/alert.js'

export default function AlertContainer() {
  const dispatch = useDispatch()

  const theme = useTheme()

  const alerts = useSelector(selectAlerts)

  function onClose(index) {
    dispatch(closeAlert(index))
  }

  return (
    <>
      {alerts.map((alert, index) =>
        <Alert
          key={index}
          variant="filled"
          severity={alert.type ?? 'info'}
          sx={{
            position: 'absolute',
            top: index * 60 + 10,
            right: 10,
            zIndex: theme.zIndex.snackbar,
          }}
          onClose={() => onClose(index)}
        >
          {alert.message}
        </Alert>
      )}
    </>
  )
}
