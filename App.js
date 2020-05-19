import React from 'react';
import Routs from './Routs';
import ColorThemeProvider from 'utils/Context/ColorThemeContext';
import LanguageProvider from 'utils/Context/LanguageContext';
import FontsProvider from 'utils/Context/FontsContext';

export default class App extends React.Component {
  render() {
    return (
      <LanguageProvider>
        <ColorThemeProvider>
          <FontsProvider>
            <Routs />
          </FontsProvider>
        </ColorThemeProvider>
      </LanguageProvider>
    );
  }
}
