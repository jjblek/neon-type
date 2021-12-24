import React, { lazy, Suspense, useState } from 'react'
import { grey } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import "@fontsource/quicksand";

const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Tester = lazy(() => import('./components/TypingTester/Tester'));
const renderLoader = () => <p>Loading</p>;

function App() {
  
    const [darkMode, setDarkMode] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('#7e57c2')
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
        }, 
    }
    // mode theme: dark
    const dark = {
        palette: {
        mode: "dark",
        primary: {
            main: primaryColor,
            bg: grey[900],
        },
        secondary: {
            main: grey[50],
            light: grey[800],
        },
        },
    }
    // shared theme
    
    const theme = createTheme(localStorage.getItem('darkMode')==='true' ? dark : light, {
        typography: {
            h1: {
                fontFamily: ['Roboto', 'Quicksand'],
                fontSize: 24,
                fontWeight: 'bold',
                filter:`drop-shadow(2px 2px 2px #424242)`,
            },
            h2: {
                fontSize: 48,
                fontFamily: ['Roboto', 'Quicksand'],
                fontWeight: 'bold',
                filter:`drop-shadow(1px 1px 2px #424242)`,
            },
            h3: {
                fontSize: 32,
                fontFamily: ['Roboto', 'Quicksand'],
                fontWeight: 'bold',
                filter:`drop-shadow(2px 2px 2px #424242)`,
            },
            h4: {
                fontFamily: ['Roboto', 'Quicksand'],
                
                
            },
            h5: {
                fontFamily: ['Roboto', 'Quicksand'],
                
            },
            h6: {
                fontFamily: ['Roboto', 'Quicksand'],
                
            },
            body1: {
                fontFamily: ['Roboto', 'Quicksand'],
                
            },  
            body2: {
                fontFamily: ['Roboto', 'Quicksand'],
                
            }, 
            caption: {
                fontFamily: ['Roboto', 'Quicksand'],
                
            },       
        }
    });
    // handle dark mode
    const handleMode = () => {
        if (localStorage.getItem('darkMode')==='false' || localStorage.getItem('darkMode')===null) localStorage.setItem('darkMode', true)
        else localStorage.setItem('darkMode', false)
        setDarkMode(!darkMode)
      
       
    };

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
  
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline enableColorScheme/>
        <div>
        <Suspense fallback={renderLoader()}>
            <Navbar handleMode={handleMode} primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} newShade={newShade}/>
            
                <Tester />
            </Suspense>
        </div>
    </ThemeProvider>
  );
}

export default App;
