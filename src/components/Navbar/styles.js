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
        animation: '$spin 4s linear infinite',         
    },
    '@keyframes spin': {
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
    colorStack: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: theme.spacing(6),
        right: theme.spacing(5),
        transform: 'translate(-50%, -50%)',
        width: 40,
        bgcolor: 'background.paper',
        border: `2px solid ${theme.palette.primary.main}`,
        boxShadow: 24,
    },
    colorPicker: {
        display: 'flex',
        padding: '16px',
        position: 'absolute',
        top: '48%',
        right: '0%',
        transform: 'translate(-20%, -50%)',
        width: 300,
    },
}));