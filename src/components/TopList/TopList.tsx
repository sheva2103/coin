import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../hooks/hook';
import { Box, Container, Stack, Typography } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Название', width: 130 },
    { field: 'current_price', headerName: 'Цена($)', width: 90 },
    { field: 'market_cap_change_percentage_24h', headerName: 'Изменение за 24ч(%)', width: 160 },
    { field: 'market_cap', headerName: 'Капитализация($)', type: 'number', width: 150 }
];

const TopList = () => {

    const list = useAppSelector(state => state.allCoins.listTopCoins)

    return (
        <Box pl={4} pr={4} pb={4}>
            {list.length > 0 &&
                <Stack gap={2}>
                    <hr style={{ border: '1px dotted rgb(25, 118, 210)' }} />
                    <Typography component={'span'} variant='h6' gutterBottom pl={3}>Топ 100 криптовалют</Typography>
                    <Container maxWidth='sm'>
                        <div style={{ height: 'auto', width: '100%' }}>
                            <DataGrid
                                rows={list}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[10]}
                                disableColumnMenu
                            />
                        </div>
                    </Container>
                </Stack>
            }
        </Box>

    );
}

export default TopList;