import React, {createContext, useState, useMemo} from 'react';
import MainColors from './MainColors';
export const ColorThemeContext = createContext();

function ColorThemeProvider({children}) {
  const [colors, setColors] = useState(MainColors.lightTheme); //setting light theme as default
  const value = useMemo(() => ({colors, setColors}), [colors, setColors]);

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export default ColorThemeProvider;
