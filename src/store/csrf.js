import { createSlice } from '@reduxjs/toolkit';

const name = 'csrf'

const csrfSlice = createSlice({
  name,
  initialState: {
    token: null,
  },
  reducers: {
    setToken(state, { payload }) {
      state.token = payload
    },
  },
})

export const { setToken } = csrfSlice.actions

export default csrfSlice.reducer
