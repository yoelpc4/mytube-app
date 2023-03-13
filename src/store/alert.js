import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alerts: [],
  },
  reducers: {
    openAlert(state, { payload }) {
      state.alerts.push(payload)
    },
    closeAlert(state, { payload }) {
      state.alerts = state.alerts.filter((alert, index) => index !== payload)
    },
  },
})

export const { openAlert, closeAlert } = alertSlice.actions

export default alertSlice.reducer
