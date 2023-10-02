import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';

type Props = {
    technologie: {
        name: string,
        link: string,
        img: string
    }
}

export default function CardTechnologies({technologie}: Props) {
    return (
        <Card sx={{ width: 245 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="245"
                    image={technologie.img}
                    alt={technologie.name}
                />
                <CardContent sx={{textAlign: 'center'}}>
                    <Link href={technologie.link}>
                        <Typography gutterBottom variant="body1" component="span">
                            {technologie.name}
                        </Typography>
                    </Link>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}