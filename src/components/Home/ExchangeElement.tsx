import React, {ChangeEvent, useMemo, useState, useEffect, memo} from 'react'
import { Autocomplete, Avatar, Card, CardContent, Grid, Paper, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { IExchange, myWalletType, setAmount } from '../../store/exchangeSlice';
import { getCoin } from '../../store/allCoins';
import { BUY, SALE } from './Exchange';


type ExchangeFormProps = {
    type: string
}

type errorExchange = {isError: boolean, textError: string}

const calculateExchange = (amountSale: number | "" | undefined, priceSale: number | null, priceBuy: number | null ): number | "" => {
    //if(amountSale && priceSale && priceBuy) return amountSale * priceSale / priceBuy
    if(amountSale && priceSale && priceBuy) {
        let exchange = amountSale * priceSale / priceBuy
        return +exchange.toFixed(+exchange > 1 ? 3 : 5)
    }
    return ""
}


const ExchangeElement: React.FC<ExchangeFormProps> = ({type}) => {

    const myWallet = useAppSelector<myWalletType[]>(state => state.exchange.myWallet)
    const coinsList = useAppSelector<string[]>(state => state.allCoins.allCoins)
    const {sale, buy} = useAppSelector<IExchange>(state => state.exchange)
    const dispatch = useAppDispatch()
    const [errorAmount, setErrorAmount] = useState<errorExchange>({isError: false, textError: ''})
    //const [errorCoin, setErrorCoin] = useState<errorExchange>({isError: false, textError: ''})
    const currentCoinInWallet = useMemo(() => myWallet.find(coin => coin.id === sale.id), [sale.id, myWallet])
    const [focus, setFocus] = useState({sale: false, buy: false})

    const coinsForExchange = useMemo(() => {
        if(type === SALE) return myWallet.filter(item => item.id !== buy.id).map(item => item.id)
        else if(type === BUY) return coinsList.filter(item => item !== sale.id)
        else return []


    }, [sale.id, buy.id, coinsList, myWallet])

    useEffect(() => {

        // if(sale.id && buy.id && sale.id === buy.id) setErrorCoin({isError: true, textError: 'валюты не должны совпадать'})
        // else setErrorCoin({isError: false, textError: ''})

        if(type === SALE && currentCoinInWallet && sale.amount && currentCoinInWallet.amount < sale.amount) {
            setErrorAmount({isError: true, textError: 'Недостаточно средств'})
        } else setErrorAmount({isError: false, textError: ''})

        if(focus.sale) {
            dispatch(setAmount({type: BUY, value: calculateExchange(sale.amount, sale.currentPrice, buy.currentPrice)}))
        }
        if(focus.buy) {
            dispatch(setAmount({type: SALE, value: calculateExchange(buy.amount, buy.currentPrice, sale.currentPrice)}))
        }
        
    },[sale.amount, buy.amount])


    const handleChange = (event: any, newValue: string | null) => {
        dispatch(getCoin({type, id: newValue}))
    }

    const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        if(+e.target.value < 0) return
        dispatch(setAmount({type, value: e.target.value.length > 0 ? +e.target.value : ''}))
    }


    return (  
        <Paper elevation={8}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom variant='h5'>
                        {type}
                    </Typography>
                    <Grid container alignItems={'start'} spacing={1}>
                        <Grid item xs={12} sm={8}>
                            <Autocomplete
                                value={type === SALE ? sale.id : buy.id}
                                onChange={handleChange}
                                options={coinsForExchange}
                                sx={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params}
                                                            label="Выбрать" 
                                                            required
                                                            onFocus={() => setFocus({...focus, [type]: true})}
                                                            onBlur={() => setFocus({...focus, [type]: false})}
                                                            />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            onFocus={() => setFocus({...focus, [type]: true})}
                            onBlur={() => setFocus({...focus, [type]: false})}
                                error={errorAmount.isError}
                                helperText={errorAmount.textError}
                                disabled={!!sale.id && !!buy.id ? false : true}
                                id="outlined-basic" 
                                label="Сумма" 
                                variant="outlined" 
                                required 
                                value={type === SALE ? sale.amount : buy.amount} 
                                onChange={handleChangeAmount} 
                                type='number'
                            />
                        </Grid>
                        <Grid item xs={'auto'}>
                            {type === SALE ? sale.image && 
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={sale.image}
                                                />
                                            :
                                            buy.image &&
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={buy.image}
                                                />
                            }
                            
                        </Grid>
                        <Grid item xs={true}>
                            <Typography variant='h5' component={'span'}>{type === SALE ? sale?.id : buy?.id}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Paper>
    );
}

export default memo(ExchangeElement);