import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { coinsAPI } from '../../api/api';
import moment from 'moment';
import { Box, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import ButtonFavorite from './ButtonFavorite';
import ButtonsExchange from './ButtonsExchange';
import { useAppDispatch } from '../../hooks/hook';
import { setLoading } from '../../store/allCoins';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            //position: 'top' as const,
            display: false
        },
        // title: {
        //     display: true,
        //     text: 'Chart.js Line Chart',
        // },
    },
    scales: {
        x: {
            display: false
        }
    }
};


type Props = {
    id: string
}


const AreaChart: React.FC<Props> = ({ id }) => {

    const [prices, setPrices] = useState<number[][]>([])
    const maxMinPrice = [...prices].sort((a, b) => a[1] - b[1])
    const dispatch = useAppDispatch()

    const data = {
        labels: prices.map(item => moment(item[0]).format('DD.MM.YY')),
        datasets: [
            {
                fill: true,
                label: 'Цена',
                data: prices.filter(item => item[1]),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    useEffect(() => {
        dispatch(setLoading(true))
        coinsAPI.getCoinCharts(id)
            .then(data => {
                console.log(data.data)
                setPrices(data.data.prices)
                dispatch(setLoading(false))
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <Paper elevation={3}>
            <Grid container p={2} justifyContent={'center'} direction={'row'}>
                <Grid item xs={12} lg={4}>
                    <Stack spacing={1} pb={2} gap={1}>
                        <Box sx={{ width: 'fit-content', border: '3px solid rgb(25, 118, 210)', borderRadius: '28px' }} component={'span'} p={1}>
                            <Typography variant='h6' width={'auto'}>
                                {id}
                            </Typography>
                        </Box>
                        <Typography variant='h6' gutterBottom>
                            {prices.length && `Текущий курс: ${prices[prices.length - 1][1].toFixed(8)}`}
                        </Typography>
                        {maxMinPrice.length &&
                            <Box pb={1}>
                                <Typography variant='body1'>Мин.цена за 90 дней: 
                                    <Typography component={'span'} sx={{color: 'rgb(25, 118, 210)'}}>  {maxMinPrice[0][1].toFixed(8)}$</Typography>
                                </Typography>
                                <Typography variant='body1'>Макс.цена за 90 дней: 
                                    <Typography component={'span'} sx={{color: 'rgb(25, 118, 210)'}}>  {maxMinPrice[maxMinPrice.length - 1][1].toFixed(8)}$</Typography>
                                </Typography>
                            </Box>
                        }
                        <Stack direction={'row'} gap={2} alignItems={'center'}>
                            <ButtonFavorite id={id} />
                            <ButtonsExchange id={id} />
                        </Stack>
                        <Link href={`https://www.coingecko.com/en/coins/${id}`}>Больше информации</Link>
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Line options={options} data={data} />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AreaChart;