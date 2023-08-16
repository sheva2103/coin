import React, {useMemo} from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { notificationsChecked } from '../../store/exchangeSlice';


function SimpleBadge() {

    const notifications = useAppSelector(state => state.exchange.notification)
    const newNotifications = useMemo(() => (notifications.filter(item => !item.checked)), [notifications])

    return (
        <Badge badgeContent={newNotifications.length}>
            <CircleNotificationsIcon />
        </Badge>
    );
}

export default function BasicMenuNotifications() {

    const dispatch = useAppDispatch()
    const notificationAboutExchange = useAppSelector(state => state.exchange.notification)
    const notificationsReverse = [...notificationAboutExchange].reverse()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        dispatch(notificationsChecked())
    };

    return (
        <div style={{ marginLeft: 0 }}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: 'inherit' }}
            >
                <SimpleBadge />
            </Button>
            {notificationAboutExchange.length > 0 &&
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{ height: '300px' }}
                >
                    {notificationsReverse.map((item, index) => (
                        <MenuItem key={item.buy + item.sale + index}
                            onClick={handleClose}
                        >
                            {!item.checked && <NewReleasesIcon sx={{ color: '#2e7d32' }} />}{item.sale}<ArrowRightAltIcon />{item.buy}
                        </MenuItem>
                    ))}
                </Menu>
            }
        </div>
    );
}

