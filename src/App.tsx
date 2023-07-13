import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Backdrop, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import Main from './components/Main/Main';
import { useTheme } from './theme';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import { getAllCoins } from './store/allCoins';


const App: React.FC = () => {

  const dispatch = useAppDispatch()
  const allCoins = useAppSelector(state => state.allCoins.allCoins)
  const loading = useAppSelector(state => state.allCoins.loading)

  const theme = useTheme()
  useEffect(() => {
    if(allCoins.length === 1) dispatch(getAllCoins())
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
    </ThemeProvider>
      
    </>
  );
}

export default App;
