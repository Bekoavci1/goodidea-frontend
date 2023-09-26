import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Implement logic to get user preference or system settings for dark mode
    // and update isDarkMode accordingly.
    // You can use AsyncStorage or other storage mechanisms to save the user's preference.
  }, []);

  const toggleDarkMode = () => {
    // Implement logic to toggle between dark and light mode
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};