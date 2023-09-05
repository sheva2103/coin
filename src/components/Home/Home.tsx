import React from 'react'
import Exchange from './Exchange';
import MyWalletComponent from './MyWallet';
import { Box } from '@mui/system';
import DelayedExchangeTable from './DelayedExchangeTable';
import TopList from '../TopList/TopList';

const Home: React.FC = () => {
    return (  
        <Box>
            <Exchange />
            <MyWalletComponent />
            <DelayedExchangeTable />
            <TopList />
        </Box>
    );
}

export default Home;