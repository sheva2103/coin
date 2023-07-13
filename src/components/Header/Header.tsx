import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, Stack, Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setDarkTheme, setMobileMenu } from '../../store/appSlice';

interface IHeaderProps {
    // darkMode: boolean,
    // setDarkMode: (darkMode: boolean) => void
}


const Header: React.FC<IHeaderProps> = () => {

    const dispatch = useAppDispatch()
    const darkMode = useAppSelector(state => state.app.darkTheme)
    const mobileMenuIsOpen = useAppSelector(state => state.app.mobileMenuIsOpen)
    const toogleDarkMode = (): void => {
        dispatch(setDarkTheme(!darkMode))
    }
    const openMobileMenu = (): void => {
        dispatch(setMobileMenu(!mobileMenuIsOpen))
    }

    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={true}>

                        </Grid>
                        <Grid item xs={'auto'}>
                            <Stack direction={'row'} spacing={2} sx={{alignItems: 'center'}}>
                                <Stack direction={'row'} sx={{alignItems: 'center'}}>
                                    <Switch checked={darkMode} onChange={ toogleDarkMode } />
                                    <DarkModeIcon />
                                </Stack>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2, display: {xs: 'block', lg: 'none'} }}
                                    onClick={ openMobileMenu }
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Stack>
                            
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header