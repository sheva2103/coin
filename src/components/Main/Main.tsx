import React, { Suspense, lazy } from 'react'
import { Box, Grid, Stack } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import AllCoins from '../AllCoins/AllCoinst';
//import About from '../About/About';
import SidebarList from '../SidebarList/SidebarList';
import ListCoins from '../AllCoins/ListCoins';
import CoinInfo from '../AllCoins/CoinInfo';
import Favorites from '../Favorites/Favorites';
import BreadcrumbsComponent from '../Breadcrumbs/BreadcrumbsComponent';
import Footer from '../Footer/Footer';


const About = lazy(() => import('../About/About'))

const Main: React.FC = () => {

    return (
        <Grid component={'main'} container direction={'row'} sx={{ height: 'calc(100vh - 64px)' }}>
            <Grid item xs={'auto'} sx={{ height: 'auto', display: { xs: 'none', lg: 'block' } }}>
                <SidebarList />
            </Grid>
            {/* <Grid item xs={true} sx={{ height: 'calc(100vh - 64px)', overflowX: 'auto' }}> */}
            <Grid item xs={true}>
                <Stack direction={'column'} justifyContent={'space-between'} height={'100%'}>
                    <Box>
                        <BreadcrumbsComponent />
                        <Suspense fallback={<div>...loading</div>}>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/allcoins/' element={<AllCoins />}>
                                    <Route path=':page' element={<ListCoins />} />
                                    <Route path='charts/:id' element={<CoinInfo />} />
                                </Route>
                                <Route path='/favorites/' element={<Favorites />}>
                                    <Route path='charts/:id' element={<CoinInfo />} />
                                </Route>
                                <Route path='/about' element={<About />} />
                            </Routes>
                        </Suspense>
                    </Box>
                    <Box sx={{backgroundColor: 'rgb(25, 118, 210)'}}>
                        <Footer />
                    </Box>
                </Stack>

            </Grid>
        </Grid>
    );
}

export default Main;