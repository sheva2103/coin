import { Grid } from "@mui/material";
import Link from '@mui/material/Link';
import { Box } from "@mui/system";
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
    link?: string,
    list: string[]
}

export const LinkMUI: FC<{link: string, name: string}> = ({link, name}) => {

    const navigate = useNavigate()
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        navigate(link)
    }

    return(
            <Link underline="hover" href={link} onClick={handleClick}>{name}</Link>
    )
}

const List: FC<Props> = ({ link, list }) => {
    return (
        <Grid container item xs={11} md={9} lg={8} sx={{ m: '0 auto' }}>
            {list.map(item => (
                <Grid item key={item} width={'200px'} p={2}>
                    {/* {<NavLink to={`${link ? link : ""}charts/${item}`}>{item}</NavLink>} */}
                    <LinkMUI link={`${link ? link : ""}charts/${item}`} name={item}/>
                </Grid>
            ))}
        </Grid>
    );
}

export default List;
