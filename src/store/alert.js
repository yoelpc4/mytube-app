import { createSlice } from '@reduxjs/toolkit';

const name = 'alert'

const alertSlice = createSlice({
  name,
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

export const selectAlerts = state => state[name].alerts

export default alertSlice.reducer
