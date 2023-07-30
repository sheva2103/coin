import React from 'react'
import Exchange from './Exchange';
import MyWalletComponent from './MyWallet';
import { Box } from '@mui/system';
import CoinInfo from '../AllCoins/CoinInfo';

const Home: React.FC = () => {
    return (  
        <Box>
            <Exchange />
            <MyWalletComponent />
            <CoinInfo />
        </Box>
    );
}

export default Home;