import { configureStore } from '@reduxjs/toolkit'
import userReducer from "@/store/features/userSlice";
import appReducer from "@/store/features/integrationAppSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
