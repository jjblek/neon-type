import React, { useState, useEffect, useRef } from 'react';
import randomWords from 'random-words';
import { Card, CardContent, CardActions, CardHeader, Box } from '@mui/material';

import WordAmountSelection from './components/Buttons/WordAmountSelection';
import Links from './components/Links';
import PlayButton from './components/Buttons/PlayButton';
import TypingAnalysis from './components/TypingAnalysis/TypingAnalysis';
import Words from './components/Words/Words';
import TimerButton from './components/Buttons/TimerButton';
import CancelButton from './components/Buttons/CancelButton';
import TypingField from './components/Words/TypingField';
import Timer from './components/Words/Timer';
import WelcomePrompt from './components/Words/WelcomePrompt';

import useStyles from './components/Words/styles';
//const TIME = [15, 30, 60, 120]
const MINUTE = 60

const Tester = ({ neonMode, inputFocus, setInputFocus}) => {
    
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

    // generate random words
    function generateRandomWords(num) { return new Array(num).fill(null).map(() => randomWords()) }
    
    // generate an array of word objects
    function generateWordArray(words) {
        
        const wordArray = words.map((word) => {
    
            return {
                isValid: false, // word validation
                excessCharacters: [], // excess characters typed by user
                characters: Array.from(word).map((char) => ({ 
                    char,
                    isValid: 0 // character validation
                })),
            };
        });
    
        return wordArray;
    }

    // initialize typing test
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

        const word = words[currWordIndex].characters;
        
        // INPUT TYPE: KEY (a-z, 0-9, operators, punctuation, etc.)
        if ((keyCode >= 48 && keyCode <= 90) || (keyCode >=106 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 222)) {
            // if character index is greater than or equal to word length
            if (currCharIndex >= word.length) {
                // current input does not match word, increment character index
                setCurrCharIndex(currCharIndex + 1)
                const excess = [...words];
                excess[currWordIndex].excessCharacters.push(key);
                setWords(excess)
            }
            // else update character highlight
            else {
                // copy words to update highlight state
                const updatedHighlight = [...words];

                // check if character at current index matches the input character
                const doesItMatch = word[currCharIndex].char === key;

                // update highlight accordingly, 1 represents correct and -1 represents incorrect
                updatedHighlight[currWordIndex].characters[currCharIndex].isValid = doesItMatch ? 1 : -1;

                // update words 
                setWords(updatedHighlight);

                // increment character index
                setCurrCharIndex(currCharIndex + 1)
            }

            // if the final word is reached and it is equal to current input
            if (currWordIndex === randWords.length-1 && randWords[currWordIndex] === currInput.trim() + key) {
                // end the typing test
                setTimeTaken(MINUTE - countDown)
                setStatus('finished')
            }
        }

        // INPUT TYPE: SPACE BAR 
        else if (keyCode === 32) {
            if (currCharIndex === 0 && currWordIndex === 0) handleRestart();
            // if current character index is shorter than word length
            else if (currCharIndex < word.length) {
                if (currWordIndex === words.length - 1) {
                    // end the typing test
                    setTimeTaken(MINUTE - countDown)
                    setStatus('finished')
                }
                // copy words to update validation state
                const validatedWords = [...words]

                // current input is shorter than word, set word validation state to incorrect
                validatedWords[currWordIndex].isValid = false

                // update character validation state for all proceeding characters to incorrect (-1)
                for (let i = currCharIndex; i < word.length; i++) {
                    validatedWords[currWordIndex].characters[i].isValid = -1;
                }
                setWords(validatedWords)
                
                // copy current input stack
                const stack = [...inputStack]
                
                // push current input to the stack
                stack[currWordIndex] = currInput.trim() + ' '
                setInputStack(stack)
                
                // increment current word index
                setCurrWordIndex(currWordIndex + 1)
                
                // reset character index and input
                setCurrCharIndex(0)
                setCurrInput("")

                // increment count of incorrect words
                setIncorrect(incorrect + 1)
            } 

            // if current character index is equal to word length
            else if (currCharIndex === word.length) {

                // if word at the current index matches current input
                if (randWords[currWordIndex] === currInput.trim()) {
                    
                    // copy words to update validation state
                    const validatedWords = [...words]

                    // set word validation state to correct
                    validatedWords[currWordIndex].isValid = true
                    setWords(validatedWords)

                    // add current input to input stack
                    const stack = [...inputStack]
                    stack[currWordIndex] = currInput.trim() + ' '
                    setInputStack(stack)
                    
                    // update total character count
                    setTotalChar(totalChar + currCharIndex + 2)

                    // increment word index
                    setCurrWordIndex(currWordIndex + 1)

                    // reset character index and current input
                    setCurrCharIndex(0)
                    setCurrInput("")

                    // increment count of correct words
                    setCorrect(correct + 1)
                } 

                // if character index is equal to word length but is not a match
                else setCurrCharIndex(currCharIndex + 1)
                
            }
            else if (currCharIndex > word.length) {
                if (currWordIndex === words.length - 1) {
                    // end the typing test
                    setTimeTaken(MINUTE - countDown)
                    setStatus('finished')
                }
                // copy words to update validation state
                const validatedWords = [...words]
                
                // current input is longer than word, set word validation state to incorrect
                validatedWords[currWordIndex].isValid = false
                
                setWords(validatedWords)
                
                // copy current input stack
                const stack = [...inputStack]
                
                // push current input to the stack
                stack[currWordIndex] = currInput.trim() + ' '
                setInputStack(stack)
                
                // increment current word index
                setCurrWordIndex(currWordIndex + 1)
                
                // reset character index and input
                setCurrCharIndex(0)
                setCurrInput("")

                // increment count of incorrect words
                setIncorrect(incorrect + 1)
            }
            // else current character index is longer than word length, increment character index
            else setCurrCharIndex(currCharIndex + 1)
            
        } 

        // INPUT TYPE: BACKSPACE
        else if (keyCode === 8) {
            // if the current character index is greater than 0
            if (currCharIndex > 0) {

                // decrement current character index
                if (currCharIndex > word.length) {
                    setCurrCharIndex(currCharIndex - 1)
                    const excess = [...words];
                    excess[currWordIndex].excessCharacters.pop();
                }
                
                // else remove character highlight validation from previous index
                else {
                    const updatedHighlight = [...words];
                    updatedHighlight[currWordIndex].characters[currCharIndex-1].isValid = 0;
                    
                    setWords(updatedHighlight);
                    setCurrCharIndex(currCharIndex - 1)
                }
            } 
            // else current character index is less than or equal to zero
            else { // TODO 
                // if current word index is greater than zero (not the first word), return to previous word
                if (currWordIndex > 0) {

                    // set current input and index to previous input and index
                    const stack = [...inputStack]
                    const prevInput = stack[currWordIndex - 1]
                    setCurrInput(prevInput)
                    setCurrCharIndex(prevInput.length - 1)

                    // decrement correct/incorrect count
                    if (words[currWordIndex - 1].isValid === true) {
                        const updatedWords = [...words]
                        updatedWords[currWordIndex].isValid = false
                        setWords(updatedWords)
                        setCorrect(correct - 1)
                    } else {
                        const updatedHighlight = [...words];
                        for (let i = prevInput.length - 1; i < words[currWordIndex-1].characters.length; i++) {
                            updatedHighlight[currWordIndex-1].characters[i].isValid = 0;
                        }
                        
                        setWords(updatedHighlight);
                        setIncorrect(incorrect - 1)
                    }

                    // decrement current word index
                    setCurrWordIndex(currWordIndex - 1)

                    // pop previous input from stack
                    stack.pop();
                    setInputStack(stack)
                }
            }
        }
        
        // INPUT TYPE: TAB
        else if (keyCode === 9) return // do nothing
        
        // INPUT TYPE: ENTER
        else if (keyCode === 13) { 
            if (currWordIndex === 1) setCorrect(0);
            setTimeTaken(MINUTE - countDown)
            setStatus('finished')
            return
        }
    }

    // handle input change
    const handleChange = (e) => {
        setCurrInput(e.target.value)
    }

    // handle restart test
    const handleRestart = () => {
        setCurrInput("")
        setCountDown(MINUTE)
        start()
    }
    
    // handle cancel test
    const handleCancel = () => {
        setCurrInput("")
        setCountDown(MINUTE)
        start()
        setStatus('waiting')
    }
    
    return (
        <Card variant='elevation' sx={{height: '100%'}}>
            
            <CardContent sx={{height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            
                <CardHeader
                    title="Typing Speed Test" 
                    titleTypographyProps={{
                        className: neonMode ? classes.neon : null,
                        color: neonMode ? 'white' : 'primary.main',
                        fontWeight: 'bold'
                    }}
                    subheader="by jjblek" 
                    subheaderTypographyProps={{color: 'secondary.main', fontSize: '12px'}} 
                    avatar={
                        <CancelButton status={status} handleCancel={handleCancel}/>
                    }
                    action={
                        (status === 'initialized' || status === 'started') ?
                            <TimerButton showTimer={showTimer} setShowTimer={setShowTimer}/>
                        : null
                    }
                />

                {status === 'waiting' ? <WelcomePrompt neonMode={neonMode}/> : null}

                {(status === 'initialized' || status === 'started') ?
                    
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        
                        <Timer showTimer={showTimer} countDown={countDown} neonMode={neonMode}/>

                        <TypingField textInput={textInput} currInput={currInput} inputFocus={inputFocus} 
                            setStatus={setStatus} handleInput={handleInput} handleChange={handleChange}/>
                        
                        <Words neonMode={neonMode}
                            words={words} numWords={numWords} 
                            currCharIndex={currCharIndex} 
                            currWordIndex={currWordIndex} 
                            />
                    </Box>
                    : null
                }
            
                {status === 'finished' ? 
                    <TypingAnalysis neonMode={neonMode}
                        correct={correct} incorrect={incorrect} 
                        timeTaken={timeTaken} totalChar={totalChar}/>
                    : null
                }
            
                <CardActions disableSpacing>

                    <PlayButton status={status} start={start} handleRestart={handleRestart}/>

                    <WordAmountSelection status={status} numWords={numWords} setNumWords={setNumWords} neonMode={neonMode}/>

                </CardActions>

                

            </CardContent>
            <Links inputFocus={inputFocus} setInputFocus={setInputFocus} neonMode={neonMode}/>
        </Card>
    )
}
export default Tester
