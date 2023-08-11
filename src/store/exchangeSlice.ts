import { AnyAction, Dispatch, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BUY, SALE } from "../components/Home/Exchange";
import { coinsAPI } from "../api/api";
import { coin } from "./allCoins";
import { AxiosError, AxiosResponse } from "axios";

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
    buy: ExchangeType,
    delayedExchange: delayedExchangeType[],
    error?: string | null
}

type setAmountType = {
    type: string,
    value: number | ""
}

type ExchangeConfirm = {
    sale: myWalletType,
    buy: myWalletType
}

export type delayedExchangeType = {
    id: string,
    expectedPrice: number,
    amount: number,
    type: string,
    delete?: boolean,
    img: string,
    error?: string
}

const checkAnswerCurrentCoinFromWallet = (wallet: myWalletType[], id: string | null): number | undefined => {
    let currentCoin = wallet.find(coin => coin.id === id)
    return currentCoin ? currentCoin.amount : undefined
}

//написать санку для отложенных обменов

const initialState: IExchange = {
    myWallet: [],
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
    },
    delayedExchange: [],
    error: null
}

export const checkDelayedExchange = createAsyncThunk<coin, string, {rejectValue: delayedExchangeType, state: {exchange: IExchange}, dispatch: Dispatch<AnyAction>}>(
    'exchangeSlice/checkDelayedExchange',
    async(id, {rejectWithValue, dispatch, getState}) => {
        try {
            const coin: AxiosResponse<coin> = (await coinsAPI.getCoin(id))
            const currentCoin = getState().exchange.delayedExchange.find(item => item.id === id)
            if(currentCoin) {
                if(currentCoin.type === SALE && currentCoin.expectedPrice <= coin.data.market_data.current_price.usd) {
                    console.log('createAsyncThunk')
                    dispatch(setExchange({
                        sale: {id, amount: currentCoin.amount},
                        buy: { id: 'usd', amount: +(coin.data.market_data.current_price.usd * currentCoin.amount).toFixed(2)}
                    }))
                    dispatch(setDelayedExchange({...currentCoin, delete: true}))
                }
                if(currentCoin.type === BUY && currentCoin.expectedPrice >= coin.data.market_data.current_price.usd) {
                    const sum = currentCoin.amount * coin.data.market_data.current_price.usd
                    const amountUsdInWallet = getState().exchange.myWallet.find(item => item.id === 'usd')?.amount
                    if(amountUsdInWallet && (sum > amountUsdInWallet)) {
                        //rejectWithValue({...currentCoin, error: 'Недостаточно средств'})
                        throw {...currentCoin, error: 'Недостаточно средств'}
                    }
                    if(amountUsdInWallet && sum <= amountUsdInWallet) {
                        dispatch(setExchange({
                            sale: { id: 'usd', amount: sum},
                            buy: {id, amount: currentCoin.amount}
                        }))
                        dispatch(setDelayedExchange({...currentCoin, delete: true}))
                    }
                }
            }
            return coin.data
        } catch(err: any) {
            //console.log(err)
            return rejectWithValue(err)
        }
    }
)


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
            console.log('setExchange')
            state.myWallet = state.myWallet.filter(item => {
                if(item.id === action.payload.sale.id) {
                    item.amount = item.id === 'usd' ? +(item.amount - action.payload.sale.amount).toFixed(2) : item.amount - action.payload.sale.amount
                    if(!item.amount) {
                        state.sale.id = null
                        state.sale.currentPrice = null
                        state.sale.image = null
                    }
                    return item.amount > 0
                }
                if(item.id === action.payload.buy.id) {
                    item.amount = item.id === 'usd' ? +(item.amount + action.payload.buy.amount).toFixed(2) : item.amount + action.payload.buy.amount
                    console.log(item.amount)
                    return true
                }
                return item
            })
            if(!coinForBuy) state.myWallet.push(action.payload.buy)
            localStorage.setItem('myWallet', JSON.stringify(state.myWallet))
        },
        setMyWallet(state, action: PayloadAction<myWalletType[]>) {
            state.myWallet = action.payload
            localStorage.setItem('myWallet', JSON.stringify(action.payload))
        },
        updateMyWallet(state, action: PayloadAction<number>) {
            const usd = state.myWallet.find(item => item.id === 'usd')
            if(!usd) {
                state.myWallet.push({id: 'usd', amount: action.payload})
                localStorage.setItem('myWallet', JSON.stringify(state.myWallet))
                return
            }
            const wallet = state.myWallet.map(item => {
                if(item.id === 'usd') return {...item, amount: item.amount + action.payload}
                return item
            })
            state.myWallet = wallet
            localStorage.setItem('myWallet', JSON.stringify(wallet))
        },
        setDelayedExchange(state, action: PayloadAction<delayedExchangeType>) {
            if(action.payload.delete) {
                state.delayedExchange = state.delayedExchange.filter(item => item.id !== action.payload.id)
            } else {
                state.delayedExchange.push(action.payload)
            }
            localStorage.setItem('delayedExchange', JSON.stringify(state.delayedExchange))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkDelayedExchange.fulfilled, (state, action: PayloadAction<coin>) => {
                const currentCoin = state.delayedExchange.find(item => item.id === action.payload.id)
                if(currentCoin) {
                    if(currentCoin.type === SALE && action.payload.market_data.current_price.usd >= currentCoin.expectedPrice) {
                        setExchange({
                            sale: {id: currentCoin.id, amount: currentCoin.amount},
                            buy: {id: 'usd', amount: action.payload.market_data.current_price.usd * currentCoin.amount}
                        })
                        console.log('проведено')
                    }
                }
            })
            // .addCase(checkDelayedExchange.rejected, (state, action: AnyAction) => {
            //         state.delayedExchange = state.delayedExchange.map(item => (
            //             item.id === action.payload.id ? action.payload : item
            //         ))
            // })
            .addMatcher(isError, (state, action: PayloadAction<delayedExchangeType>) => {
                    state.delayedExchange = state.delayedExchange.map(item => (
                        item.id === action.payload.id ? action.payload : item
                    ))
            })
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export const {setSale, setBuy, setAmount, setExchange, setMyWallet, updateMyWallet, setDelayedExchange} = exchangeSlice.actions
export default exchangeSlice.reducer