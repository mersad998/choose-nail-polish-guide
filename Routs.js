import React from 'react';
import {fromRight} from 'react-navigation-transitions';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

// --------------------------------------------[صفحه ها ی برنامه]------------------------------------

// صفحه اسپلش
import SplashScreen from 'components/SplashScreen';
import MainComponent from 'components/MainComponent';
import Setting from 'components/Setting/Setting';
import ChooseThemeColor from 'components/Setting/ChooseThemeColor';
import ChooseLanguage from 'components/Setting/ChooseLanguage';
import ChooseFont from 'components/Setting/ChooseFont';

export default function Routs() {
  const routs = createStackNavigator(
    {
      SplashScreen,
      MainComponent,
      Setting,
      ChooseThemeColor,
      ChooseLanguage,
      ChooseFont,
    },
    {
      initialRouteName: 'SplashScreen',
      headerMode: 'none',
      transitionConfig: () => fromRight(150),
    },
  );
  const App = createAppContainer(routs);
  return <App />;
}
