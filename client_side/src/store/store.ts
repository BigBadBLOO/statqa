import { configureStore } from '@reduxjs/toolkit'
import userReducer from "@/store/features/userSlice";
import appReducer from "@/store/features/integrationAppSlice";
import alertReducer from "@/store/features/alertSlice";
import statisticReducer from "@/store/features/statisticSlice";
import integrationPageReducer from "@/store/features/integrationPageSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    statistic: statisticReducer,
    alert: alertReducer,
    integrationPage: integrationPageReducer,
  },
})
console.log(typeof store.getState)
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
