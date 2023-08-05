import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setModal } from '../../store/appSlice';
import ReplenishmentModal from './ReplenishmentModal';
import DelayedExchangeModal from './DelayedExchangeModal';

export const DELAYED_EXCHANGE = 'DELAYED_EXCHANGE'
export const REPLENISHMENT = 'TEPLENISHMENT'

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

  const modal = useAppSelector(state => state.app.modal)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(setModal({isOpen: false, type: ''}));

  return (
    <div>
      <Modal
        sx={{zIndex: (theme) => theme.zIndex.drawer - 1}}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal.isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modal.isOpen}>
          <Box sx={style}>
            {modal.type === REPLENISHMENT &&
              <ReplenishmentModal handleClose={handleClose}/>
            }
            {modal.type === DELAYED_EXCHANGE &&
              <DelayedExchangeModal handleClose={handleClose}/>
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}