import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    inline: {
        display: 'inline'
    },
    textField: { // TextField root
        "& .MuiInputBase-root": {
        color: theme.palette.primary.main,
        }, 
    },
    title: { // card title
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
        backgroundColor: theme.palette.primary.light
    },
    warning: {
        backgroundColor: theme.palette.warning.light
    },
    idle: {
        backgroundColor: theme.palette.secondary.main
    },
    centerText: {
        textAlign: "center"            
    },
}));