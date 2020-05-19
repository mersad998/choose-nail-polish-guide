import React, {createContext, useState, useMemo} from 'react';
import Fonts from './Fonts';
export const FontsContext = createContext();

function FontsProvider({children}) {
  const [fonts, setFonts] = useState(Fonts.Font_1); //setting Iran sans as default
  const value = useMemo(() => ({fonts, setFonts}), [fonts, setFonts]);

  return (
    <FontsContext.Provider value={value}>{children}</FontsContext.Provider>
  );
}

export default FontsProvider;
