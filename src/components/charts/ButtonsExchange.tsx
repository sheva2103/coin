import { Box } from "@mui/system";
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { useNavigate } from "react-router-dom";
import { getCoin } from "../../store/allCoins";
import { BUY, SALE } from "../Home/Exchange";

type Props = {
    id: string
}

const ButtonsExchange: React.FC<Props> = ({ id }) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
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
                    Купить
            </Button>
            {currentCoinInVallet &&
                <Button variant="contained"
                    sx={{ borderRadius: '24px' }}
                    onClick={() => handleClick(SALE)}>
                        Продать
                </Button>}
        </>
    );
}

export default ButtonsExchange;