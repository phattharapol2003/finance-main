import React, { createContext, useState } from 'react';
import { Text } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {typeof children === 'string' ? <Text>{children}</Text> : children}
        </ThemeContext.Provider>
    );
};
