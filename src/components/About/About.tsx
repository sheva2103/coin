import React from 'react'
import html from '../../images/html5.png'
import css from '../../images/css3.jpg'
import react from '../../images/react.png'
import redux from '../../images/redux.jpg'
import material from '../../images/material.png'
import firebase from '../../images/firebase.png'
import ts from '../../images/ts.png'
import coinGecko from '../../images/coingecko.png'
import { Box, Stack } from '@mui/material'
import CardTechnologies from './CardTechnologies'


const technologies = [
    {name: 'HTML5',
    link: 'https://ru.wikipedia.org/wiki/HTML5',
    img: html
    },
    {name: 'CSS3',
    link: 'https://ru.wikipedia.org/wiki/CSS',
    img: css
    },
    {name: 'React',
    link: 'https://react.dev/',
    img: react
    },
    {name: 'Redux',
    link: 'https://redux.js.org/',
    img: redux
    },
    {name: 'Material UI',
    link: 'https://mui.com/',
    img: material
    },
    {name: 'Firebase',
    link: 'https://firebase.google.com/',
    img: firebase
    },
    {name: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
    img: ts
    },
    {name: 'CoinGecko',
    link: 'https://www.coingecko.com/',
    img: coinGecko
    },
]

const About: React.FC = () => {
    return (  
        <Box p={2}>
            <Stack direction={'row'} justifyContent={'center'} flexWrap={'wrap'} gap={2}>
                {technologies.map(item => (
                    <CardTechnologies technologie={item}/>
                ))}
            </Stack>
        </Box>
    );
}

export default About;