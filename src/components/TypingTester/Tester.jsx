import React, { useState, useEffect, useRef } from 'react';
import randomWords from 'random-words';
import { Card, CardContent, CardActions, CardHeader, Box, IconButton, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MdPlayArrow, MdCancel, MdReplay, MdTimer, MdTimerOff, MdInfo } from 'react-icons/md';
import useStyles from './styles';
//const TIME = [15, 30, 60, 120]
const MINUTE = 60

const Tester = ({ neonMode, showInfo, setShowInfo }) => {
    
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
    const [showTimer, setShowTimer] = useState(true)
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
        if (keyCode === 9) return // tab; do nothing
        if (keyCode === 13) return handleRestart() // enter
        if (keyCode === 32) { // space bar 
            checkMatch()
            setCurrInput("")
            setCurrWordIndex(currWordIndex + 1)
            setCurrCharIndex(-1)
        } 
        else if (keyCode === 8) { // backspace
            if (currCharIndex > -1) {
            setCurrCharIndex(currCharIndex - 1)
            setCurrChar("")
            } else return
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
                return `${classes.success} ${neonMode ? classes.neonSuccess : null}`
            } 
            else return `${classes.warning} ${neonMode ? classes.neonWarning : null}`

        } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) { 
            return `${classes.warning} ${neonMode ? classes.neonWarning : null}`
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

    const handleWords = (event, value) => {
        if (value !== null) setNumWords(value)
        
    }

    return (
        <Card variant='elevation'>
            <CardContent>
                <CardHeader
                    title="Typing Speed Test" 
                    titleTypographyProps={{
                        className: neonMode ? classes.neon : null,
                        color: neonMode ? 'primary.light' : 'primary.main',
                        fontWeight: 'bold'
                    }}
                    subheader="by jjblek" 
                    subheaderTypographyProps={{className: classes.subheader}} 
                    avatar={
                        <Box>
                            {status !== 'waiting' ?
                                <IconButton onClick={handleCancel}>
                                    <MdCancel/>
                                </IconButton>
                                : null
                            }
                        </Box>  
                    }
                    action={
                        (status === 'initialized' || status === 'started') ?
                            <Box display={'flex'} alignItems={'center'}>
                                {showTimer ? 
                                    <IconButton aria-label="hide timer" onClick={()=>setShowTimer(false)}>
                                        <MdTimer/>
                                    </IconButton> 
                                    : 
                                    <IconButton aria-label="show timer" onClick={()=>setShowTimer(true)}>
                                        <MdTimerOff/>
                                    </IconButton>
                                }
                            </Box> 
                        : null
                    }
                />

                {(status === 'initialized' || status === 'started') ?
                    
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        
                        <Box display={'flex'} justifyContent={'center'}> 
                            {showTimer ?
                                <Typography 
                                    className={neonMode ? classes.neon : null} 
                                    color={neonMode ? 'primary.light' : 'primary.main'} 
                                    variant='h2' fontWeight={'bold'}>
                                    {countDown}
                                </Typography> 
                            : null
                            }
                        </Box>

                        <Box mb={2}>
                            <TextField label='Start Typing' aria-label='Enter to Restart'
                                inputRef={textInput} value={currInput}
                                onInput={()=> setStatus('started')} onKeyDown={handleInput} onChange={handleChange}
                                className={classes.textField} autoFocus variant="standard"
                                InputLabelProps={{style: { fontSize: 14 },}}
                                inputProps={{style: {textAlign: 'center',}}}
                                helperText={
                                    <Typography 
                                        color={neonMode ? 'primary.light' : 'primary.main'} 
                                        textAlign={'center'}
                                        variant="caption" 
                                        className={neonMode ? classes.neon : null}
                                        display="block">
                                        Press Enter to Restart
                                    </Typography>
                                }
                                InputProps={{className: neonMode ? classes.neon : null,
                                    style: {
                                        color: neonMode ? 'primary.light' : 'primary.main',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    },
                                    autoComplete: 'off',
                                }}>
                            </TextField>
                        </Box>
                        
                        <Typography variant='h6' fontWeight={'bold'} color='secondary' maxWidth={850} mb={5}>
                            
                            {words.map((word, i) => (
                                <span key={i}>
                                    
                                        {word.split("").map((char, idx) => (
                                            <span className={getCharClass(i, idx, char)} key={idx}>
                                                {char} 
                                            </span>
                                        ))}
                                    
                                    <span> </span>
                                </span>
                            ))}
                        </Typography> 
                        
                    </Box>
                    : null
                }
            
                {status === 'finished' ? 
                    <Box textAlign={'center'}>
                        
                        <Typography variant='h5' color='secondary' fontWeight='normal'>
                            WPM:{' '}
                            <Typography display='inline' variant='inherit' color='primary' fontWeight={'bold'}>
                                {Math.round(((totalChar / 5) - incorrect) / (timeTaken / 60))}
                            </Typography>
                        </Typography>
            
                        <Typography variant='h6' color='secondary' fontWeight='normal'>
                            Accuracy:{' '} 
                            {correct !== 0 ?
                                <Typography display='inline' variant='inherit' color='primary' fontWeight={'bold'}>
                                    {Math.round((correct / (correct + incorrect)) * 100)}%
                                </Typography>
                                : 
                                <Typography display='inline' variant='inherit' color='red' fontWeight={'bold'}>
                                    0%
                                </Typography>
                            }
                        </Typography>

                        <Typography className={neonMode ? classes.neon : null} 
                            color={neonMode ? 'primary.light' : 'primary.main'} 
                            variant='caption' fontWeight={'bold'} fontSize={10}>
                            Tab + Enter to Restart
                        </Typography>

                    </Box>
                    : null
                }
            
                <CardActions disableSpacing>
                
                    <Box ml={1}>
                        {status === 'waiting' ?
                            <IconButton aria-label="Play" onClick={start}>
                                <MdPlayArrow/>
                            </IconButton>
                            : 
                            <IconButton aria-label="Replay" onClick={handleRestart}>
                                <MdReplay/>
                            </IconButton>
                        }
                    </Box>
                    
                    <Box ml={'auto'}>
                        {(status === 'initialized' || status === 'started') ? 
                            <ToggleButtonGroup
                                value={numWords} defaultValue={10} exclusive onChange={handleWords}
                                aria-label="word count select" color='primary'>
                                
                                <ToggleButton className={neonMode ? classes.neonToggle : null} value={10} aria-label="10 words" size='large'>
                                    <Typography variant='body2' fontSize={12} fontWeight={'bold'}>
                                        10
                                    </Typography>
                                </ToggleButton>

                                <ToggleButton className={neonMode ? classes.neonToggle : null} value={25} aria-label="25 words" size='large'>
                                    <Typography variant='body2' fontSize={12} fontWeight={'bold'}>
                                        25
                                    </Typography>
                                </ToggleButton>

                                <ToggleButton className={neonMode ? classes.neonToggle : null} value={50} aria-label="50 words" size='large'>
                                    <Typography variant='body2' fontSize={12} fontWeight={'bold'}>
                                        50
                                    </Typography>
                                </ToggleButton>

                                <ToggleButton className={neonMode ? classes.neonToggle : null} value={75} aria-label="100 words" size='large'>
                                    <Typography variant='body2' fontSize={12} fontWeight={'bold'}>
                                        75
                                    </Typography>
                                </ToggleButton>

                            </ToggleButtonGroup>
                            : null
                        }
                        <Box display={'inline'} ml={2}>
                        <IconButton onClick={()=>setShowInfo(!showInfo)}><MdInfo/></IconButton>
                        </Box>
                    </Box>
                
                </CardActions>
            </CardContent>
        </Card>
    )
}
export default Tester
