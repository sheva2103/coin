import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import { Stack, Button } from '@mui/material';
import ControlledRadioButtonsGroup from './ControlledRadioButtonsGroup';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SALE } from '../Home/Exchange';
import { addDelayedExchange } from '../../store/exchangeSlice';
import { setLoading } from '../../store/allCoins';

const DelayedExchangeModal: React.FC = () => {

    const myWallet = useAppSelector(state => state.exchange.myWallet)
    const allCoins = useAppSelector(state => state.allCoins.allCoins)
    const dispatch = useAppDispatch()

    const [type, setType] = React.useState<string | null>(SALE);
    const [coin, setCoin] = React.useState<string | null>(null);
    const listCoinFromWallet = useMemo(() => myWallet.map(item => item.id).filter(item => item !== 'usd'), [])
    const [inputValue, setInputValue] = React.useState('');
    const [price, setPrice] = useState<number | string>('')
    const [amount, setAmount] = useState<number | string>('')
    const currentCoinFromWallet = useMemo(() => myWallet.find(item => item.id === coin),[coin])

    const addExchange = (): void => {

        if(coin && price && amount && type) {
            dispatch(setLoading(true))
            setTimeout(() => {
                dispatch(addDelayedExchange({id: coin, expectedPrice: +price, amount: +amount, type}))
                dispatch(setLoading(false))
            }, 500)
        }
    }

    return (  
        <Stack direction={'column'} spacing={2}>
            <ControlledRadioButtonsGroup value={type} setValue={setType} setCoin={setCoin}/>
            <Autocomplete
                value={coin}
                onChange={(event: any, newValue: string | null) => {
                    setCoin(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={type === SALE ? listCoinFromWallet : allCoins}
                sx={{ width: 'auto' }}
                renderInput={(params) => <TextField {...params} label="Выбрать" />}
            />
            <TextField
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id="outlined-number"
                label="Ожидаемая цена"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{width: '200px'}}
            />
            <TextField
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="outlined-number"
                label="Количество"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{width: '200px'}}
                error={type === SALE && currentCoinFromWallet?.amount ? currentCoinFromWallet?.amount < +amount : false}
                helperText={currentCoinFromWallet && currentCoinFromWallet?.amount < +amount && 'Недостаточно средств'}
            />
            <Button 
                variant="contained"
                onClick={addExchange}
                >Подтвердить
            </Button>
        </Stack>
    );
}

export default DelayedExchangeModal;