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
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';

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
        coinsAPI.getCoinCharts(id)
            .then(data => setPrices(data.data.prices))
            .catch(error => console.log(error))
    }, [])


    return (
        <Paper elevation={3}>
            <Grid container p={2} justifyContent={'center'}>
                <Grid item xs={12}>
                    <Stack spacing={2} pb={2}>
                        <Box sx={{width: 'fit-content', border: '3px solid rgb(25, 118, 210)', borderRadius: '28px'}} component={'span'} p={1}>
                            <Typography variant='h4' width={'auto'}>
                                {id}
                            </Typography>
                        </Box>
                        <Typography variant='h4' gutterBottom>
                            {prices.length && `Текущий курс: ${prices[prices.length - 1][1].toFixed(8)}`}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Line options={options} data={data} />
                </Grid>
            </Grid>
        </Paper>

    );
}

export default AreaChart;