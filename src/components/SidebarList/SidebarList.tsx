import { Drawer, List, ListItem, ListItemButton, Typography } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';
import style from './SidebarList.module.css'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setMobileMenu } from '../../store/appSlice';


//вынести сюда дарк мод которы будет прятаться в слайдер

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#282828' : 'rgb(25, 118, 210)',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    //color: theme.palette.text.primary,
    color: '#e3f2fd',
    flexGrow: 1,
    width: '100%',
    height: '100%',
}));

interface IActive {
    isActive: boolean
}


const SidebarList: React.FC = () => {

    const mobileMenuIsOpen = useAppSelector(state => state.app.mobileMenuIsOpen)
    const dispatch = useAppDispatch()
    const selectedLink = ({isActive}: IActive): any => isActive ? style.activeLink : ""
    const closeMenu = (): void => {
        dispatch(setMobileMenu(false))
    }

    return (
        <>
            <Item component={'aside'}>
                <List sx={{'& a': {textDecoration: 'none', color: 'inherit'}}}>
                    <ListItemButton sx={{cursor: 'default', p: 0}}>
                        <ListItem>
                            <Typography variant='h5'>
                                <NavLink to={'/'} className={selectedLink}>Главная</NavLink>
                            </Typography>
                        </ListItem>
                    </ListItemButton>
                    <ListItemButton sx={{cursor: 'default', p: 0}}>
                        <ListItem>
                            <Typography variant='h5'>
                                <NavLink to={'/allcoins'} className={selectedLink}>Все монеты</NavLink>
                            </Typography>
                        </ListItem>
                    </ListItemButton>
                    <ListItemButton sx={{cursor: 'default', p: 0}}>
                        <ListItem>
                            <Typography variant='h5'>
                                <NavLink to={'/about'} className={selectedLink}>О нас</NavLink>
                            </Typography>
                        </ListItem>
                    </ListItemButton>
                </List>
            </Item>
            <Drawer open={mobileMenuIsOpen} onClose={closeMenu}>
                <Item>
                    <List sx={{'& a': {textDecoration: 'none', color: 'inherit'}}} onClick={closeMenu}>
                        <ListItem>
                            <Typography gutterBottom variant='h5'>
                                <NavLink to={'/'} className={selectedLink}>Главная</NavLink>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography gutterBottom variant='h5'>
                                <NavLink to={'/allcoins'} className={selectedLink}>Все монеты</NavLink>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography gutterBottom variant='h5'>
                                <NavLink to={'/about'} className={selectedLink}>О нас</NavLink>
                            </Typography>
                        </ListItem>
                    </List>
                </Item>
            </Drawer>
        </>
    );
}

export default React.memo(SidebarList);