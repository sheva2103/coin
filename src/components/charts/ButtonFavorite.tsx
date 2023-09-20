import { Box } from '@mui/system';
import React, {useMemo} from 'react'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { ADD, DELETE, setFavorites } from '../../store/allCoins';
import { useTranslate } from '../../hooks/useTranslate';

type Props = {
    id: string
}

const ButtonFavorite: React.FC<Props> = ({id}) => {

    const favoriteList = useAppSelector(state => state.allCoins.favorites)
    const isFavorite = useMemo(() => favoriteList.find(item => item === id), [id, favoriteList])
    const dispatch = useAppDispatch()
    const t = useTranslate()

    return (
        <Box>
            {isFavorite ?
                <Tooltip title={t('removeFromFavorites')}>
                    <IconButton sx={{p: 0}} onClick={() => dispatch(setFavorites({type: DELETE, id}))}>
                        <StarIcon sx={{ color: 'gold' }} />
                    </IconButton>
                </Tooltip>
                :
                <Tooltip title={t('addToFavorites')}>
                    <IconButton sx={{p: 0}} onClick={() => dispatch(setFavorites({type: ADD, id}))}>
                        <StarBorderIcon />
                    </IconButton>
                </Tooltip>
            }
        </Box>
    );
}

export default ButtonFavorite;