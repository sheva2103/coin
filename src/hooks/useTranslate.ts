import ruLang from '../locales/ru.json'
import enLang from '../locales/en.json'
import uaLang from '../locales/ua.json'


type lang = {
    sale: string,
    buy: string,
    confirmExchange: string,
    confirm: string,
    select: string,
    myWallet: string,
    delayedExchange: string,
    top100Coin: string,
    name: string,
    price: string,
    change24h: string,
    marketCap: string,
    quantity: string,
    expectedPriceMin: string,
    expectedPriceMax: string,
    type: string,
    sum: string,
    replenishmentAccount: string,
    home: string,
    allCoins: string,
    favorites: string,
    about: string,
    currentPrice: string,
    minPrice90Day: string,
    maxPrice90Day: string,
    addToFavorites: string,
    moreInformation: string
}


export const useTranslate = () => {

    const currentLangFromLS = localStorage.getItem('lang')

    const t = (value: string): string | undefined => {
        let currentLang = ruLang
        if(currentLangFromLS === 'english') currentLang = enLang
        if(currentLangFromLS === 'українська') currentLang = uaLang
        let key: keyof lang    
        for(key in currentLang) {
            if(key === value) return currentLang[key]
        }
        
    }
    return t
}
