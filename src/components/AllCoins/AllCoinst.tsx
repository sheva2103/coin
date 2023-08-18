import React, { ChangeEvent, useState } from 'react'

import { Box, PaginationItem, Link as LinkUI, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks/hook';
import Pagination from '@mui/material/Pagination';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import List from './List';


function scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}

const AllCoins: React.FC = (props) => {

    const coins = useAppSelector(state => state.allCoins.allCoins)
    const pages = Math.floor(coins.length / 100)
    const params = useParams<{page?: string, id?: string}>()
    const [page, setPage] = useState<number>(params.hasOwnProperty('page') ? parseInt(`${params.page?.split('=')[1]}`) : 1)
    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value)
        scrollToTop()
    }
    const firstPage = coins.slice(0, 100)

    return (  
        <Box p={2}>
            {page == 1 && !params.id && <List list={firstPage}/>}
            <Outlet />
            {!params.id &&
                    <Pagination 
                    sx={{'& ul': {justifyContent: 'center'}}}
                    count={pages} 
                    color="primary" 
                    page={page}
                    onChange={handleChange}
                    renderItem={(item) => (
                        <PaginationItem 
                            component={Link}
                            to={`${item.page ===  1 ? '' : `page=${item.page}`}`}
                            {...item}
                        />
                    )}
                    />
            }
        </Box>
    );
}

export default AllCoins;
