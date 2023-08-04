import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react'
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';


const Item = styled(Card)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    backgroundColor: 'rgb(102, 187, 106)',
    '&: hover': {backgroundColor: 'rgb(40 135 45)'},
    //...theme.typography.h6,
    //padding: theme.spacing(1),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '16px',
    maxWidth: 345,
    transition: 'all 0.5s',
    boxShadow: '7px 7px 11px -4px rgba(84,88,94,1)'
}));

const DelayedExchangeTable: FC = () => {


    return (  
        <Box p={4}>
            <hr style={{border: '1px dotted rgb(25, 118, 210)'}}/>
            <Button variant="contained" sx={{margin: '16px 0'}}>Запланировать обмен</Button>
            <Grid container direction={'row'} gap={2}>
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