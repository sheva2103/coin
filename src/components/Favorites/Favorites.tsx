import { Box } from "@mui/material";
import { useAppSelector } from "../../hooks/hook";
import List from "../AllCoins/List";

const Favorites = () => {

    const list = useAppSelector(state => state.allCoins.favorites)

    return (  
        <Box p={2}>
            <List list={list} link='/allCoins/'/>
        </Box>
    );
}

export default Favorites;