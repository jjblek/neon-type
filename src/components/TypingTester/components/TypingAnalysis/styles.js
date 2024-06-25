import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    text: { // card title
        color: theme.palette.primary.main,
    },
    
    neon: {
        filter:`drop-shadow(1px 1px 2px ${theme.palette.primary.light})`,
        textShadow: `0px 0px 16px ${theme.palette.primary.main}`,
        '&:hover': {
            textShadow: `0 0 24px ${theme.palette.primary.main}`,
        },
    },

    neonText: {
        color: 'white',
        filter:`drop-shadow(1px 1px 2px ${theme.palette.primary.light})`,
        textShadow: `0px 0px 16px ${theme.palette.primary.main}`,
        '&:hover': {
            textShadow: `0 0 24px ${theme.palette.primary.main}`,
        },
    },

    neonRed: {
        filter:`drop-shadow(1px 1px 2px red)`,
        textShadow: `0px 0px 16px red`,
        '&:hover': {
            textShadow: `0 0 24px red`,
        },
    },

}));