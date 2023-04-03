import React, {useState} from 'react';
import { ThemeContext } from "./ThemeContext";

const THEME = {
  DARK: 'dark',
  LIGHT: 'light'
}

const initialTheme = localStorage.getItem('theme') || 'dark'

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme)

  const toggleTheme = () => {
    const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK

    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const defaultValue = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;