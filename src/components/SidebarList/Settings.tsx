import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setDarkTheme } from '../../store/appSlice';
import { styled } from '@mui/material/styles';
import flagOfUkraine from '../../images/flags/Ukraine_1474.jpg'

const Item = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#282828' : 'rgb(22 89 155 / 79%)',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '24px',
    marginBottom: '4px'
}));

function BasicAccordion() {

    const darkMode = useAppSelector(state => state.app.darkTheme)
    const dispatch = useAppDispatch()
    const toogleDarkMode = (): void => {
        dispatch(setDarkTheme(!darkMode))
    }
    const [language, setLanguage] = useState('')
    const languages = ['english', 'русский', 'українська']
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event: SelectChangeEvent<typeof language>) => {
        setLanguage(event.target.value);
    };

    return (
        <div>
            <Accordion sx={{ backgroundColor: 'inherit', color: 'inherit' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <SettingsIcon />
                </AccordionSummary>
                <AccordionDetails >
                    <Item>
                        <Switch checked={darkMode} onChange={toogleDarkMode} />
                        <DarkModeIcon />
                    </Item>
                    <Item>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size={'small'}>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                sx={{borderRadius: '24px'}}
                                value={language}
                                onChange={handleChange}
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                            >
                                {languages.map(item => (
                                    <MenuItem key={item} value={item}>
                                        <Stack direction={'row'} gap={1}>
                                            <Avatar sx={{ width: 20, height: 20 }} alt={item} src={flagOfUkraine} />
                                            {item}
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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