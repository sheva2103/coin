import { Button, Card, CardContent, Paper, Typography } from '@mui/material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setLoading } from '../../store/allCoins';
import { setExchange, setAmount } from '../../store/exchangeSlice';
import { BUY, SALE } from './Exchange';

const ConfirmExhange: React.FC = () => {

    const exchange = useAppSelector(state => state.exchange)
    const dispatch = useAppDispatch()

    const handleClick = (): void => {
        dispatch(setLoading(true))
        setTimeout(() => {
            if(exchange.sale.id && exchange.sale.amount && exchange.buy.id && exchange.buy.amount) {
                dispatch(setLoading(false))
                dispatch(setExchange({sale: {id: exchange.sale.id, amount: exchange.sale.amount}, 
                                        buy: {id: exchange.buy.id, amount: exchange.buy.amount}
                                    }))
                dispatch(setAmount({type: SALE, value: ''}))
                dispatch(setAmount({type: BUY, value: ''}))
            }
        }, 500)
    }

    return (  
            <Paper elevation={8}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom variant='h5'>
                            Подтвердить обмен
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