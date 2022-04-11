import React, {useState, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, StatusBar} from 'react-native';
import SideMenu from 'react-native-side-menu';
import CustomDrawer from 'utils/constants/CustomDrawer';
import {MyHeader, CoustomTextComponent} from 'utils/constants/elements';
import {Content} from 'native-base';
import {ColorThemeContext} from 'utils/Context/ColorThemeContext';
import {LanguageContext} from 'utils/Context/LanguageContext';
import Texts from 'utils/Context/Texts';
import {
  saveAppGeneralInfo,
  getAppGeneralInfo,
} from 'utils/database/AppGeneralInfo';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Flag from 'react-native-round-flags';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {darkPink} from 'utils/constants/colors';

export default function ChooseLanguage(props) {
  const [drawer, setDrawer] = useState(false);
  const {colors} = useContext(ColorThemeContext);
  const {language, setLanguage} = useContext(LanguageContext);

  const toggleNavBar = () => setDrawer(prevDrawer => !prevDrawer);
  function afterToggleDrawer(state) {
    setTimeout(() => {
      setDrawer(state);
    }, 500);
  }

  const SeettingItem = ({name, Country, onPress}) => (
    <TouchableOpacity
      style={styles.ItemContainer(Colors.Background)}
      onPress={onPress}>
      <View style={styles.ColorsContainer}>
        <Flag code={Country} />
      </View>
      <CoustomTextComponent style={styles.itemTitle(colors.TextColor)}>
        {name}
      </CoustomTextComponent>
    </TouchableOpacity>
  );
  const onChooseLanguage = async (lng, message, currentLanguage) => {
    if (lng === currentLanguage) {
      return;
    } else {
      try {
        const info = await getAppGeneralInfo();

        if (info) {
          const themeNumber = info.ThemeNumber;
          const FontNumber = info.FontNumber;
          await saveAppGeneralInfo(themeNumber, lng, FontNumber).then(
            console.log('Language saved in DB'),
          );
        } else {
          const defaultTheme = '1';
          const defaultFont = '1';
          await saveAppGeneralInfo(defaultTheme, lng, defaultFont).then(
            console.log('Language saved in DB'),
          );
        }
      } catch (error) {
        console.log('Err in save Language in DB');
      }

      switch (lng) {
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
        Title={language.txtChooseLanguage}
        onHamburgerPress={toggleNavBar}
      />
      <StatusBar backgroundColor={darkPink} />

      <Content style={styles.Container(colors.Background)}>
        <SeettingItem
          name="فارسی"
          Country="IR"
          onPress={() =>
            onChooseLanguage('FA', language.txtLanguageChanged, language.key)
          }
        />
        <SeettingItem
          name="English"
          Country="GB"
          onPress={() =>
            onChooseLanguage('EN', language.txtLanguageChanged, language.key)
          }
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
      height: 70,
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
  itemTitle: color => {
    return {fontSize: 14, color: color};
  },
  ColorsContainer: {
    flexDirection: 'row',
  },
});
