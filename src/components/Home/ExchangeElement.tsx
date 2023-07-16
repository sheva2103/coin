import React, {ChangeEvent, useMemo, useState, useEffect, useRef} from 'react'
import { Autocomplete, Avatar, Card, CardContent, Grid, Paper, TextField, Typography, useFormControl } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { IExchange, myWalletType, setAmount } from '../../store/exchangeSlice';
import { getCoin } from '../../store/allCoins';
import { BUY, SALE } from './Exchange';


type ExchangeFormProps = {
    type: string
}

type errorExchange = {isError: boolean, textError: string}

function createArrayString(arr: myWalletType[]): string[] {
    return arr.map(item => item.id)
}

const calculateExchange = (amountSale: number | "" | undefined, priceSale: number | null, priceBuy: number | null ): number | "" => {
    //if(amountSale && priceSale && priceBuy) return amountSale * priceSale / priceBuy
    if(amountSale && priceSale && priceBuy) {
        let exchange = amountSale * priceSale / priceBuy
        return +exchange.toFixed(3)
    }
    return ""
}


const ExchangeElement: React.FC<ExchangeFormProps> = ({type}) => {

    const myWallet = useAppSelector<myWalletType[]>(state => state.exchange.myWallet)
    const coinsList = useAppSelector<string[]>(state => state.allCoins.allCoins)
    const {sale, buy} = useAppSelector<IExchange>(state => state.exchange)
    const dispatch = useAppDispatch()
    const [errorAmount, setErrorAmount] = useState<errorExchange>({isError: false, textError: ''})
    const [errorCoin, setErrorCoin] = useState<errorExchange>({isError: false, textError: ''})
    const currentCoinInWallet = useMemo(() => myWallet.find(coin => coin.id === sale.id), [sale.id])
    const [focus, setFocus] = useState({sale: false, buy: false})

    useEffect(() => {

        if(sale.id && buy.id && sale.id === buy.id) setErrorCoin({isError: true, textError: 'валюты не должны совпадать'})
        else setErrorCoin({isError: false, textError: ''})

        if(type === SALE && currentCoinInWallet?.amount && sale.amount && currentCoinInWallet?.amount < sale.amount) {
            setErrorAmount({isError: true, textError: 'много'})
        } else setErrorAmount({isError: false, textError: ''})

        if(focus.sale) {
            console.log('useeffect sale')
            dispatch(setAmount({type: BUY, value: calculateExchange(sale.amount, sale.currentPrice, buy.currentPrice)}))
        }
        if(focus.buy) {
            console.log('useeffect buy')
            dispatch(setAmount({type: SALE, value: calculateExchange(buy.amount, buy.currentPrice, sale.currentPrice)}))
        }
        
    },[sale, buy])


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
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item xs={12} sm={8}>
                            <Autocomplete
                                value={type === SALE ? sale.id : buy.id}
                                onChange={handleChange}
                                options={ type === SALE ? createArrayString(myWallet) : coinsList}
                                sx={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params}
                                                            label="Выбрать" 
                                                            required
                                                            error={errorCoin.isError}
                                                            helperText={errorCoin.textError}
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
                                //disabled={type === SALE ? !sale.id : !buy.id}
                                disabled={!!sale.id && !!buy.id && !errorCoin.isError ? false : true}
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

export default ExchangeElement;