import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import exchangeSlice from "./exchangeSlice";
import allCoinsSlice from './allCoins'

const store = configureStore({
    reducer: {
        app: appSlice,
        exchange: exchangeSlice,
        allCoins: allCoinsSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch