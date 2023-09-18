import { Button, Card, CardContent, Paper, Typography } from '@mui/material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setLoading } from '../../store/allCoins';
import { setExchange, setAmount } from '../../store/exchangeSlice';
import { BUY, SALE } from './Exchange';
import { useTranslate } from '../../hooks/useTranslate';

const ConfirmExhange: React.FC = () => {

    const exchange = useAppSelector(state => state.exchange)
    const dispatch = useAppDispatch()
    const t = useTranslate()

    const handleClick = (): void => {
        dispatch(setLoading(true))
        setTimeout(() => {
            if(exchange.sale.id && exchange.sale.amount && exchange.buy.id && exchange.buy.amount) {
                dispatch(setExchange({sale: {id: exchange.sale.id, amount: +exchange.sale.amount.toFixed(exchange.sale.id === 'usd' ? 2 : 8)}, 
                                        buy: {id: exchange.buy.id, amount: +exchange.buy.amount.toFixed(exchange.buy.id === 'usd' ? 2 : 8)}
                                    }))
                dispatch(setAmount({type: SALE, value: ''}))
                dispatch(setAmount({type: BUY, value: ''}))
                dispatch(setLoading(false))
            }
        }, 500)
    }

    return (  
            <Paper elevation={8}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom variant='h5'>
                            {t("confirmExchange")}
                        </Typography>
                        <Button 
                            disabled={exchange.sale.complete === true && exchange.buy.complete === true ? false : true} 
                            variant="contained"
                            onClick={handleClick}
                            >
                                Подтвердить
                        </Button>
                    </CardContent>
                </Card>
            </Paper>
    );
}

export default ConfirmExhange;