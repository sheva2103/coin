import { NavLink, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import { Link as LinkUI, Grid } from '@mui/material';
import List from './List';

const ListCoins: React.FC = () => {

    const {page} = useParams<{page: string}>()
    const arrayForCoin = useAppSelector(state => state.allCoins.allCoins)
    const list = arrayForCoin.slice(parseInt(`${page?.split('=')[1]}00`), parseInt(`${page?.split('=')[1]}00`) + 100)


    return (  
        <List list={list} link='/allCoins/'/>
    );
}

export default ListCoins;