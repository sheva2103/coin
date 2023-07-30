import { Box, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/hook";
import { getCoin } from "../../store/allCoins";
import AreaChart from "../charts/AreaChart";



const CoinInfo: React.FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        //dispatch(getCoin({type: 'getCoin', id: 'ripple'}))
    },[])

    return (  
        <Box p={2}>
            <AreaChart id="ripple"/>
        </Box>
    );
}

export default CoinInfo;