import React, { createContext, useState } from 'react';
import { Text } from 'react-native';

export const FinanceContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <FinanceContext.Provider value={{ theme, toggleTheme }}>
            {typeof children === 'string' ? <Text>{children}</Text> : children}
        </FinanceContext.Provider>
    );
};
