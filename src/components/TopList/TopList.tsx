import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../hooks/hook';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useTranslate } from '../../hooks/useTranslate';



// const columns: GridColDef[] = [
//     { field: 'id', headerName: t('name'), width: 130 },
//     { field: 'current_price', headerName: `${t('price')}($)`, width: 90 },
//     { field: 'market_cap_change_percentage_24h', headerName: `${t('change24h')}(%)`, width: 160 },
//     { field: 'market_cap', headerName: `${t('marketCap')}($)`, type: 'number', width: 150 }
// ];

const returnColumns = (t: (value: string) => any) :GridColDef[]  => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: t('name'), width: 130 },
        { field: 'current_price', headerName: `${t('price')}($)`, width: 90 },
        { field: 'market_cap_change_percentage_24h', headerName: `${t('change24h')}(%)`, width: 160 },
        { field: 'market_cap', headerName: `${t('marketCap')}($)`, type: 'number', width: 150 }
    ];
    return columns
}

const TopList = () => {

    const list = useAppSelector(state => state.allCoins.listTopCoins)
    const t = useTranslate()

    return (
        <Box pl={4} pr={4} pb={4}>
            {list.length > 0 &&
                <Stack gap={2}>
                    <hr style={{ border: '1px dotted rgb(25, 118, 210)' }} />
                    <Typography component={'span'} variant='h6' gutterBottom pl={3}>{t('top100Coin')}</Typography>
                    <Container maxWidth='sm'>
                        <div style={{ height: 'auto', width: '100%' }}>
                            <DataGrid
                                rows={list}
                                columns={returnColumns(t)}
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