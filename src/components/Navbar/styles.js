import { makeStyles } from '@mui/styles'

const drawerWidth = 0;

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    appBar: {
        zIndex: 5,
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    icon: {
        marginLeft: 10,
        marginRight: 12,
        marginTop: 10,
        color: theme.palette.secondary.main,
        //animation: '$spinR 4s linear infinite',         
    },
    '@keyframes spinR': {
        '0%': {             
            transform: 'rotate(0deg)', 
        }, 
        '100%': { 
            transform: 'rotate(360deg)', 
        },
    },
    colorIcons: {
        width: 30, 
        height: 30,
       
    },
    colorIcon: {
        fontSize: 10,
        position: 'absolute',
        top: 15,
        right: 15,

    },
    swatches: {
        display: 'flex',
        justifyContent: 'center',
        padding: '12px',
        flexWrap: 'wrap',
      },
    swatch: {
        width: '24px',
        height: '24px',
        margin: '4px',
        border: 'none',
        padding: 0,
        borderRadius: '4px',
        cursor: 'pointer',
        outline: 'none',
      },
    cursor: {
        
    },
    neon: {
        filter:`drop-shadow(0px 0px 2px ${theme.palette.primary.light})`,
        textShadow: `0px 0px 16px ${theme.palette.primary.main}`,
        '&:hover': {
            textShadow: `0px 0px 24px ${theme.palette.primary.main}`,
        },
    },
      
}));