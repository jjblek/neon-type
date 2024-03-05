import React, { useState, useEffect, useRef } from 'react';
import randomWords from 'random-words';
import { Card, CardContent, CardActions, CardHeader, Box, IconButton, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MdPlayArrow, MdCancel, MdReplay, MdTimer, MdTimerOff, MdInfo } from 'react-icons/md';
import useStyles from './styles';
//const TIME = [15, 30, 60, 120]
const MINUTE = 60

const Tester = ({ neonMode, showInfo, setShowInfo }) => {
    
    const [randWords, setRandWords] = useState([])
    const [words, setWords] = useState([])
    const [numWords, setNumWords] = useState(10)
    const [inputStack, setInputStack] = useState([])
    const [countDown, setCountDown] = useState(MINUTE)
    const [currInput, setCurrInput] = useState("")
    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [currCharIndex, setCurrCharIndex] = useState(null)
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [status, setStatus] = useState("waiting")
    const [timeTaken, setTimeTaken] = useState(0)
    const [totalChar, setTotalChar] = useState(0)
    const [showTimer, setShowTimer] = useState(true)
    const textInput = useRef(null)
    const classes = useStyles();

    // on number of words update
    useEffect(() => {
        setRandWords(generateRandomWords(numWords))
    }, [numWords])

    // on random words update
    useEffect(() => {
        setWords(generateWordArray(randWords))
    }, [randWords])

    // on typing status update
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


    function generateRandomWords(num) {
        return new Array(num).fill(null).map(() => randomWords())
    }

    function generateWordArray(randWords) {
        
        const wordArray = randWords.map((word) => {
    
            return {
                isCorrect: false,
                characters: Array.from(word).map((char) => ({ char, correct: 0 })),
            };
        });
    
        // Use the newArrays as needed, for example, you can log it
        return wordArray;
    }

    // initialize start typing
    function start() {
        setRandWords(generateRandomWords(numWords))
        setCurrWordIndex(0)
        setCorrect(0)
        setIncorrect(0)
        setCurrCharIndex(0)
        setTotalChar(0)
        setInputStack([])
        setCurrInput("")
        setStatus('initialized')
    }

    function handleInput({keyCode, key}) {
        if (keyCode === 9) return // tab; do nothing
        if (keyCode === 13) return handleRestart() // enter
        
        if (keyCode === 32) { // space bar 
            if (currCharIndex === 0) return
            // if current character index is shorter than word
            else if (currCharIndex < words[currWordIndex].characters.length) {
                // increment character index
                const updatedWords = [...words]
                updatedWords[currWordIndex].isCorrect = false
                setWords(updatedWords)
                // TODO
                const stack = [...inputStack]
                
                stack[currWordIndex] = currInput.trim()
                setInputStack(stack)
                
                setCurrWordIndex(currWordIndex + 1)
                setCurrCharIndex(0)
                setCurrInput("")
                setIncorrect(incorrect + 1)
            } 
            // if current character index is equal to word
            else if (currCharIndex === words[currWordIndex].characters.length) {
                // check if it is a match
                if (randWords[currWordIndex] === currInput.trim()) {
                    // increment word index if match
                    
                    const updatedWords = [...words]
                    updatedWords[currWordIndex].isCorrect = true
                    setWords(updatedWords)

                    const stack = [...inputStack]
                    stack[currWordIndex] = currInput.trim()
                    setInputStack(stack)
                    
                    setCorrect(correct + 1)
                    setTotalChar(totalChar + currCharIndex + 2)
                    setCurrWordIndex(currWordIndex + 1)
                    setCurrInput("")
                    setCurrCharIndex(0)

                } 
                // if it is not a match, increment character index
                else setCurrCharIndex(currCharIndex+1)
                
            }
            else setCurrCharIndex(currCharIndex + 1)
            
        } 
        else if (keyCode === 8) { // backspace
            if (currCharIndex > 0) {
                if (currCharIndex > words[currWordIndex].characters.length) {
                    setCurrCharIndex(currCharIndex - 1)
                
                }
                else {
                    const updatedHighlight = [...words];
                    updatedHighlight[currWordIndex].characters[currCharIndex-1].correct = 0;
                    setWords(updatedHighlight);
                
                    setCurrCharIndex(currCharIndex - 1)
                    
                }
                
            } else { // TODO 
                if (currWordIndex > 0 && words[currWordIndex-1].isCorrect === false) {
                    
                    setCurrInput(inputStack[currWordIndex-1])
                    
                    setCurrCharIndex(inputStack[currWordIndex - 1].length-1)
                    
                    
                    setCurrWordIndex(currWordIndex - 1)
                    setIncorrect(incorrect-1)
                }
                
            }
            
        } 
        
        else { // key
            if (currCharIndex >= words[currWordIndex].characters.length) {
                setCurrCharIndex(currCharIndex + 1)
            }
            else {
                const updatedHighlight = [...words];
                const doesItMatch = words[currWordIndex].characters[currCharIndex].char === key;
                updatedHighlight[currWordIndex].characters[currCharIndex].correct = doesItMatch ? 1 : -1;
                setWords(updatedHighlight);
                
                setCurrCharIndex(currCharIndex+1)
            }
            
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
                {status === 'waiting' ? 
                <Box height={'125px'} textAlign={'center'}>
                    <Typography variant='h5' marginTop={'75px'} >
                        
                        Welcome to <span color='primary.main' className={neonMode ? classes.neon : classes.text}> NeonType</span>, click play to start typing!
                    </Typography>
                </Box> : null}
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
                                    autoFocus: true
                                }}>
                            </TextField>
                        </Box>
                        <Box maxWidth={'800px'} >
                        <Typography variant='h6' color='secondary' mb={5} letterSpacing={'1.3px'}>
                            {words.map((word, wordIndex) => (
                                <span key={wordIndex} style={{ display: 'inline-block' }}>
                                    {word.characters.map((characterArray, charIndex) => (
                                        <span style={{ display: 'inline-block' }}
                                            key={charIndex}
                                            className={characterArray.correct === 1 ? `${classes.success} ${neonMode && classes.neonSuccess}` : (characterArray.correct === -1 ? `${classes.warning} ${neonMode && classes.neonWarning}` : '')}
                                        >
                                            {currCharIndex === charIndex && currWordIndex === wordIndex && <span className={`${classes.cursor} ${currCharIndex === 0 && currWordIndex === 0 && classes.blink}`}>|</span>}
                                            {characterArray.char}
                                            
                                        </span>
                                        
                                    ))}
                                    
                                    {currWordIndex === wordIndex && currCharIndex > word.characters.length && (
                                    <span >
                                    {currInput.slice(word.characters.length, currCharIndex).split('').map((incorrectChar, i) => (
                                        <span key={i} className={`${classes.warning} ${neonMode && classes.neonWarning}`}>
                                            {incorrectChar}
                                        </span>
                                    ))}
                                        <span className={classes.cursor}>|</span>
                                    </span>
                                    )}
                                    {currWordIndex === wordIndex && currCharIndex === word.characters.length && <span className={`${classes.cursor} ${currCharIndex === 0 && currWordIndex === 0 && classes.blink}`}>|</span>}
                                    {'\u00A0'}
                                </span>
                            ))}
                        </Typography>
                    </Box>
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
