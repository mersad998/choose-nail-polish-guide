import React, {useState, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, StatusBar} from 'react-native';
import SideMenu from 'react-native-side-menu';
import CustomDrawer from 'utils/constants/CustomDrawer';
import {MyHeader, CoustomTextComponent} from 'utils/constants/elements';
import {Content} from 'native-base';
import {ColorThemeContext} from 'utils/Context/ColorThemeContext';
import {LanguageContext} from 'utils/Context/LanguageContext';
import {FontsContext} from 'utils/Context/FontsContext';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import Fonts from 'utils/Context/Fonts';
import {
  saveAppGeneralInfo,
  getAppGeneralInfo,
} from 'utils/database/AppGeneralInfo';
import {darkPink} from 'utils/constants/colors';

export default function ChooseFont(props) {
  const [drawer, setDrawer] = useState(false);
  const {colors} = useContext(ColorThemeContext);
  const {language} = useContext(LanguageContext);
  const {fonts, setFonts} = useContext(FontsContext);

  const toggleNavBar = () => setDrawer(prevDrawer => !prevDrawer);
  function afterToggleDrawer(state) {
    setTimeout(() => {
      setDrawer(state);
    }, 500);
  }

  const SeettingItem = ({name, Font, onPress}) => (
    <TouchableOpacity
      style={styles.ItemContainer(colors.Background)}
      onPress={onPress}>
      <View style={styles.ColorsContainer}>
        <CoustomTextComponent style={styles.itemTitle(colors.TextColor, Font)}>
          {language.txtAppName}
        </CoustomTextComponent>
      </View>
      <CoustomTextComponent style={styles.itemTitle(colors.TextColor)}>
        {name}
      </CoustomTextComponent>
    </TouchableOpacity>
  );
  const onChooseFont = async (fontNumber, currentFont, message) => {
    if (fontNumber === currentFont) {
      return;
    } else {
      try {
        const info = await getAppGeneralInfo();

        if (info) {
          const Language = info.Language;
          const themeNumber = info.ThemeNumber;
          await saveAppGeneralInfo(themeNumber, Language, fontNumber).then(
            console.log('Font saved in DB'),
          );
        } else {
          const defaultTheme = '1';
          const defaultLanguage = 'FA';

          await saveAppGeneralInfo(
            defaultTheme,
            defaultLanguage,
            fontNumber,
          ).then(console.log('Font saved in DB'));
        }
      } catch (error) {
        console.log('Err in save Font in DB');
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
      showMessage({
        message: message,
        type: 'success',
      });
    }
  };

  return (
    <SideMenu
      menu={<CustomDrawer navigation={props.navigation} />}
      menuPosition="right"
      onChange={state => {
        afterToggleDrawer(state);
      }}
      isOpen={drawer}
      bounceBackOnOverdraw={false}>
      <MyHeader
        Title={language.txtChooseFont}
        onHamburgerPress={toggleNavBar}
      />
      <StatusBar backgroundColor={darkPink} />
      <Content style={styles.Container(colors.Background)}>
        <SeettingItem
          name={language.txtTheme1}
          Font={Fonts.Font_1.FontName}
          onPress={() => onChooseFont('1', fonts.key, language.txtFontChanged)}
        />
        <SeettingItem
          name={language.txtTheme2}
          Font={Fonts.Font_2.FontName}
          onPress={() => onChooseFont('2', fonts.key, language.txtFontChanged)}
        />
        <SeettingItem
          name={language.txtTheme3}
          Font={Fonts.Font_3.FontName}
          onPress={() => onChooseFont('3', fonts.key, language.txtFontChanged)}
        />
        <SeettingItem
          name={language.txtTheme4}
          Font={Fonts.Font_4.FontName}
          onPress={() => onChooseFont('4', fonts.key, language.txtFontChanged)}
        />
        <SeettingItem
          name={language.txtTheme5}
          Font={Fonts.Font_5.FontName}
          onPress={() => onChooseFont('5', fonts.key, language.txtFontChanged)}
        />
        <SeettingItem
          name={language.txtTheme6}
          Font={Fonts.Font_6.FontName}
          onPress={() => onChooseFont('6', fonts.key, language.txtFontChanged)}
        />
      </Content>
      <FlashMessage position="bottom" />
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  Container: color => {
    return {
      flex: 1,
      backgroundColor: color,
    };
  },
  ItemContainer: color => {
    return {
      height: 50,
      backgroundColor: color,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      borderBottomColor: 'grey',
      borderBottomWidth: 0.5,
    };
  },
  itemIcon: color => {
    return {
      fontSize: 20,
      color: color,
      marginHorizontal: 1,
    };
  },
  itemTitle: (color, Font) => {
    return {fontSize: 14, color: color, fontFamily: Font};
  },
  ColorsContainer: {
    flexDirection: 'row',
  },
});
