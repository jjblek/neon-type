import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({

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

}));