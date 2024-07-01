import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    neon: {
        filter:`drop-shadow(1px 1px 2px ${theme.palette.primary.light})`,
        textShadow: `0px 0px 16px ${theme.palette.primary.main}`,
        '&:hover': {
            textShadow: `0 0 24px ${theme.palette.primary.main}`,
        },
    },
    
    success: {
        color: theme.palette.primary.light,
    
    },
    warning: {
        color: theme.palette.inverted.main,
    
    },
    idle: {
        color: theme.palette.secondary.main,
        letterSpacing: '1.3px',
        
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            letterSpacing: '0px',
        },
        
    },

    neonSuccess: {
        filter:`drop-shadow(0px 2px 2px ${theme.palette.primary.main})`,
    },
    neonWarning: {
        filter:`drop-shadow(0px 2px 2px ${theme.palette.inverted.main})`,  
    },
    
    blink: {
        animation: '$blinking 1s ease-in-out 0s infinite alternate'
    },
    cursor: {
        position: 'absolute',
        opacity: '75%'
    },
    '@keyframes blinking': {
        '50%': {             
            opacity: 0, 
        }, 
        '100%': { 
            opacity: 1,  
        },
    },

}));