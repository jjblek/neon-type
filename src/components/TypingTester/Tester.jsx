import React, { useState, useEffect, useRef } from 'react';
import randomWords from 'random-words';
import { Card, CardContent, CardActions, CardHeader, Box, IconButton, Typography, TextField, Hidden, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MdPlayArrow, MdCancel, MdReplay, MdTimer, MdTimerOff } from 'react-icons/md';
import useStyles from './styles';
//const TIME = [15, 30, 60, 120]
const MINUTE = 60

const Tester = () => {
    
    const [words, setWords] = useState([])
    const [numWords, setNumWords] = useState(10)

    const [countDown, setCountDown] = useState(MINUTE)
    const [currInput, setCurrInput] = useState("")
    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [currCharIndex, setCurrCharIndex] = useState(-1)
    const [currChar, setCurrChar] = useState("")
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [status, setStatus] = useState("waiting")
    const [timeTaken, setTimeTaken] = useState(0)
    const [totalChar, setTotalChar] = useState(0)
    const [hidden, setHidden] = useState(false)
    const textInput = useRef(null)
    const classes = useStyles();

    useEffect(() => {
        setWords(generateWords(numWords))
    }, [numWords])

    useEffect(() => {
        if (status === 'started') {
            textInput.current.focus()
            let interval = setInterval(() => {
                setCountDown((remainingTime) => {
                    if (remainingTime === 0) {
                        clearInterval(interval)
                        setTimeTaken(MINUTE)
                        setStatus('finished')
                        setCurrInput("")
                        return MINUTE
                    } 
                    else {
                        return remainingTime - 1
                    }
                })
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [status])


    function generateWords(num) {
        return new Array(num).fill(null).map(() => randomWords())
    }


    function start() {
        setWords(generateWords(numWords))
        setCurrWordIndex(0)
        setCorrect(0)
        setIncorrect(0)
        setCurrCharIndex(-1)
        setCurrChar("")
        setTotalChar(0)
        setStatus('initialized')
        
    }
      
    function handleInput({keyCode, key}) {
        if (keyCode === 13) { // enter
            return handleRestart()
          }
        if (keyCode === 32) { // space bar 
            checkMatch()
            setCurrInput("")
            setCurrWordIndex(currWordIndex + 1)
            setCurrCharIndex(-1)
        } 
        else if (keyCode === 8) { // backspace
            setCurrCharIndex(currCharIndex - 1)
            setCurrChar("")
        } 
        else { // key
            setCurrCharIndex(currCharIndex + 1)
            setCurrChar(key)
        }
        
    }

    function checkMatch() {
        const wordToCompare = words[currWordIndex]
        const doesItMatch = wordToCompare === currInput.trim()
        if (doesItMatch) {
            setCorrect(correct + 1)
            setTotalChar(totalChar + currCharIndex + 2)
            
        }
        else setIncorrect(incorrect + 1)
        
    }

    function getCharClass(wordIdx, charIdx, char) {
        if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
            
            if (char === currChar) {
                return classes.success
            } else { return classes.warning }

        } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) { 
            
            return classes.warning 
        }
    }
    const handleChange = (e) => {
        setCurrInput(e.target.value)
        if (correct + incorrect === numWords) {
            if (incorrect === numWords) {
                setIncorrect(0)
            }
            setTimeTaken(MINUTE - countDown)
            setStatus('finished')
        }
        
    }
    const handleRestart = () => {
        setCurrInput("")
        setCountDown(MINUTE)
        start()
        
    }
    const handleCancel = () => {
        setCurrInput("")
        setCountDown(MINUTE)
        start()
        setStatus('waiting')
        
    }
    
    return (
        <Card>
            <CardContent>
            <CardHeader
                avatar={
                    <Box>
                        {status !== 'waiting' &&
                        <IconButton onClick={handleCancel}>
                            <MdCancel/>
                        </IconButton>
                        }
                    </Box>  
                }
                title="Typing Speed Test" titleTypographyProps={{className: classes.title}}
                subheader="by jjblek" subheaderTypographyProps={{className: classes.subheader}} 
                action={
                    <Hidden smDown>
                    <Box display={'flex'} alignItems={'center'}>
                    
                    {hidden ? (
                        <IconButton aria-label="show timer" onClick={()=>setHidden(false)}>
                            <MdTimerOff/>
                        </IconButton>
                        ) : (
                        <IconButton aria-label="hide timer" onClick={()=>setHidden(true)}>
                            <MdTimer/>
                        </IconButton> 
                        )
                    }
                    </Box>
                    </Hidden>
                }
            />
            {(status === 'initialized' || status === 'started') && (
                
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    
                    <Box display={'flex'} justifyContent={'center'}> 
                        {!hidden && 
                            <Typography variant='h2' color='primary' fontWeight={'bold'}>
                                {countDown}
                            </Typography>
                        }
                    </Box>
                        <Box mb={2}>
                        <TextField className={classes.textField} hiddenLabel
                        label='Start Typing' aria-label='Enter to Restart'
                        helperText={
                            <Typography 
                                variant="caption" 
                                className={classes.centerText}
                                display="block">
                                Press Enter to Restart
                            </Typography>
                         }
                        InputLabelProps={{
                            style: { fontSize: 12, },
                        }} 
                        inputProps={{
                            
                            style: {
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                            autoComplete: 'off',
                        }} 
                        color='primary' autoFocus variant="standard"
                        inputRef={textInput} value={currInput}
                        onInput={()=> setStatus('started')} onKeyDown={handleInput} onChange={handleChange}>
                        </TextField>
                    </Box>
                    
                    <Typography variant='h6' color='secondary' maxWidth={850} mb={5}>
                        {words.map((word, i) => (
                        <span key={i}>
                            <span>
                            {word.split("").map((char, idx) => (
                                <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                            ))}
                            </span>
                            <span> </span>
                        </span>
                        ))}
                    </Typography>    
                </Box>
            )}
            
            {status === 'finished' && (
                
                <Box textAlign={'center'}>
                    
                    <Typography variant='h5' color='secondary' fontWeight={'normal'}>WPM:{' '}
                        <Typography className={classes.inline} variant='inherit' color='primary' fontWeight={'bold'}>
                            {Math.round( ((totalChar/5) - incorrect) / (timeTaken/60) )}
                        </Typography>
                    </Typography>
        
                    <Typography variant='h6' color='secondary' fontWeight={'normal'}>Accuracy:{' '} 
                    {correct !== 0 ? (
                        <Typography className={classes.inline} variant='inherit' color='primary' fontWeight={'bold'}>
                            {Math.round((correct / (correct + incorrect)) * 100)}%
                        </Typography>
                    ) : (
                        <Typography className={classes.inline} variant='inherit' color='red' fontWeight={'bold'}>0%</Typography>
                    )}
                    </Typography>
                    <Typography variant='caption' color='primary' fontWeight={'bold'} fontSize={10}>Tab + Enter to Restart</Typography>
                </Box>
               
            )}
            
            <CardActions disableSpacing>
            
                <Box ml={2}>
                {status === 'waiting' ? (
                    <IconButton aria-label="Play" onClick={start}>
                        <MdPlayArrow/>
                    </IconButton>
                    ) : (
                    <IconButton aria-label="Replay" onClick={handleRestart}>
                        <MdReplay/>
                    </IconButton>
                )}
                </Box>

                <Box ml={'auto'}>
                {(status === 'initialized' || status === 'started') && (
                
                <ToggleButtonGroup
                        value={numWords} color='primary'
                        exclusive
                        onChange={(e, value) => setNumWords(value)}
                        aria-label="word select">
                        <ToggleButton value={10} aria-label="10 words" size='large'>
                            <Typography fontSize={12} fontWeight={'bold'}>10</Typography>
                        </ToggleButton>
                        <ToggleButton value={25} aria-label="25 words" size='large'>
                        <Typography fontSize={12} fontWeight={'bold'}>25</Typography>
                        </ToggleButton>
                        <ToggleButton value={50} aria-label="50 words" size='large'>
                        <Typography fontSize={12} fontWeight={'bold'}>50</Typography>
                        </ToggleButton>
                        <ToggleButton value={75} aria-label="100 words" size='large'>
                        <Typography fontSize={12} fontWeight={'bold'}>75</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>)}
                </Box>
            
            </CardActions>
            </CardContent>
        </Card>

    )
}

export default Tester
