import { Box } from "@mui/material";
import AreaChart from "../charts/AreaChart";
import { useParams } from "react-router-dom";

//реализовать Breadcrumbs

const CoinInfo: React.FC = () => {

    const {id} = useParams()

    return (  
        <Box p={2}>
            <AreaChart id={id || 'ripple'}/>
        </Box>
    );
}

export default CoinInfo;