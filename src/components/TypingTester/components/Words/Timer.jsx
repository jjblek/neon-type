import React from 'react'
import { Box, Typography } from '@mui/material'
import useStyles from './styles';

// The Clock component - a countdown timer 
const Timer = ({showTimer, countDown, neonMode}) => {
    const classes = useStyles();
    return (
        <Box display={'flex'} justifyContent={'center'} mb='16px'> 
            {showTimer ?
                <Typography
                    className={neonMode ? classes.neon : null} 
                    color={neonMode ? 'white' : 'primary.main'} 
                    variant='h2'>
                    {countDown}
                </Typography> 
            : null
            }
        </Box>
    )
}

export default Timer