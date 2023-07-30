import { Box, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/hook";
import { getCoin } from "../../store/allCoins";
import AreaChart from "../charts/AreaChart";
import { useParams } from "react-router-dom";



const CoinInfo: React.FC = () => {

    const {id} = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        //dispatch(getCoin({type: 'getCoin', id: 'ripple'}))
    },[])

    return (  
        <Box p={2}>
            <AreaChart id={id || 'ripple'}/>
        </Box>
    );
}

export default CoinInfo;