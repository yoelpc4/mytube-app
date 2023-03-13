import { configureStore } from '@reduxjs/toolkit'
import auth from './auth.js'
import alert from './alert.js'

export default configureStore({
  reducer: {
    auth,
    alert,
  },
})
