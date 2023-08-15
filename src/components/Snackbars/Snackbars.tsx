import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector } from '../../hooks/hook';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {

    const isOpen = useAppSelector(state => state.allCoins.error)
    const [open, setOpen] = useState(Boolean(isOpen));

    //без useEffect не срабатывает !!!!!!!!!!!!!!!!!??????????????
    useEffect(() => {
        setOpen(Boolean(isOpen))
    },[isOpen])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {isOpen}
                </Alert>
            </Snackbar>
        </Stack>
    );
}