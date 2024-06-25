import React from 'react'
import { Box, Typography, Link, Modal } from '@mui/material'
import { FiGithub } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { MdOutlineBugReport } from "react-icons/md";
import useStyles from './TypingAnalysis/styles'
import { useTheme } from '@mui/material/styles';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    
    bgcolor: 'primary.bg',
    borderRadius: '10px',
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    
};

const Links = ({inputFocus, setInputFocus, neonMode}) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        if (inputFocus === true) {
            setInputFocus(false);
        }
        setOpen(true);
        
    }
    const handleClose = () => {
        setOpen(false);
        if (inputFocus === false) {
            setInputFocus(true);
        }
        
    }
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Box textAlign={'center'} display={'flex'} gap={2} justifyContent={'center'} alignItems={'center'}>
            
            <Link onClick={handleOpen} 
                color='secondary.main' variant='caption' 
                display='flex' alignItems='center' justifyContent='center'
                sx={{
                    textDecoration: 'none',
                    cursor:'pointer',
                    '&:hover': {
                        color: neonMode ? 'white' : 'primary.main',
                        textDecoration: 'underline',
                        filter: neonMode ? `drop-shadow(1px 1px 2px ${theme.palette.primary.main})` : null,
                        textShadow: neonMode ? `0px 0px 16px ${theme.palette.primary.main}` : null,
                    },
                }}
                >
                <MdMailOutline  style={{marginRight: '5px'}}/>
                contact
            </Link>
            
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus 
                >
                    <Box sx={style}>
                    
                    <Typography id="modal-modal-title" variant="h5" color={'primary.main'} mb={1} className={neonMode ? classes.neonText : null}>
                        Contact
                    </Typography>
                    <Typography id="modal-modal-description" variant='body1' mb={1}>
                        Feel free to email jjblek@gmail.com with any questions.
                    </Typography>
                    
                    <Link href='https://github.com/jjblek/neon-type/issues' color='secondary.main' fontSize={'11px'}
                    display={'flex'}  alignItems={'center'}
                        sx={{
                            filter: neonMode ? `drop-shadow(1px 1px 2px ${theme.palette.primary.main})` : null,
                                textShadow: neonMode ? `0px 0px 16px ${theme.palette.primary.main}` : null,
                            textDecoration: 'none',
                            cursor:'pointer',
                            '&:hover': {
                                color: neonMode ? 'white' : 'primary.main',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                            <MdOutlineBugReport style={{ marginRight: '5px' }}/> Submit an issue
                    </Link>
                
                    </Box>
                </Modal>
            <Link href='https://github.com/jjblek/neon-type' target='_blank' rel='noopener'
                color='secondary.main' variant='caption' 
                display={'flex'} justifyContent={'center'} alignItems={'center'}
                sx={{
                    textDecoration: 'none',
                    '&:hover': {
                        color: neonMode ? 'white' : 'primary.main',
                        textDecoration: 'underline',
                        filter: neonMode ? `drop-shadow(1px 1px 2px ${theme.palette.primary.main})` : null,
                        textShadow: neonMode ? `0px 0px 16px ${theme.palette.primary.main}` : null,
                    },
                }}
            >
                <FiGithub style={{ marginRight: '5px' }}/>
                github
            </Link>
        </Box>
    )
}

export default Links