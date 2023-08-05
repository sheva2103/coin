import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Backdrop, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import Main from './components/Main/Main';
import { useTheme } from './theme';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { getAllCoins } from './store/allCoins';
import { setDelayedExchange, delayedExchangeType, setMyWallet } from './store/exchangeSlice';
import TransitionsModal from './components/Modal/TransitionsModal';
import { setDarkTheme } from './store/appSlice';


const App: React.FC = () => {

  const dispatch = useAppDispatch()
  const allCoins = useAppSelector(state => state.allCoins.allCoins)
  const loading = useAppSelector(state => state.allCoins.loading)
  const delayedExchange = useAppSelector(state => state.exchange.delayedExchange)
  let isInerval = false

  const theme = useTheme()
  useEffect(() => {

    const darkMode = localStorage.getItem('darkMode')
    if(darkMode) dispatch(setDarkTheme(JSON.parse(darkMode)))

    if(allCoins.length === 0) dispatch(getAllCoins())
    const myWallet = localStorage.getItem('myWallet')
    if(!myWallet) {
      dispatch(setMyWallet([{id: 'usd', amount: 100}]))
    } else dispatch(setMyWallet(JSON.parse(myWallet)))

    const delayedExchangeFromLS = localStorage.getItem('delayedExchange')
    if(delayedExchangeFromLS && delayedExchange.length === 0) {
      const delayedExchangeArray: delayedExchangeType[] = JSON.parse(delayedExchangeFromLS)
      delayedExchangeArray.forEach(item => dispatch(setDelayedExchange(item)))
    }
  },[allCoins, dispatch])

  useEffect(() => {
    
    const interval = setInterval(() => {
      if(delayedExchange.length === 0) clearInterval(interval)
        console.log('interval', isInerval, delayedExchange)
    }, 2000)
    return () => clearInterval(interval)
  },[delayedExchange])

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
