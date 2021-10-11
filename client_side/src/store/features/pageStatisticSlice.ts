import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface PageStatisticState {
  selectedStatistic: number[]
}

// Define the initial state using that type
const initialState: PageStatisticState = {
  selectedStatistic: [],
}

export const pageStatisticSlice = createSlice({
  name: 'pageStatistic',
  initialState,
  reducers: {
    addSelectedStatistic: (state, action: PayloadAction<number>) => {
      state.selectedStatistic.push(action.payload)
    },
    removeSelectedStatistic: (state, action: PayloadAction<number>) => {
      state.selectedStatistic = state.selectedStatistic.filter(id => id !== action.payload)
    },
  },
})

export const { addSelectedStatistic, removeSelectedStatistic } = pageStatisticSlice.actions
export default pageStatisticSlice.reducer