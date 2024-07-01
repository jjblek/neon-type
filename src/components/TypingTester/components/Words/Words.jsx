import React from 'react'
import { Box, Typography } from '@mui/material'
import useStyles from './styles';

// The Words component - displays a list of words for the user to type, validating input as the user types
const Words = ({words, numWords, currCharIndex, currWordIndex, neonMode}) => {
    const classes = useStyles();
    return (
        <Box maxWidth={'850px'} >
        {numWords ?
        <Typography fontSize={numWords === 75 ? '18px' : numWords === 50 ? '20px' : '22px'} className={classes.idle}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block' }}>
                    {word.characters.map((char, charIndex) => (
                        <span style={{ display: 'inline-block' }}
                            key={charIndex}
                            className={char.isValid === 1 ? `${classes.success} ${neonMode && classes.neonSuccess}` : (char.isValid === -1 ? `${classes.warning} ${neonMode && classes.neonWarning}` : null)}
                        >
                            {currCharIndex === charIndex && currWordIndex === wordIndex && <span className={`${classes.cursor} ${currCharIndex === 0 && currWordIndex === 0 && classes.blink}`}>|</span>}
                            {char.char}
                            
                        </span>
                        
                    ))
                    
                    }
                <span key={wordIndex} style={{ display: 'inline-block' }}>
                                {word.excessCharacters.map((char, charIndex) => 
                                    <span key={charIndex} style={{ display: 'inline-block' }} className={`${classes.warning} ${neonMode && classes.neonWarning}`}>
                                        {char}
                                    </span>
                                )}
                            </span>
                    {currWordIndex === wordIndex && currCharIndex >= word.characters.length && (
                    <span >
                        <span className={classes.cursor}>|</span>
                    </span>
                    )}
                    {currWordIndex === wordIndex && currCharIndex === word.characters.length && <span className={`${classes.cursor} ${currCharIndex === 0 && currWordIndex === 0 && classes.blink}`}>|</span>}
                    {wordIndex < words.length - 1 && '\u00A0'}
                </span>
            ))}
            
        </Typography>
        : null}
        </Box>
)
}

export default Words