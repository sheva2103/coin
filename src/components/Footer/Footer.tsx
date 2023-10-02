import { Container, Typography } from "@mui/material";


const Footer: React.FC = () => {

    return (  
        <Container maxWidth={'sm'}  sx={{textAlign: 'center', color: 'white'}}>
            <Typography gutterBottom component={'span'} variant="body2">2023</Typography>
        </Container>
    );
}

export default Footer;