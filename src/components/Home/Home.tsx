import React from 'react'
import Exchange from './Exchange';
import MyWalletComponent from './MyWallet';
import { Box } from '@mui/system';

const Home: React.FC = () => {
    return (  
        <Box>
            <Exchange />
            <MyWalletComponent />
        </Box>
    );
}

export default Home;