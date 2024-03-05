import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    textField: { // TextField root
        "& .MuiInputBase-root": {
        color: theme.palette.primary.main,
        }, 
    },
    text: { // card title
        color: theme.palette.primary.main,
    },
    subheader: { // card subheader
        color: theme.palette.secondary.main
    },
    wordsButton: {
        height: 36,
        width: 36,
        '& .MuiIconButton-colorPrimary': {
        color: theme.palette.primary.main
        }
    },
    
    success: {
        color: theme.palette.primary.light
    },
    warning: {
        color: theme.palette.inverted.main
    },
    idle: {
        color: theme.palette.secondary.main
    },

    neon: {
        color: theme.palette.primary.main,
        filter:`drop-shadow(1px 1px 2px ${theme.palette.primary.light})`,
        textShadow: `0px 0px 16px ${theme.palette.primary.main}`,
        '&:hover': {
            textShadow: `0 0 24px ${theme.palette.primary.main}`,
        },
    },
    neonSuccess: {
        filter:`drop-shadow(0px 2px 2px ${theme.palette.primary.main})`,
    },
    neonWarning: {
        filter:`drop-shadow(0px 2px 2px ${theme.palette.inverted.main})`,  
    },

    neonToggle: {
        "&.Mui-selected, &.Mui-selected:hover": {
            color: theme.palette.primary.light,
            filter: `drop-shadow(0px 2px 2px ${theme.palette.primary.light})`,
            textShadow: `0px 0px 10px ${theme.palette.primary.main}`,
            '&:hover': {
            textShadow: `0 0 4px ${theme.palette.primary.main}`,
            },
        }
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