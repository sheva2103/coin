import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react'
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setModal } from '../../store/appSlice';
import { DELAYED_EXCHANGE } from '../Modal/TransitionsModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { setDelayedExchange } from '../../store/exchangeSlice';
import { NavLink } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import ErrorIcon from '@mui/icons-material/Error';
import ButtonFavorite from '../charts/ButtonFavorite';
import { useTranslate } from '../../hooks/useTranslate';

const cardContentStyle = {backgroundColor: 'rgb(102 187 106 / 90%)', '&: hover': {backgroundColor: 'rgb(40 135 45 / 90%)'}, transition: 'all 0.5s', '&: last-child': {pb: '10px'}, position: 'relative', height: '100%'}

// const Item = styled(Card)(({ theme }) => ({
//     background: `url("https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579") 50%/cover no-repeat;`,
//     color: theme.palette.text.secondary,
//     borderRadius: '16px',
//     maxWidth: 345,
//     boxShadow: '7px 7px 11px -4px rgba(84,88,94,1)',
//     '& a': {textDecoration: 'none',color: 'rgb(10 74 137)'}
// }));

const Item: React.FC<{img: string, children: ReactNode}> = ({img, children}) => {
    
    const CardItem = styled(Card)(({ theme }) => ({
        background: `url("${img}") 50%/cover no-repeat;`,
        color: theme.palette.text.secondary,
        borderRadius: '16px',
        width: 300,
        boxShadow: '7px 7px 11px -4px rgba(84,88,94,1)',
        '& a': {textDecoration: 'none',color: 'rgb(10 74 137)'},
        height: '100%'
    }));
    return (
        <CardItem>
            {children}
        </CardItem>
    )
}

function BasicTooltip() {
        return (
        <div style={{position: 'absolute', top: '10px', right: '10px'}}>
            <Tooltip title="Недостаточно средств">
                <ErrorIcon  sx={{color: 'red'}}/>
            </Tooltip>
        </div>
        );
}

const DelayedExchangeTable: FC = () => {

    const dispatch = useAppDispatch()
    const listDelayedExchange = useAppSelector(state => state.exchange.delayedExchange)
    const t = useTranslate()

    return (  
        <Box p={4}>
            <hr style={{border: '1px dotted rgb(25, 118, 210)'}}/>
            <Button variant="contained" 
                    sx={{margin: '16px 0'}}
                    onClick={() => dispatch(setModal({isOpen: true, type: DELAYED_EXCHANGE}))}
                    >{t('delayedExchange')}
            </Button>
            <Grid container direction={'row'} gap={2}>
                {listDelayedExchange.map(item => (
                    <Grid key={item.id + item.type} item>
                        <Item img={item.img}>
                            <CardContent sx={cardContentStyle}>
                                {item.error && <BasicTooltip />}
                                    <Stack spacing={1} direction={'column'} justifyContent={'space-between'} height={'100%'}>
                                        <Stack direction={'column'}>
                                            <Typography variant='h6' component={'span'}>
                                                <NavLink to={`/allcoins/charts/${item.id}`}>{item.id}</NavLink>
                                            </Typography>
                                            <Typography variant='h6' component={'span'}>{t('quantity')}: {item.amount}</Typography>
                                            <Typography variant='h6' component={'span'}>{t('expectedPriceMin')}: {item.expectedPrice}$</Typography>
                                            <Typography variant='h6' component={'span'}>{t('type')}: {t(item.type)}</Typography>
                                        </Stack>
                                        <Stack direction={'row'} justifyContent={'space-between'}>
                                            <ButtonFavorite id={item.id}/>
                                            <DeleteIcon 
                                                sx={{cursor: 'pointer'}}
                                                onClick={() => dispatch(setDelayedExchange({...item, delete: true}))}
                                                />
                                        </Stack>
                                    </Stack>
                                    
                            </CardContent>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default DelayedExchangeTable