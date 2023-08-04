import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type Props = {
    value: string | null,
    setValue: (value: string) => void
}

const ControlledRadioButtonsGroup: React.FC<Props> = ({value, setValue}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Назначение</FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
        >
            <FormControlLabel value="sale" control={<Radio />} label="sale" />
            <FormControlLabel value="buy" control={<Radio />} label="buy" />
        </RadioGroup>
        {value}
        </FormControl>
    );
}

export default ControlledRadioButtonsGroup