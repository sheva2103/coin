import React from 'react'
import { Grid } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import AllCoins from '../AllCoins/AllCoinst';
import About from '../About/About';
import SidebarList from '../SidebarList/SidebarList';


const Main :React.FC = () => {

    
    
    return (  
            <Grid component={'main'} container direction={'row'} sx={{minHeight: '100vh'}}>
                <Grid item xs={1.5} sx={{height: 'auto', display: {xs: 'none', lg: 'block'}}}>
                        <SidebarList />
                </Grid>
                <Grid item xs={true} sx={{height: '100%'}}>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/allcoins' element={<AllCoins />}/>
                        <Route path='/about' element={<About />}/>
                    </Routes>
                </Grid>
            </Grid>
    );
}

export default Main;