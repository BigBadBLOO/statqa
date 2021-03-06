import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface IntegrationPageState {
  selectedRows: SelectedRowIntegration[]
}

// Define the initial state using that type
const initialState: IntegrationPageState = {
  selectedRows: [],
};

export const integrationPageSlice = createSlice({
  name: 'integrationPage',
  initialState,
  reducers: {
    setSelectedRows: (state, action: PayloadAction<SelectedRowIntegration[]>) => {
      state.selectedRows = action.payload
    },
  },
});

export const { setSelectedRows } = integrationPageSlice.actions;
export default integrationPageSlice.reducer