import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BUY, SALE } from "../components/Home/Exchange";

export type myWalletType = {
    id: string,
    amount: number,
}


export type ExchangeType = {
    amount: number | "",
    id: string | null,
    image: string | null,
    currentPrice: number | null,
    complete?: boolean,
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

type ExchangeConfirm = {
    sale: myWalletType,
    buy: myWalletType
}

const checkAnswerCurrentCoinFromWallet = (wallet: myWalletType[], id: string | null): number | undefined => {
    let currentCoin = wallet.find(coin => coin.id === id)
    return currentCoin ? currentCoin.amount : undefined
}


const initialState: IExchange = {
    myWallet: [{id: 'usd', 
                amount: 100,}, 
                {id: 'ripple', amount: 200}],
    sale: {
        amount: "",
        id: null,
        image: null,
        currentPrice: null,
        complete: false,
    },
    buy: {
        amount: "",
        id: null,
        image: null,
        currentPrice: null,
        complete: false,
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
            state.sale.complete = false
        },
        setBuy(state, action: PayloadAction<ExchangeType>) {
            state.buy.id = action.payload.id
            state.buy.currentPrice = action.payload.currentPrice
            state.buy.image = action.payload.image
            state.buy.amount = ""
            state.buy.complete = false
        },
        setAmount(state, action: PayloadAction<setAmountType>) {
            if(action.payload.type === SALE) {
                let coin = checkAnswerCurrentCoinFromWallet(state.myWallet, state.sale.id)
                state.sale.amount = action.payload.value
                if(state.sale.amount && state.sale.id && coin && coin >= +action.payload.value) state.sale.complete = true
                else state.sale.complete = false
            }
            if(action.payload.type === BUY) {
                state.buy.amount = action.payload.value
                if(state.buy.amount && state.buy.id && state.buy.currentPrice) state.buy.complete = true
                else state.buy.complete = false
            }
        },
        setExchange(state, action: PayloadAction<ExchangeConfirm>) {
            const coinForBuy = state.myWallet.find(item => item.id === action.payload.buy.id)
            
            state.myWallet = state.myWallet.filter(item => {
                if(item.id === action.payload.sale.id) {
                    item.amount = item.amount - action.payload.sale.amount
                    if(!item.amount) {
                        state.sale.id = null
                        state.sale.currentPrice = null
                        state.sale.image = null
                    }
                    return item.amount > 0
                }
                if(item.id === action.payload.buy.id) {
                    item.amount = item.amount + action.payload.buy.amount
                    return true
                }
                return item
            })
            if(!coinForBuy) state.myWallet.push(action.payload.buy)
        }
    }
})

export const {setSale, setBuy, setAmount, setExchange} = exchangeSlice.actions
export default exchangeSlice.reducer