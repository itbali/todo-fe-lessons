import {createContext, ReactNode, useContext, useState} from "react";
import {styled} from "@mui/material/styles";

interface IThemeContext {
    theme: string
    setTheme: (newTheme: 'light' | 'dark') => void
}

export const defaultTheme: IThemeContext = {
    theme: '',
    setTheme: () => {
    }
}

const ThemeContext = createContext(defaultTheme)

export const ThemeProvider = ({children}: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const themeHandler = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    const StyledTheme = styled('body')(() => ({
        color: theme === 'dark' ? 'white' : '',
        backgroundColor: theme === 'dark' ? 'black' : '',
        '& div': {
            backgroundColor: theme === 'dark' ? 'rgb(21, 101, 192, 0.3)' : '',
            color: theme === 'dark' ? 'white' : '',
        }
    }))

    return <>
        <StyledTheme>
            <ThemeContext.Provider value={{theme: theme, setTheme: themeHandler}}>
                {children}
            </ThemeContext.Provider>
        </StyledTheme>
    </>
}

export const useThemeStore = () => {
    return useContext(ThemeContext)
}