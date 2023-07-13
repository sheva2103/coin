import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BUY, SALE } from "../components/Home/Exchange";

export type myWalletType = {
    id: string,
    amount: number,
    image: string,
    currentPrice: number
}

// type error = {
//     coin: boolean | string,
//     amount: boolean | string
// }

export type ExchangeType = {
    amount?: number | "",
    id: string | null,
    image: string | null,
    currentPrice: number | null,
    complete?: boolean,
    //error?: error
}

export interface IExchange {
    myWallet: myWalletType[]
    sale: ExchangeType,
    buy: ExchangeType
}

type setAmountType = {
    type: string,
    value: number | ""
}


const initialState: IExchange = {
    myWallet: [{id: 'USD', amount: 100, currentPrice: 1, image: 'https://img.freepik.com/premium-vector/dollar-sign-logo-template-illustration-design-vector-eps-10_822766-5925.jpg?w=826'}],
    sale: {
        amount: "",
        id: null,
        image: null,
        currentPrice: null,
        complete: false,
        // error: {
        //     coin: false,
        //     amount: false
        // }
    },
    buy: {
        amount: "",
        id: null,
        image: null,
        currentPrice: null,
        complete: false,
        // error: {
        //     coin: false,
        //     amount: false
        // }
    }
}


const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {
        setSale(state, action: PayloadAction<ExchangeType>) {
            state.sale.id = action.payload.id
            state.sale.currentPrice = action.payload.currentPrice
            state.sale.image = action.payload.image
            state.sale.amount = ""
            if(state.sale.amount && state.sale.id) state.sale.complete = true
            else state.sale.complete = false
        },
        setBuy(state, action: PayloadAction<ExchangeType>) {
            state.buy.id = action.payload.id
            state.buy.currentPrice = action.payload.currentPrice
            state.buy.image = action.payload.image
            state.buy.amount = ""
            if(state.buy.amount && state.buy.id) state.buy.complete = true
            else state.buy.complete = false
        },
        setAmount(state, action: PayloadAction<setAmountType>) {
            if(action.payload.type === SALE) {
                // if(action.payload.value) state.sale.amount = action.payload.value
                // else state.sale.amount = ""
                state.sale.amount = action.payload.value
                if(state.sale.amount && state.sale.id) state.sale.complete = true
                else state.sale.complete = false
            }
            if(action.payload.type === BUY) {
                // if(action.payload.value) state.buy.amount = action.payload.value
                // else state.buy.amount = ""
                state.buy.amount = action.payload.value
                if(state.buy.amount && state.buy.id) state.buy.complete = true
                else state.buy.complete = false
            }
        }
    }
})

export const {setSale, setBuy, setAmount} = exchangeSlice.actions
export default exchangeSlice.reducer