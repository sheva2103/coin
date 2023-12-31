import React, { useMemo, useState } from 'react'
import { Stack, Button } from '@mui/material';
import ControlledRadioButtonsGroup from './ControlledRadioButtonsGroup';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SALE } from '../Home/Exchange';
import { myWalletType, setDelayedExchange } from '../../store/exchangeSlice';
import { setLoading } from '../../store/allCoins';
import { coinsAPI } from '../../api/api';
import { useTranslate } from '../../hooks/useTranslate';

type DelayedExchangeModalType = {
    handleClose: () => void
}

type stateButtonType = {
    state: boolean,
    text?: string
}

const DelayedExchangeModal: React.FC<DelayedExchangeModalType> = ({handleClose}) => {

    const myWallet = useAppSelector(state => state.exchange.myWallet)
    const allCoins = useAppSelector(state => state.allCoins.allCoins)
    const delayedExchange = useAppSelector(state => state.exchange.delayedExchange)
    const dispatch = useAppDispatch()
    const t = useTranslate()

    const [type, setType] = React.useState<string | null>(SALE);
    const [coin, setCoin] = React.useState<string | null>(null);
    const listCoinFromWallet = useMemo(() => myWallet.map(item => item.id).filter(item => item !== 'usd'), [myWallet])
    const [inputValue, setInputValue] = React.useState('');
    const [price, setPrice] = useState<number | string>('')
    const [amount, setAmount] = useState<number | string>('')
    const currentCoinFromWallet = useMemo<myWalletType | undefined>(() => myWallet.find(item => item.id === coin),[coin, myWallet])

    const addExchange = async() => {

        if(coin && price && amount && type) {
            dispatch(setLoading(true))
            coinsAPI.getCoin(coin)
                .then(({data}) => {
                    setTimeout(() => {
                        dispatch(setDelayedExchange({id: coin, expectedPrice: +price, amount: +amount, type, img: data.image.large}))
                        dispatch(setLoading(false))
                        handleClose()
                    }, 500)
                })
        }
    }
    
    const stateButton = (): stateButtonType => {
        const currentCoinFromDelayedExchange = delayedExchange.find(item => item.id === coin && item.type === type)
        if(type === SALE && currentCoinFromWallet && currentCoinFromWallet?.amount < +amount) return {state: true}
        if(currentCoinFromDelayedExchange) return {state: true, text: 'Уже добавлено'} //дописать исключения
        return {state: false}
    }
    const isDisabled = stateButton()

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
                renderInput={(params) => <TextField {...params} 
                                                    label={t('select')} 
                                                    error={isDisabled.state}
                                                    helperText={isDisabled.text}
                                                    />}
            />
            <TextField
                value={price}
                onChange={(e) => +e.target.value >= 0 && setPrice(e.target.value)}
                id="outlined-number"
                label={type === SALE ? t('expectedPriceMin') : t('expectedPriceMax')}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{width: '250px'}}
            />
            <TextField
                value={amount}
                onChange={(e) => +e.target.value >= 0 && setAmount(e.target.value)}
                id="outlined-number"
                label={t('quantity')}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{width: '250px'}}
                error={type === SALE && currentCoinFromWallet?.amount ? currentCoinFromWallet?.amount < +amount : false}
                helperText={type === SALE && currentCoinFromWallet && currentCoinFromWallet?.amount < +amount && 'Недостаточно средств'}
            />
            <Button 
                variant="contained"
                onClick={addExchange}
                //disabled={type === SALE && currentCoinFromWallet && currentCoinFromWallet?.amount < +amount}
                disabled={isDisabled.state}
                >{t('confirm')}
            </Button>
        </Stack>
    );
}

export default DelayedExchangeModal;