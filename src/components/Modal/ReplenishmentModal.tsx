import React, { FC } from 'react'
import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../hooks/hook';
import { updateMyWallet } from '../../store/exchangeSlice';
import { setLoading } from '../../store/allCoins';
import { useTranslate } from '../../hooks/useTranslate';

type Props = {
    handleClose: () => void
}

const ReplenishmentModal: FC<Props> = ({handleClose}) => {

    const [amount, setAmount] = React.useState<number | string>('')
    const dispatch = useAppDispatch()
    const t = useTranslate()
    const addMoney = () => {
        if(+amount > 0) {
            dispatch(setLoading(true))
            setTimeout(() => {
            dispatch(updateMyWallet(+amount))
            dispatch(setLoading(false))
            handleClose()
        }, 2000)
        }
    }

    return ( 
        <Stack direction={'column'} spacing={2}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    {t('replenishmentUsdWallet')}
                </Typography>
                    <TextField 
                        type='number'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        autoFocus
                        />
                    <Button 
                        variant="contained"
                        onClick={addMoney}
                        >{t('replenishmentAccount')}
                    </Button>
        </Stack>
    );
}

export default ReplenishmentModal;