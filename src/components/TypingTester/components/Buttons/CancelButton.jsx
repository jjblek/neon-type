import React from 'react'
import { Box, IconButton } from '@mui/material'
import { MdCancel} from 'react-icons/md';
const CancelButton = ({status, handleCancel}) => {
    return (
        <Box>
            {status !== 'waiting' ?
                <IconButton onClick={handleCancel}>
                    <MdCancel/>
                </IconButton>
                : null
            }
        </Box>  
    )
}

export default CancelButton