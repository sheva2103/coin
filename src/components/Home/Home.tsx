import React from 'react'
import Exchange from './Exchange';
import MyWalletComponent from './MyWallet';
import { Box } from '@mui/system';
import DelayedExchangeTable from './DelayedExchangeTable';

const Home: React.FC = () => {
    return (  
        <Box>
            <Exchange />
            <MyWalletComponent />
            <DelayedExchangeTable />
        </Box>
    );
}

export default Home;