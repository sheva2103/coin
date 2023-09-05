import axios, { AxiosInstance, AxiosResponse } from "axios";
import { type } from "os";

export type getCoinResponseType = {
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

type getCoinCharts = {
    prices: number[][]
}

const instance: AxiosInstance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins/'
})

//сделать топ100 с таблицей

export const coinsAPI = {
    getAllCoins: () => {
        return instance.get('list')
    },
    getCoin: (id: string) => {
        return instance.get(id)
    },
    getCoinCharts: (id: string) => {
        return instance.get<getCoinCharts>(`${id}/market_chart?vs_currency=usd&days=90`)
    },
    getTopListCoin() {
        return instance.get('markets?vs_currency=usd&order=%20market_cap_asc&per_page=100&page=1&sparkline=false&locale=en')
    }
}

