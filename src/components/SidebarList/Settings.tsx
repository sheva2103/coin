import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Button, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Switch, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setDarkTheme } from '../../store/appSlice';
import { styled } from '@mui/material/styles';
import flagOfUkraine from '../../images/flags/Ukraine_1474.jpg'
import ruFlag from '../../images/flags/ru.png'
import usaFlag from '../../images/flags/usa.png'
import { clearNotifications } from '../../store/exchangeSlice';
import { useTranslate } from '../../hooks/useTranslate';


const Item = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#282828' : 'rgb(22 89 155 / 79%)',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '24px',
    marginBottom: '4px',
    justifyContent: 'center'
}));

const languages1 = [{lang: 'english', flag: usaFlag}, {lang: 'русский', flag: ruFlag}, {lang: 'українська', flag: flagOfUkraine}]

function BasicAccordion() {

    const darkMode = useAppSelector(state => state.app.darkTheme)
    const dispatch = useAppDispatch()
    const t = useTranslate()
    const toogleDarkMode = (): void => {
        dispatch(setDarkTheme(!darkMode))
    }
    const [language, setLanguage] = useState(localStorage.getItem('lang') || 'русский')
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event: SelectChangeEvent<typeof language>) => {
        localStorage.setItem('lang',event.target.value)
        setLanguage(event.target.value);
        document.location.reload()
    };
    const clearNotificationsList = () => {
        dispatch(clearNotifications())
    }

    return (
        <div>
            <Accordion sx={{ backgroundColor: darkMode ? 'inherit' : 'rgb(47 140 233)', color: 'inherit' }}>
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
                                {languages1.map(item => (
                                    <MenuItem key={item.lang} value={item.lang}>
                                        <Stack direction={'row'} gap={1}>
                                            <Avatar sx={{ width: 20, height: 20 }} alt={item.lang} src={item.flag} />
                                            <Typography variant='body1'>{item.lang}</Typography>
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Item>
                    <Item>
                        <Button variant="text"
                                size="small" 
                                sx={{borderRadius: '24px', m: 1, color: 'white'}}
                                onClick={clearNotificationsList}
                                >
                                {t('clearNotifications')}
                        </Button>
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