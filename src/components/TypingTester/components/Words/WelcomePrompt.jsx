import React from 'react'
import { Box, Typography } from '@mui/material'
import useStyles from '../TypingAnalysis/styles';

// The WelcomePrompt component - the welcome prompt to the user, displayed upon landing
const WelcomePrompt = ({neonMode}) => {
    const classes = useStyles();
    return (
        <Box height={'125px'} textAlign={'center'} mb={'64px'}>
            <Typography variant='h6' marginTop={'75px'} color={'secondary.main'}>
                Welcome to 
                <span style={{fontFamily: 'Tilt Neon'}} color={neonMode ? 'white' : 'primary.main'} className={neonMode ? classes.neonText : classes.text}> NeonType</span>
                , click play to start typing!
            </Typography>
        </Box> 
    )
}

export default WelcomePrompt