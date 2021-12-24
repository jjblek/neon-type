import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Box, Typography, Grid, Paper, Stack, Grow, Modal } from '@mui/material'
import { MdCircle, MdCancel, MdColorize, MdBrightness4, MdBrightness7 } from 'react-icons/md';
import useStyles from './styles';
import { GiConcentricCrescents, GiInkSwirl } from 'react-icons/gi';
import { HexColorPicker } from "react-colorful";

const Navbar = ( {handleMode, primaryColor, setPrimaryColor, newShade} ) => {
    
    const classes = useStyles();
    const primaryColors = [
        '#7e57c2', '#42a5f5', '#26c6da', '#26a69a', '#66bb6a', '#ffca28', '#ffa726', '#ef5350', '#c62828', '#ec407a'
    ]

    const [color, setColor] = useState("#aabbcc");
    
    const [open, setOpen] = useState(false);
    const [opened, setOpened] = useState(false);

    const handleChange = () => {
      setOpened((prev) => !prev);
    };
    const handleColor = () => {
        setPrimaryColor(color)
    }
    return (
        <div>
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
           
                {/* Toolbar Component - /material-ui/core */}
                <Toolbar disableGutters>
                    {/* Logo + Name */}
                    <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems='center'>
                        <Box display={'flex'} alignItems={'center'}>
                            <div>
                            <GiConcentricCrescents className={classes.icon} size={36}/>
                            </div>
                            <Typography variant='h1'
                                 color='primary'fontWeight={'bold'}>
                                Typing Test
                            </Typography> 
                        </Box>
                        
                        <div>
                            <IconButton aria-label="icon-button-select-color" onClick={() => setOpen(true)}>
                                <Stack>
                                    <MdCircle className={classes.colorIcon}/>
                                <GiInkSwirl color={primaryColor}/> 
                                 </Stack>
                            </IconButton>
                        
                            <Modal
                                open={open}
                                disableScrollLock
                                onClose={() => setOpen(false)}
                                aria-labelledby="color-selector"
                                aria-describedby="select-color-theme">
                                <Grow in={open}
                                    style={{ transformOrigin: '0 0 0' }}
                                    {...(open ? { timeout: 2000 } : {})}>
                                    <Box component={Paper} className={classes.colorStack} borderRadius={3}>       
                                        <Stack spacing={.5} m={1}>
                                            {primaryColors.map((_, index) => (
                                                
                                            <IconButton className={classes.colorIcons} aria-label="icon-button-color"
                                                value={index} 
                                                key={primaryColors[index]} 
                                                onClick={(event) => setPrimaryColor(primaryColors[event.target.value])}
                                                sx={{ 
                                                    backgroundColor: primaryColors[index], 
                                                    '&:hover': {
                                                        opacity: 1,
                                                        transition: '1s',
                                                        backgroundColor: newShade(primaryColors[index], 33),
                                                        boxShadow: "0px 0px 15px rgba(0, 0, 0, .5)",
                                                    }
                                                }}></IconButton>
                                          
                                
                                            ))}
                                            <IconButton aria-label="icon-button-hex-color" className={classes.colorIcons} onClick={handleChange}>
                                                <MdColorize color={primaryColor}/>
                                            </IconButton>
                                            {opened &&
                                                <Box component={Paper} className={classes.colorPicker} borderRadius={'12px'}>
                                                    <Box>
                                                        <IconButton onClick={handleChange}>
                                                            <MdCancel />
                                                        </IconButton>
                                                    </Box>
                                                <HexColorPicker color={color} onChange={setColor} onClickCapture={handleColor}/>
                                                
                                                
                                                </Box>
                                            }
                                            
                                        </Stack>
                                    </Box> 
                                </Grow>
                            </Modal>
                       
                            {localStorage.getItem('darkMode')==='true' ?
                                <IconButton aria-label="dark mode" onClick={handleMode}>
                                    <MdBrightness4 />
                                </IconButton>
                                : 
                                <IconButton aria-label="light mode" onClick={handleMode}>
                                    <MdBrightness7 />
                                </IconButton>         
                            }
                         </div>
                    </Grid>
                </Toolbar>
        </AppBar>
        <div className={classes.toolbar}/>
        </div>
    )
}

export default Navbar;