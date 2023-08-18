import { Grid } from "@mui/material";
import { FC } from "react";
import { NavLink } from "react-router-dom";

type Props = {
    link?: string,
    list: string[]
}

const List: FC<Props> = ({ link, list }) => {
    return (
        <Grid container item xs={11} md={9} lg={8} sx={{ m: '0 auto' }}>
            {list.map(item => (
                <Grid item key={item} width={'200px'} p={2}>
                    {/* {<LinkUI href={`charts/${item}`}>{item}</LinkUI>} */}
                    {<NavLink to={`${link ? link : ""}charts/${item}`}>{item}</NavLink>}
                </Grid>
            ))}
        </Grid>
    );
}

export default List;
