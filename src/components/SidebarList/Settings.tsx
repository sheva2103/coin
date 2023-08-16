import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack, Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setDarkTheme } from '../../store/appSlice';
import { styled } from '@mui/material/styles';

const Item = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#282828' : 'rgb(22 89 155 / 79%)',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '24px'
}));

function BasicAccordion() {

    const darkMode = useAppSelector(state => state.app.darkTheme)
    const dispatch = useAppDispatch()
    const toogleDarkMode = (): void => {
        dispatch(setDarkTheme(!darkMode))
    }

    return (
        <div>
            <Accordion sx={{backgroundColor: 'inherit', color: 'inherit'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <SettingsIcon />
                </AccordionSummary>
                <AccordionDetails>
                    <Item>
                        <Switch checked={darkMode} onChange={toogleDarkMode} />
                        <DarkModeIcon />
                    </Item>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const Settings = () => {

    return (
        <BasicAccordion />
    );
}

export default Settings;