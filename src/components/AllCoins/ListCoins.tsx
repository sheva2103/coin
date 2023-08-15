import { Stack } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hook';
import { Link as LinkUI, Grid } from '@mui/material';

const ListCoins: React.FC = () => {

    const {page} = useParams<{page: string}>()
    const arrayForCoin = useAppSelector(state => state.allCoins.allCoins)
    const list = arrayForCoin.slice(parseInt(`${page?.split('=')[1]}00`), parseInt(`${page?.split('=')[1]}00`) + 100)


    return (  
            <Grid container item xs={11} md={9} lg={8} sx={{m: '0 auto'}}>
                    {list.map(item => (
                        <Grid item key={item} width={'200px'} p={2}>
                            {/* {<LinkUI href={`charts/${item}`}>{item}</LinkUI>} */}
                            {<NavLink to={`/allCoins/charts/${item}`}>{item}</NavLink>}
                        </Grid>
                    ))}
            </Grid>
    );
}

export default ListCoins;