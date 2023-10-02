import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { scrollToTop } from './AllCoinst';


const ButtonScrollTop: React.FC = () => {

    const [scroll, setScroll] = useState<number>(0)

    const handleScroll = () => {
        setScroll(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return (  
        <Box sx={{position: 'fixed', top: '75px', right: '20px', display: scroll > 300 ? 'block' : 'none'}}>
            <ArrowCircleUpIcon onClick={scrollToTop} sx={{cursor: 'pointer'}}/>
        </Box>
    );
}

export default ButtonScrollTop;