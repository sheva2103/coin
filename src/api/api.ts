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

export const coinsAPI = {
    getAllCoins: () => {
        return instance.get('list')
    },
    getCoin: (id: string) => {
        return instance.get(id)
    },
    getCoinCharts: (id: string) => {
        return instance.get<getCoinCharts>(`${id}/market_chart?vs_currency=usd&days=90`)
    }
}

