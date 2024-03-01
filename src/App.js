import React, { lazy, Suspense, useState, useEffect } from 'react'
import { grey } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import "@fontsource/quicksand";
import "@fontsource/sacramento";
import { useDebounce } from 'use-debounce';
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Tester = lazy(() => import('./components/TypingTester/Tester'));
const Info = lazy(() => import ('./components/Info/Info'))


const renderLoader = () => <Typography position={'absolute'} right={'50%'} top={'20%'}>loading . . .</Typography>;

function App() {
  
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode')==='true');
    const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('color')===null ? '#7e57c2' : localStorage.getItem('color'))
    const [invertedColor, setInvertedColor] = useState(invertColor(localStorage.getItem('color')===null ? '#7e57c2' : localStorage.getItem('color')))
    const [neonMode, setNeonMode] = useState(localStorage.getItem('neonMode')==='true');
    const [showInfo, setShowInfo] = useState(false)
    const [debouncedColor] = useDebounce(primaryColor, 500)
    
    // toggle dark mode
    const toggleDark = () => { setDarkMode(!darkMode) }
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])
    
    // toggle color mode
    const toggleColor = (color) => {
        setPrimaryColor(color)
        setInvertedColor(invertColor(color))
    }
    useEffect(() => {
        localStorage.setItem('color', debouncedColor)
    }, [debouncedColor])
    
    // handle neon mode
    const toggleNeon = () => { setNeonMode(!neonMode) }
    useEffect(() => {
        localStorage.setItem('neonMode', neonMode)
    }, [neonMode])
    
    // function to lighten or darken a hex color based on an integer magnitude
    // https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
    const newShade = (hexColor, magnitude) => {
        hexColor = hexColor.replace(`#`, ``);
        if (hexColor.length === 6) {
          const decimalColor = parseInt(hexColor, 16);
          let r = (decimalColor >> 16) + magnitude;
          r > 255 && (r = 255);
          r < 0 && (r = 0);
          let g = (decimalColor & 0x0000ff) + magnitude;
          g > 255 && (g = 255);
          g < 0 && (g = 0);
          let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
          b > 255 && (b = 255);
          b < 0 && (b = 0);
          return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
        } else {
            return hexColor;
        }
    };
    // function to invert a hex color
    function invertColor(hex) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        // invert color components
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return '#' + padZero(r) + padZero(g) + padZero(b);
    }
    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
      
    // mode theme: light
    const light = {
        palette: {
        mode: "light",
        primary: {
            main: primaryColor,
            bg: grey[50],
        },
        secondary: {
            main: grey[600],
            light: grey[50],
        },
        inverted: {
            main: invertedColor
        },
        }, 
    }
    // mode theme: dark
    const dark = {
        palette: {
        mode: "dark",
        primary: {
            main: primaryColor,
            invert: invertedColor,
            bg: grey[900],
        },
        secondary: {
            main: grey[50],
            light: grey[800],
        },
        inverted: {
            main: invertedColor
        },
        },
    }
    // shared theme
    
    const theme = createTheme(darkMode ? dark : light, {
        typography: {
            h1: {
                fontSize: 24,
                fontFamily: ['Roboto', 'Quicksand'],
                fontWeight: 'bold',
            },
            h2: {
                fontSize: 48,
                fontFamily: ['Roboto', 'Quicksand'],
                fontWeight: 'bold',
            },
            h3: {
                fontSize: 32,
                fontFamily: ['Roboto', 'Quicksand'],
                fontWeight: 'bold',
                filter:`drop-shadow(2px 2px 2px #424242)`,
            },
            h4: {
                fontFamily: ['Roboto', 'Quicksand'],
                fontSize: 32,
            },
            h5: {
                fontFamily: ['Roboto', 'Quicksand'],
            },
            h6: {
                fontFamily: ['Roboto', 'Quicksand'],
            },
            body1: {
                fontFamily: ['Roboto', 'Quicksand'],
                fontSize: 16,
            },  
            body2: {
                fontFamily: ['Roboto', 'Quicksand'],
            }, 
            caption: {
                fontFamily: ['Roboto', 'Quicksand'],
                fontSize: 12,
            },       
        },
        
    });
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline enableColorScheme/>
        <div>
        <Suspense fallback={renderLoader()}>
            <Navbar toggleDark={toggleDark} darkMode={darkMode} primaryColor={primaryColor} toggleColor={toggleColor} newShade={newShade} neonMode={neonMode} toggleNeon={toggleNeon}/>
            <Box>
            <Tester primaryColor={primaryColor} newShade={newShade} neonMode={neonMode} showInfo={showInfo} setShowInfo={setShowInfo}/>
            </Box>
            
            <Box>
            <Info neonMode={neonMode} primaryColor={primaryColor} showInfo={showInfo}/>
            </Box>
            </Suspense>
        </div>
    </ThemeProvider>
  );
}

export default App;
