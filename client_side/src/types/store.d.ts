import store from "@/store/store";

declare type AppDispatch = typeof store.dispatch
declare type RootState = ReturnType<typeof store.getState>