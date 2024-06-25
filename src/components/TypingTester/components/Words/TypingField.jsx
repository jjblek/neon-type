import React from 'react'
import { TextField } from '@mui/material'

// The TypingField component - a hidden text field responsible for handling user input
const TypingField = ({textInput, currInput, inputFocus, setStatus, handleInput, handleChange}) => {
    const handlePaste = (event) => {
        event.preventDefault(); // prevent the default paste behavior
    };
    return (
        <TextField aria-label='Enter to Restart' onPaste={handlePaste} sx={{opacity: 1, height: '0px', width: '0px'}}
            onBlur={e => (
                inputFocus === true && e.target.focus()
            )}
            inputRef={textInput} value={currInput}
            onInput={()=> setStatus('started')} onKeyDown={handleInput} onChange={handleChange}
            autoFocus variant="standard"
            InputLabelProps={{style: { fontSize: 14 },}}
            inputProps={{style: {textAlign: 'center',}}}
            
            InputProps={{
                autoComplete: 'off',
                autoFocus: true,
            }}>
        </TextField>
    )
}

export default TypingField