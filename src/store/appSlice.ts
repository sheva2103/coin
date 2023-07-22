import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type appState = {
    darkTheme: boolean,
    mobileMenuIsOpen: boolean,
    modal: boolean
}

const initialState: appState = {
    darkTheme: false,
    mobileMenuIsOpen: false,
    modal: false
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
        },
        setModal(state, action: PayloadAction<boolean>) {
            state.modal = action.payload
        }
    }
})

export const {setDarkTheme, setMobileMenu, setModal} = appSlice.actions
export default appSlice.reducer
