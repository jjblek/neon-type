import React from 'react'
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import useStyles from './styles';
const WordAmountSelection = ({status, numWords, setNumWords, neonMode}) => {

    const handleWords = (event, value) => { if (value !== null) setNumWords(value) }
    const classes = useStyles();
    return (
        <Box ml={'auto'} mr={1}>
                        {(status === 'initialized' || status === 'started') ? 
                            <ToggleButtonGroup
                                value={numWords} defaultValue={10} exclusive onChange={handleWords}
                                aria-label="word count select" color='primary'>
                                
                                <ToggleButton className={neonMode ? classes.neonToggle : null} value={10} aria-label="10 words" size='large'>
                                    <Typography variant='body2' fontSize={12} fontWeight={'bold'} color={numWords === 10 ? (neonMode ? 'white' : 'primary') : 'secondary'}>
                                        10
                                    </Typography>
                                </ToggleButton>

                                <ToggleButton className={neonMode ? classes.neonToggle : null} value={25} aria-label="25 words" size='large'>
                                    <Typography variant='body2' fontSize={12} fontWeight={'bold'} color={numWords === 25 ? (neonMode ? 'white' : 'primary') : 'secondary'}>
                                        25
                                    </Typography>
                                </ToggleButton>

                                <ToggleButton className={neonMode ? classes.neonToggle : null} value={50} aria-label="50 words" size='large'>
                                    <Typography variant='body2' fontSize={12} fontWeight={'bold'} color={numWords === 50 ? (neonMode ? 'white' : 'primary') : 'secondary'}>
                                        50
                                    </Typography>
                                </ToggleButton>

                                <ToggleButton className={neonMode ? classes.neonToggle : null} value={75} aria-label="100 words" size='large'>
                                    <Typography variant='body2' fontSize={12} fontWeight={'bold'} color={numWords === 75 ? (neonMode ? 'white' : 'primary') : 'secondary'}>
                                        75
                                    </Typography>
                                </ToggleButton>

                            </ToggleButtonGroup>
                            : null
                        }
                    </Box>
                
    )
}

export default WordAmountSelection