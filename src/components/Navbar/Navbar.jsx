import React, { useState } from 'react'
import { styled, AppBar, Toolbar, IconButton, Box, Typography, Grid, Paper, Grow, Modal, Button } from '@mui/material'
import { MdOutlineKeyboard, MdCircle, MdBrightness4, MdBrightness7 } from 'react-icons/md';
import { RiDragMoveFill } from 'react-icons/ri'
import useStyles from './styles';
import { GiInkSwirl } from 'react-icons/gi';
import { HexColorPicker } from "react-colorful";
import Draggable from 'react-draggable';
const Navbar = ( {toggleDark, darkMode, primaryColor, toggleColor, neonMode, toggleNeon} ) => {
    
    const classes = useStyles();
    const presetColors = [
        '#7e57c2', '#42a5f5', '#26c6da', '#26a69a', '#66bb6a', '#ffca28', '#ffa726', '#ef5350', '#c62828', '#ec407a'
    ]

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState(primaryColor);
    const CustomButton = styled(Button)({
        
        textTransform: 'none',
        borderColor: primaryColor,
        '&:hover': {
            borderColor: 'primary.main',
            boxShadow: `0 0 5px ${primaryColor}`,
            border: '2px solid',
            
        },
    });

    const nodeRef = React.useRef(null);
    return (
        <div>
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
            {/* Toolbar Component - /material-ui/core */}
            <Toolbar disableGutters>
                {/* Logo + Name */}
                <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems='center'>
                    
                    <Box display={'flex'} alignItems={'center'} gap={1} ml={3}>
                        <Typography display={'flex'} color='secondary' fontSize={'32px'} sx={{display: {xs: 'none', sm: 'flex'}}}>
                        <MdOutlineKeyboard/>
                        </Typography>
                        <Typography className={neonMode ? classes.neon : null} variant='h1' 
                                color={neonMode ? 'primary.light' : 'primary.main'} fontWeight={'bold'}>
                                NeonType
                        </Typography> 
                    </Box>
                    
                    <Box display={'flex'} position={'absolute'} right={0} mr={3} sx={{gap: {xs: 0, sm: 2, md: 3}}}>
                        
                        <CustomButton aria-label="icon-button-select-color" onClick={toggleNeon} className={neonMode ? classes.neon : null}>
                            <Typography color={neonMode ? 'primary.light' : 'primary.main'} fontSize={16} fontWeight={'bold'}>
                                {neonMode ? 'neOff' : 'neOn'}
                            </Typography>
                        </CustomButton>

                        <IconButton  aria-label="icon-button-select-color" onClick={() => setOpen(true)}>
                            <MdCircle className={classes.colorIcon}/>
                            <Box className={neonMode ? classes.neon : null} 
                                color={neonMode ? 'primary.light' : 'primary.main'} 
                                display={'flex'} justifyContent='center'>
                                <GiInkSwirl /> 
                            </Box>
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
                                <div>
                                <Draggable handle='.cursor' nodeRef={nodeRef}>
                                    <Box component={Paper} ref={nodeRef} 
                                        className={neonMode ? classes.neon : null} 
                                        borderRadius={3} border={`2px solid ${primaryColor}`}
                                        sx={{
                                            display: 'flex',
                                            padding: '10px',
                                            position: 'absolute',
                                            flexDirection: 'column',
                                            right: 0,
                                            width: 250,
                                        }}> 
                                        <Box className="cursor">
                                            <RiDragMoveFill 
                                            className={neonMode ? classes.neon : null} 
                                            color={primaryColor}
                                            size={24}/>
                                        </Box>
                                        <Box alignSelf={'center'} >
                                            <HexColorPicker 
                                            aria-label='hex-color-picker' 
                                            color={primaryColor} 
                                            onChange={setColor} 
                                            onClick={() => toggleColor(color)}
                                            onTouchEnd={() => toggleColor(color)}/>
                                        </Box>
                                        
                                        <Box className={classes.swatches}>
                                            {presetColors.map((presetColor) => (
                                                <button
                                                key={presetColor}
                                                className={classes.swatch}
                                                style={{ background: presetColor }}
                                                onClick={() => toggleColor(presetColor)}/>
                                            ))}
                                        </Box>
                                    </Box> 
                                </Draggable>
                                </div>
                            </Grow>
                        </Modal>
                    
                        {darkMode ?
                            <IconButton aria-label="dark mode" onClick={toggleDark}>
                                <MdBrightness4 />
                            </IconButton>
                            : 
                            <IconButton aria-label="light mode" onClick={toggleDark}>
                                <MdBrightness7 />
                            </IconButton>         
                        }
                    </Box>
                </Grid>
            </Toolbar>
        </AppBar>
        <div className={classes.toolbar}/>
        </div>
    )
}

export default Navbar;