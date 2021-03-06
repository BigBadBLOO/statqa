import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserState {
  currentUser: IUser
}

// Define the initial state using that type
const initialState: UserState = {
  currentUser: {
    email: '',
    username: '',
    isLoading: true
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload
    },
  },
})

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer