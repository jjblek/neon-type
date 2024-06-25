import React from 'react'
import { Box, IconButton } from '@mui/material'
import { MdTimer, MdTimerOff } from 'react-icons/md';
const TimerButton = ({showTimer, setShowTimer}) => {
    return (
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
    )
}

export default TimerButton