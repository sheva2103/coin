import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type appState = {
    darkTheme: boolean,
    mobileMenuIsOpen: boolean,
    modal: Modal
}

type Modal = {
    isOpen: boolean,
    type: string
}


const initialState: appState = {
    darkTheme: false,
    mobileMenuIsOpen: false,
    modal: {
        isOpen: false,
        type: ''
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDarkTheme(state, action: PayloadAction<boolean>) {
            state.darkTheme = action.payload
            localStorage.setItem('darkMode', JSON.stringify(action.payload))
        },
        setMobileMenu(state, action: PayloadAction<boolean>) {
            state.mobileMenuIsOpen = action.payload
        },
        setModal(state, action: PayloadAction<Modal>) {
            state.modal.isOpen = action.payload.isOpen
            state.modal.type = action.payload.type
        }
    }
})

export const {setDarkTheme, setMobileMenu, setModal} = appSlice.actions
export default appSlice.reducer
