import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Backdrop, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import Main from './components/Main/Main';
import { useTheme } from './theme';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { getAllCoins } from './store/allCoins';
import { setMyWallet } from './store/exchangeSlice';
import TransitionsModal from './components/Modal/TransitionsModal';


const App: React.FC = () => {

  const dispatch = useAppDispatch()
  const allCoins = useAppSelector(state => state.allCoins.allCoins)
  const loading = useAppSelector(state => state.allCoins.loading)

  const theme = useTheme()
  useEffect(() => {
    if(allCoins.length === 0) dispatch(getAllCoins())
    const myWallet = localStorage.getItem('myWallet')
    if(!myWallet) {
      dispatch(setMyWallet([{id: 'usd', amount: 100}]))
    } else dispatch(setMyWallet(JSON.parse(myWallet)))
    
  },[allCoins])

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header />
      <Main />
      <TransitionsModal />
    </ThemeProvider>
      
    </>
  );
}

export default App;
