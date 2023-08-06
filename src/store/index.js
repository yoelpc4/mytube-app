import { configureStore } from '@reduxjs/toolkit'
import auth from './auth.js'
import alert from './alert.js'
import csrf from './csrf.js';

export default configureStore({
  reducer: {
    auth,
    alert,
    csrf,
  },
})
