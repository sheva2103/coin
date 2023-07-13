import axios, { AxiosInstance, AxiosResponse } from "axios";

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

const instance: AxiosInstance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins/'
})

export const coinsAPI = {
    getAllCoins: () => {
        return instance.get('list')
    },
    getCoin: (id: string) => {
        return instance.get(id)
    }
}

