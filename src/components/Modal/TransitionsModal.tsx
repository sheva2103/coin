import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setModal } from '../../store/appSlice';
import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { updateMyWallet } from '../../store/exchangeSlice';
import { setLoading } from '../../store/allCoins';

export const DELAYED_EXCHANGE = 'DELAYED_EXCHANGE'
export const TEPLENISHMENT = 'TEPLENISHMENT'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth > 400 ? 400 : 300,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '4px',
  p: 2,
};

export default function TransitionsModal() {

  const isOpen = useAppSelector(state => state.app.modal)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(setModal(false));
  const [amount, setAmount] = React.useState<number | string>('')
  const addMoney = () => {
    if(+amount > 0) {
      dispatch(setLoading(true))
      setTimeout(() => {
        dispatch(updateMyWallet(+amount))
        dispatch(setLoading(false))
        handleClose()
      }, 2000)
    }
  }

  return (
    <div>
      <Modal
        sx={{zIndex: (theme) => theme.zIndex.drawer - 1}}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            
            <Stack direction={'column'} spacing={2}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Пополнить usd кошелёк
              </Typography>
                <TextField 
                      type='number'
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      autoFocus
                      />
                <Button 
                    variant="contained"
                    onClick={addMoney}
                    >Добавить
                </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}