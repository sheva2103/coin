import { Box } from "@mui/material";
import { useAppSelector } from "../../hooks/hook";
import List from "../AllCoins/List";
import { Outlet, useParams } from "react-router-dom";

const Favorites = () => {

    const list = useAppSelector(state => state.allCoins.favorites)
    const params = useParams()

    return (  
        <Box p={2}>
            {!params.id && <List list={list} link='/favorites/'/>}
            <Outlet />
        </Box>
    );
}

export default Favorites;