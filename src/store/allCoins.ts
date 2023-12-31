import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { coinsAPI } from "../api/api";
import { IExchange, setBuy, setSale } from "./exchangeSlice";
import { BUY, SALE } from "../components/Home/Exchange";

export const DELETE = 'delete'
export const ADD = 'add'

export type coins = {
    id: string,
    name: string,
    symbol: string,
    image: string,
    market_cap: number,
    market_cap_change_percentage_24h: number,
    current_price: number
}

type responseAllCoins = {
    data: coins[],
    status: number
}

export type responseCoin = {
    data: coin,
    status: number
}


interface IAllCoins {
    allCoins: string[],
    loading: boolean,
    error: null | string,
    currentCoin: coin | null,
    favorites: string[],
    listTopCoins: coins[]
}

export type coin = {
    id: string,
    market_data: {
        current_price: {
            usd: number
        }
    },
    image: {
        small: string
    }
}

type getCoinType = {
    type: string
    id: string | null
}

const initialState: IAllCoins = {
    allCoins: [],
    loading: false,
    error: null,
    currentCoin: null,
    favorites: [],
    listTopCoins: []
}



export const getAllCoins = createAsyncThunk<coins[], undefined, {rejectValue: string}>('allCoins/getAllCoins', async(_,{ rejectWithValue }) => {

        try {
            const allCoins: responseAllCoins = await coinsAPI.getAllCoins()
            return allCoins.data
        } catch(err) {
            console.log(err)
            return rejectWithValue('Упс, что-то пошло не так... Перезагрузите страницу позже')
        }
        
})

export const getCoin = createAsyncThunk<coin, getCoinType, {rejectValue: string, state: {exchange: IExchange}}>('allCoins/getCoin', async(id, {rejectWithValue, dispatch, getState}) => {
    if(id.id === null) {
        const clearExchange = {amount: 0, id: null, image: null, currentPrice: null, complete: false}
        if(id.type === SALE) {
            dispatch(setSale(clearExchange))
        }
        if(id.type === BUY) {
            dispatch(setBuy(clearExchange))
        }
        return
    } else {
        const coin = ((await coinsAPI.getCoin(id.id)).data)
        try {
            const coinInfo = {id: coin.id, currentPrice: coin.market_data.current_price.usd || null, image: coin.image.large, amount: 0}
            if(id.type === 'sale') dispatch(setSale(coinInfo))
            if(id.type === 'buy') dispatch(setBuy(coinInfo))
            if(id.type === 'getCoin') return coin
        } catch(error) {
            console.log('!!!!!!!!!!!!!!!!' ,error)
            rejectWithValue('Упс, что-то пошло не так... Перезагрузите страницу позже')
        }
    }
})

export const getListTopCoins = createAsyncThunk<coins[], undefined, {rejectValue: string}>('allCoins/getListTopCoins', async(_, {rejectWithValue}) => {
    
    const list: responseAllCoins = await coinsAPI.getTopListCoin()
    if(!list.data) {
        console.log(list)
        rejectWithValue('Упс, что-то пошло не так... Перезагрузите страницу позже99999999999')
    }
    return list.data

})

const allCoinsSlice = createSlice({
    name: 'allCoins',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setCurrentCoin(state, action: PayloadAction<coin>) {
            state.currentCoin = action.payload
        },
        setFavorites(state, action: PayloadAction<{type: string, id: string}>) {
            if(action.payload.type === ADD) state.favorites.push(action.payload.id)
            if(action.payload.type === DELETE) state.favorites = state.favorites.filter(item => item !== action.payload.id)
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCoins.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(getAllCoins.fulfilled, (state, action :PayloadAction<coins[]>) => {
                action.payload.forEach(item => state.allCoins.push(item.id))
                state.loading = false
            })
            .addCase(getAllCoins.rejected, (state, action) => {
                console.log('rejected', action.payload)
                if(typeof action.payload === 'string') {
                    state.loading = false
                    state.error = action.payload
                }
            })
            .addCase(getCoin.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(getCoin.fulfilled, (state, action: PayloadAction<coin>) => {
                state.loading = false
                state.currentCoin = action.payload
            })
            .addCase(getCoin.rejected, (state, action) => {
                if(typeof action.payload === 'string') {
                    state.loading = false
                    state.error = action.payload
                }
            })
            .addCase(getListTopCoins.fulfilled, (state, action: PayloadAction<coins[]>) => {
                state.listTopCoins = [...action.payload]
            })
            // .addMatcher(isError, (state, action: PayloadAction<string>) => {
            //     state.loading = false
            //     state.error = action.payload
            // })
    }
})

// function isError(action: AnyAction) {
//     return action.type.endsWith('rejected')
// }

export const {setLoading, setFavorites} = allCoinsSlice.actions
export default allCoinsSlice.reducer