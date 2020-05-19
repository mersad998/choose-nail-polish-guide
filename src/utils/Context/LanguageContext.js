import React, {createContext, useState, useMemo} from 'react';
import Texts from './Texts';
export const LanguageContext = createContext();

function LanguageProvider({children}) {
  const [language, setLanguage] = useState(Texts.FA); //setting Persian language as default
  const value = useMemo(() => ({language, setLanguage}), [
    language,
    setLanguage,
  ]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
