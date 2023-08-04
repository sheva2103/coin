import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react'
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setModal } from '../../store/appSlice';
import { DELAYED_EXCHANGE } from '../Modal/TransitionsModal';
import DeleteIcon from '@mui/icons-material/Delete';


const Item = styled(Card)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //backgroundColor: 'rgb(102, 187, 106)',
    //backgroundColor: 'rgb(39 120 43 / 38%)',
    background: 'url("https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579") 50%/cover no-repeat;',
    //'&: hover': {backgroundColor: 'rgb(40 135 45)'},
    //...theme.typography.h6,
    //padding: theme.spacing(1),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '16px',
    maxWidth: 345,
    //transition: 'all 0.5s',
    boxShadow: '7px 7px 11px -4px rgba(84,88,94,1)'
}));

const DelayedExchangeTable: FC = () => {

    const dispatch = useAppDispatch()
    const listDelayedExchange = useAppSelector(state => state.exchange.delayedExchange)

    return (  
        <Box p={4}>
            <hr style={{border: '1px dotted rgb(25, 118, 210)'}}/>
            <Button variant="contained" 
                    sx={{margin: '16px 0'}}
                    onClick={() => dispatch(setModal({isOpen: true, type: DELAYED_EXCHANGE}))}
                    >Запланировать обмен
            </Button>
            <Grid container direction={'row'} gap={2}>
                {listDelayedExchange.map(item => (
                    <Grid key={item.id} item xs={12} sm={4} md={3} lg={2}>
                        <Item>
                            <CardContent sx={{backgroundColor: 'rgb(102 187 106 / 90%)', '&: hover': {backgroundColor: 'rgb(40 135 45 / 90%)'}, transition: 'all 0.5s',}}>
                                    <Stack spacing={1}>
                                        <Typography variant='h5' component={'span'}>{item.id}</Typography>
                                        <Typography variant='h5' component={'span'}>Количество: {item.amount}</Typography>
                                        <Typography variant='h5' component={'span'}>Ожидаемая цена: {item.expectedPrice}$</Typography>
                                        <Typography variant='h5' component={'span'}>Тип: {item.type}</Typography>
                                    </Stack>
                                    <DeleteIcon />
                            </CardContent>
                        </Item>
                    </Grid>
                ))}
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <Item>
                        <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant='h5' component={'span'} >название hhhh h uuuuuuuu</Typography>
                                    <Typography variant='h5' component={'span'} >цена</Typography>
                                    <Typography variant='h5' component={'span'} >ожидаемая цена</Typography>
                                </Stack>
                        </CardContent>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <Item>
                        <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant='h5' component={'span'} >название</Typography>
                                    <Typography variant='h5' component={'span'} >цена</Typography>
                                    <Typography variant='h5' component={'span'} >ожидаемая цена</Typography>
                                </Stack>
                        </CardContent>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <Item>
                        <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant='h5' component={'span'} >название</Typography>
                                    <Typography variant='h5' component={'span'} >цена</Typography>
                                    <Typography variant='h5' component={'span'} >ожидаемая цена</Typography>
                                </Stack>
                        </CardContent>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DelayedExchangeTable