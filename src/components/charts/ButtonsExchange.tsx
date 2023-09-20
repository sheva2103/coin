import { Box } from "@mui/system";
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { useNavigate } from "react-router-dom";
import { getCoin } from "../../store/allCoins";
import { BUY, SALE } from "../Home/Exchange";
import { useTranslate } from "../../hooks/useTranslate";

type Props = {
    id: string
}

const ButtonsExchange: React.FC<Props> = ({ id }) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const t = useTranslate()
    const currentCoinInVallet = useAppSelector(state => state.exchange.myWallet.find(item => item.id === id))
    const handleClick = (type: string) => {
        dispatch(getCoin({ type, id }))
        navigate('/')
    }

    return (
        <>
            <Button variant="contained"
                sx={{ borderRadius: '24px' }}
                onClick={() => handleClick(BUY)}>
                    {t('buy')}
            </Button>
            {currentCoinInVallet &&
                <Button variant="contained"
                    sx={{ borderRadius: '24px' }}
                    onClick={() => handleClick(SALE)}>
                        {t('sale')}
                </Button>}
        </>
    );
}

export default ButtonsExchange;