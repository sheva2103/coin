import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink, useLocation } from 'react-router-dom';
import { LinkMUI } from '../AllCoins/List';
import { useTranslate } from '../../hooks/useTranslate';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info(event);
}

const BreadcrumbsComponent: React.FC = () => {

    const location = useLocation()
    const t = useTranslate()
    const path = location.pathname.split('/').filter(name => name === 'charts' ? false : name)

    return (
        <div role="presentation" onClick={handleClick} style={{ padding: '8px 0 0 8px' }}>
            <Breadcrumbs aria-label="breadcrumb">
                {path.length !== 0 &&
                    <LinkMUI link='/' name={t('home')}/>
                }
                {path.map((item, index, arr) => (
                    index !== path.length - 1 ?
                        <LinkMUI 
                            link={`${location.pathname.substring(0, location.pathname.indexOf(item))}${item}`}
                            name={item === '/' ? 'Главная' : t(item)} 
                            key={item}
                            />
                        :
                        <Typography key={item} color="text.primary">{item === '/' ? 'Главная' : t(item)}</Typography>
                ))}
            </Breadcrumbs>
        </div>
    );
}

export default BreadcrumbsComponent;