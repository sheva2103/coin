import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type appState = {
    darkTheme: boolean,
    mobileMenuIsOpen: boolean
}

const initialState: appState = {
    darkTheme: false,
    mobileMenuIsOpen: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDarkTheme(state, action: PayloadAction<boolean>) {
            state.darkTheme = action.payload
        },
        setMobileMenu(state, action: PayloadAction<boolean>) {
            state.mobileMenuIsOpen = action.payload
        }
    }
})

export const {setDarkTheme, setMobileMenu} = appSlice.actions
export default appSlice.reducer
