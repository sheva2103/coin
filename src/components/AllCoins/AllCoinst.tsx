import React from 'react'
import Link from '@mui/material/Link';
import { Box, Stack } from '@mui/material';
import { useAppSelector } from '../../hooks/hook';

const AllCoins: React.FC = () => {

    const coins = useAppSelector(state => state.allCoins.allCoins)

    return (  
        <Box p={2}>
            <Stack direction={'column'}>
                {/* {coins.map(item => <Link href='#' key={item} width={'200px'}>{item}</Link>)} */}
            </Stack>
        </Box>
    );
}

export default AllCoins;
