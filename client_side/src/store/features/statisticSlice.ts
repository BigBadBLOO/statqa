import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
interface StatisticState {
  statistics: Statistic[]
}

// Define the initial state using that type
const initialState: StatisticState = {
  statistics:[],
};

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setStatistics: (state, action: PayloadAction<Statistic[]>) => {
      state.statistics = action.payload
    },
  },
})

export const { setStatistics } = statisticSlice.actions;
export const statistics = (state: RootState) => state.statistic.statistics;

export default statisticSlice.reducer