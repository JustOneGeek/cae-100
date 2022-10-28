import {useState, createContext} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import getTheme from '../themes/base'

export const ThemeContext = createContext({
    currentTheme: 'primaryTheme',
    setTheme:null
})

const CustomThemeProvider = ({children})=>{
    const currentTheme = localStorage.getItem('craveTheme')||'primaryTheme';
    const [themeName, _setThemeName]=useState(currentTheme)
    const theme = getTheme(themeName)

    const setThemeName=(name)=>{
        _setThemeName(name)
        localStorage.setItem('craveTheme', currentTheme)
    }


    const values={
        currentTheme: themeName,
        setTheme:setThemeName
    }

    return(
        <ThemeContext.Provider value={values}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default CustomThemeProvider