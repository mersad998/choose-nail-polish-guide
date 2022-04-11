import React from 'react';
import Routs from './Routs';
import ColorThemeProvider from 'utils/Context/ColorThemeContext';
import LanguageProvider from 'utils/Context/LanguageContext';
import FontsProvider from 'utils/Context/FontsContext';
import Tapsell from 'react-native-tapsell';
const TAPSELL_KEY =
  'plpqgejtbsncqagqrbopqsmgsfmolmjranbsnbqbffoiabtboqgtgbbpiqfofmcafnlneo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    Tapsell.initialize(TAPSELL_KEY);
  }
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
