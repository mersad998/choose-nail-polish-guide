import React, {useEffect, useContext} from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';
import {CoustomTextComponent} from 'utils/constants/elements';
import {Spinner} from 'native-base';
import {Background} from 'utils/constants/elements';
import {ColorThemeContext} from 'utils/Context/ColorThemeContext';
import {LanguageContext} from 'utils/Context/LanguageContext';
import Texts from 'utils/Context/Texts';
import MainColors from 'utils/Context/MainColors';
import {getAppGeneralInfo} from 'utils/database/AppGeneralInfo';
import {FontsContext} from 'utils/Context/FontsContext';
import Fonts from 'utils/Context/Fonts';
import {darkPink} from 'utils/constants/colors';
import Session from 'utils/Statics';

export default function SplashScreen(props) {
  const {colors, setColors} = useContext(ColorThemeContext);
  const {language, setLanguage} = useContext(LanguageContext);
  const {fonts, setFonts} = useContext(FontsContext);

  const setTheme = async () => {
    const info = await getAppGeneralInfo();

    if (info) {
      const themeNumber = info.ThemeNumber;
      const Lang = info.Language;
      const fontNumber = info.FontNumber;

      switch (themeNumber) {
        case '1':
          setColors(MainColors.Theme_1);
          break;
        case '2':
          setColors(MainColors.Theme_2);
          break;
        case '3':
          setColors(MainColors.Theme_3);
          break;
        case '4':
          setColors(MainColors.Theme_4);
          break;
        case '5':
          setColors(MainColors.Theme_5);
          break;
        case '6':
          setColors(MainColors.Theme_6);
          break;
        case '7':
          setColors(MainColors.Theme_7);
          break;
        case '8':
          setColors(MainColors.Theme_8);
          break;
        case '9':
          setColors(MainColors.Theme_9);
          break;
        case '10':
          setColors(MainColors.Theme_10);
          break;
        case '11':
          setColors(MainColors.Theme_11);
          break;
        case '12':
          setColors(MainColors.Theme_12);
          break;
        case '13':
          setColors(MainColors.Theme_13);
          break;
        case '14':
          setColors(MainColors.Theme_14);
          break;
        case '15':
          setColors(MainColors.Theme_15);
          break;
        default:
          setColors(MainColors.Theme_1);
          break;
      }
      switch (Lang) {
        case 'FA':
          setLanguage(Texts.FA);
          break;
        case 'EN':
          setLanguage(Texts.EN);
          break;
        default:
          setLanguage(Texts.FA);
          break;
      }
      switch (fontNumber) {
        case '1':
          setFonts(Fonts.Font_1);
          break;
        case '2':
          setFonts(Fonts.Font_2);
          break;
        case '3':
          setFonts(Fonts.Font_3);
          break;
        case '4':
          setFonts(Fonts.Font_4);
          break;
        case '5':
          setFonts(Fonts.Font_5);
          break;
        case '6':
          setFonts(Fonts.Font_6);
          break;
        default:
          setFonts(Fonts.Font_1);
          break;
      }
    } else {
      setColors(MainColors.Theme_1);
      setLanguage(Texts.FA);
      setFonts(Fonts.Font_1);
    }
  };

  useEffect(() => {
    Session.set('SessionNumber', 1);
    setTheme();
    setTimeout(() => {
      props.navigation.replace('MainComponent');
    }, 3000);
  }, []);

  return (
    <Background>
      <View style={styles.Container}>
        <StatusBar backgroundColor={darkPink} />
        <Image
          resizeMode={'stretch'}
          source={require('assets/logo.png')}
          style={styles.Image}
        />
        <CoustomTextComponent style={styles.Text}>
          {language.txtSlogen}
        </CoustomTextComponent>
        <View style={styles.BottomLayout}>
          <Spinner color="#d4a1d0" style={styles.Spinner} />
          <CoustomTextComponent style={styles.TextDescription}>
            {language.txtLoading}
          </CoustomTextComponent>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  Image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: '30%',
  },
  Text: {
    marginTop: 30,
    color: 'black',
    fontSize: 16,
  },
  Spinner: {
    marginTop: 30,
  },
  TextDescription: {
    marginTop: 8,
    color: 'black',
    fontSize: 12,
  },
  BottomLayout: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
});
