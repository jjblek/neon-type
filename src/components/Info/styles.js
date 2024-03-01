import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
    paper: {
        minWidth: '260px',
        height: '120px',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        borderRadius:'16px',
        
    },
    link: { 
        fontWeight:'bold',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        gap: '8px',
        color: theme.palette.secondary.main,
    },
    neonBox: {
        border: `1px groove ${theme.palette.primary.light}`,
        boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
        '&:hover': {
            boxShadow: `0 0 24px ${theme.palette.primary.main}`,
        },
    },
    neonText: {
        filter: `drop-shadow(0px 0px 2px ${theme.palette.primary.light})`,
        textShadow: `0px 0px 16px ${theme.palette.primary.main}`,
        '&:hover': {
            textShadow: `0 0 24px ${theme.palette.primary.main}`,
        },
    },
    neonReact: {
        filter: 'drop-shadow(0px 0px 2px #bbeffd)',
        textShadow: `0px 0px 16px #61dafb`,
        '&:hover': {
            textShadow: `0 0 24px #61dafb`,
        },
    },
    spin: {
        animation: '$spinR 20s linear infinite'
    },  
    '@keyframes spinR': {
        '0%': {             
            transform: 'rotate(0deg)', 
        }, 
        '100%': { 
            transform: 'rotate(360deg)', 
        },
    },
}));