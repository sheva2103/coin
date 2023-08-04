import React, { FC } from 'react'
import { Stack } from '@mui/material';
import ControlledRadioButtonsGroup from './ControlledRadioButtonsGroup';

const DelayedExchangeModal: React.FC = () => {

    const [type, setType] = React.useState<string | null>(null);

    return (  
        <Stack direction={'column'} spacing={2}>
            <ControlledRadioButtonsGroup value={type} setValue={setType}/>
        </Stack>
    );
}

export default DelayedExchangeModal;