import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AlertState {
  index: number
  alerts: { [key: number] : Message}
}

// Define the initial state using that type
const initialState: AlertState = {
  index: 0,
  alerts: {}
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Message>) => {
      state.index += 1
      state.alerts[state.index] = action.payload
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      delete state.alerts[action.payload]
    },
  },
})

export const { addAlert, removeAlert } = alertSlice.actions
export default alertSlice.reducer