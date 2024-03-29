import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, { payload }) {
      state.user = payload
    },
    unsetUser(state) {
      state.user = null
    },
  }
})

export const { setUser, unsetUser } = authSlice.actions

export const selectUser = state => state.auth.user

export default authSlice.reducer
