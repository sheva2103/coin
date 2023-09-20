import { Grid, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/hook';
import { NavLink } from 'react-router-dom';
import { useTranslate } from '../../hooks/useTranslate';

const coinInWalletStyle = {borderRadius: '4px', backgroundColor: 'rgb(25, 118, 210)', transition: 'all 0.5s', boxShadow: '7px 7px 11px -4px rgba(84,88,94,1)', '&: hover': {backgroundColor: 'rgb(10 74 137)'}}

const MyWalletComponent: FC = () => {

    const myWallet = useAppSelector(state => state.exchange.myWallet)
    const t = useTranslate()

    return (  
        <Box p={4} width={'100%'}>
            {/* <Paper elevation={3} > */}
                <Typography variant='h4' pt={1} pl={1}>{t('myWallet')}</Typography>
                <Grid container>
                    {myWallet.map(item => (
                        <Grid item key={item.id} p={1} m={1} xs={12} sm={4} md={2} sx={coinInWalletStyle}>
                            <Stack direction={'column'}>
                                <Typography variant='body1' component={'span'} gutterBottom sx={{color: 'white'}}>
                                    {item.id !== 'usd' ? <NavLink to={`/allcoins/charts/${item.id}`} style={{color: 'inherit'}}>{item.id}</NavLink> : item.id}
                                </Typography>
                                <Typography variant='h6' component={'span'} sx={{color: 'white'}}>{item.amount}</Typography>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            {/* </Paper> */}
        </Box>
    );
}

export default MyWalletComponent;