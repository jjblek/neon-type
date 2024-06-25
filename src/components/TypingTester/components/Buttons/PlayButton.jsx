import React from 'react'
import { Box, IconButton } from '@mui/material'
import { MdPlayArrow, MdReplay } from 'react-icons/md';
const PlayButton = ({status, start, handleRestart}) => {
    return (
        <Box ml={1}>
            {status === 'waiting' ?
                <IconButton aria-label="Play" onClick={start}>
                    <MdPlayArrow/>
                </IconButton>
                : 
                <IconButton aria-label="Replay" onClick={handleRestart} onClickCapture={e => e.target.blur()}>
                    <MdReplay/>
                </IconButton>
            }
        </Box>
    )
}

export default PlayButton