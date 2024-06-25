import React from 'react'
import { Box, Typography } from '@mui/material'
import useStyles from './styles';
const TypingAnalysis = ({correct, incorrect, neonMode, timeTaken, totalChar}) => {
    const classes = useStyles();
    return (
        <Box textAlign={'center'} mb={'64px'}>
                        
            <Typography variant='h4' color='secondary' fontWeight='normal'>
                WPM:{' '}
                {correct > 0 ?
                    <span className={neonMode ? classes.neonText : classes.text}>
                        {Math.round(((totalChar / 5) - incorrect) / (timeTaken / 60))}
                    </span>
                    :
                    <span className={neonMode ? classes.neonRed : null} style={{color: neonMode ? 'white' : 'red'}}>
                        0
                    </span>
                }
            </Typography>

            <Typography variant='h4' color='secondary' fontWeight='normal'>
                Accuracy:{' '} 
                {correct !== 0 ?
                    <span className={neonMode ? classes.neonText : classes.text}>
                        {Math.round((correct / (correct + incorrect)) * 100)}%
                    </span>
                    : 
                    <span className={neonMode ? classes.neonRed : null} style={{color: neonMode ? 'white' : 'red'}}>
                        0%
                    </span>
                }
            </Typography>

            <Typography className={neonMode ? classes.neon : null} 
                color={neonMode ? 'white' : 'primary.main'} 
                variant='caption' fontWeight={'bold'} fontSize={10}>
                Tab + Enter to Restart
            </Typography>

        </Box>
    )
}

export default TypingAnalysis