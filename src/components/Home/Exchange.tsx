import React from 'react'
import { Grid } from '@mui/material';
import ExchangeElement from './ExchangeElement';
import ConfirmExhange from './ConfirmExchange';

export const SALE = 'sale'
export const BUY = 'buy'

const Exchange: React.FC = () => {

    return (  
        <Grid container component={'article'} sx={{margin: '16px auto'}} justifyContent={'center'} gap={2}>
            <Grid item xs={11} sm={5.5} lg={4} component={'section'}>
                <ExchangeElement type={SALE}/>
            </Grid>
            <Grid item xs={11} sm={5.5} lg={4} component={'section'}>
                <ExchangeElement type={BUY}/>
            </Grid>
            <Grid item xs={11} md={5.5} lg={3} component={'section'}>
                <ConfirmExhange />
            </Grid>
        </Grid>
    );
}

export default Exchange;