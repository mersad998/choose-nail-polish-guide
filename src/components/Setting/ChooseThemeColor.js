import React, {useState, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, StatusBar} from 'react-native';
import SideMenu from 'react-native-side-menu';
import CustomDrawer from 'utils/constants/CustomDrawer';
import {MyHeader, CoustomTextComponent} from 'utils/constants/elements';
import {Icon, Content} from 'native-base';
import {ColorThemeContext} from 'utils/Context/ColorThemeContext';
import MainColors from 'utils/Context/MainColors';
import {
  saveAppGeneralInfo,
  getAppGeneralInfo,
} from 'utils/database/AppGeneralInfo';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LanguageContext} from 'utils/Context/LanguageContext';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {darkPink} from 'utils/constants/colors';

export default function ChooseThemeColor(props) {
  const [drawer, setDrawer] = useState(false);
  const {colors, setColors} = useContext(ColorThemeContext);
  const {language} = useContext(LanguageContext);

  const toggleNavBar = () => setDrawer(prevDrawer => !prevDrawer);
  function afterToggleDrawer(state) {
    setTimeout(() => {
      setDrawer(state);
    }, 500);
  }

  const SeettingItem = ({
    name,
    IconName,
    onPress,
    color1,
    color2,
    color3,
    color4,
    color5,
  }) => (
    <TouchableOpacity
      style={styles.ItemContainer(Colors.Background)}
      onPress={onPress}>
      <View style={styles.ColorsContainer}>
        <Icon
          type="FontAwesome"
          name={IconName}
          style={styles.itemIcon(color1)}
        />
        <Icon
          type="FontAwesome"
          name={IconName}
          style={styles.itemIcon(color2)}
        />
        <Icon
          type="FontAwesome"
          name={IconName}
          style={styles.itemIcon(color3)}
        />
        <Icon
          type="FontAwesome"
          name={IconName}
          style={styles.itemIcon(color4)}
        />
        <Icon
          type="FontAwesome"
          name={IconName}
          style={styles.itemIcon(color5)}
        />
      </View>
      <CoustomTextComponent style={styles.itemTitle(colors.TextColor)}>
        {name}
      </CoustomTextComponent>
    </TouchableOpacity>
  );
  const onChooseTheme = async (themeNumber, message, currentTheme) => {
    if (themeNumber === currentTheme) {
      return;
    } else {
      try {
        const info = await getAppGeneralInfo();

        if (info) {
          const lng = info.Language;
          const FontNumber = info.FontNumber;
          await saveAppGeneralInfo(themeNumber, lng, FontNumber).then(
            console.log('Theme saved in DB'),
          );
        } else {
          const defaultLanguage = 'FA';
          const defaultFont = '1';
          await saveAppGeneralInfo(
            themeNumber,
            defaultLanguage,
            defaultFont,
          ).then(console.log('Theme saved in DB'));
        }
      } catch (error) {
        console.log('Err in save Theme in DB');
      }

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
        Title={language.txtChooseTheme}
        onHamburgerPress={toggleNavBar}
      />
      <StatusBar backgroundColor={darkPink} />
      <Content style={styles.Container(colors.Background)}>
        <SeettingItem
          name={language.txtDefault}
          IconName="circle"
          onPress={() =>
            onChooseTheme('1', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_1.Background}
          color2={MainColors.Theme_1.NavBar}
          color3={MainColors.Theme_1.TextColor}
          color4={MainColors.Theme_1.Header}
          color5={MainColors.Theme_1.Button}
        />
        <SeettingItem
          name={language.txtDarkMode1}
          IconName="circle"
          onPress={() =>
            onChooseTheme('8', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_8.Background}
          color2={MainColors.Theme_8.NavBar}
          color3={MainColors.Theme_8.TextColor}
          color4={MainColors.Theme_8.Header}
          color5={MainColors.Theme_8.Button}
        />
        <SeettingItem
          name={language.txtDarkMode2}
          IconName="circle"
          onPress={() =>
            onChooseTheme('13', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_13.Background}
          color2={MainColors.Theme_13.NavBar}
          color3={MainColors.Theme_13.TextColor}
          color4={MainColors.Theme_13.Header}
          color5={MainColors.Theme_13.Button}
        />
        <SeettingItem
          name={language.txtchocolate}
          IconName="circle"
          onPress={() =>
            onChooseTheme('3', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_3.Background}
          color2={MainColors.Theme_3.NavBar}
          color3={MainColors.Theme_3.TextColor}
          color4={MainColors.Theme_3.Header}
          color5={MainColors.Theme_3.Button}
        />
        <SeettingItem
          name={language.txtRedBlack}
          IconName="circle"
          onPress={() =>
            onChooseTheme('11', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_11.Background}
          color2={MainColors.Theme_11.NavBar}
          color3={MainColors.Theme_11.TextColor}
          color4={MainColors.Theme_11.Header}
          color5={MainColors.Theme_11.Button}
        />
        <SeettingItem
          name={language.txtBrownBlue}
          IconName="circle"
          onPress={() =>
            onChooseTheme('2', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_2.Background}
          color2={MainColors.Theme_2.NavBar}
          color3={MainColors.Theme_2.TextColor}
          color4={MainColors.Theme_2.Header}
          color5={MainColors.Theme_2.Button}
        />

        <SeettingItem
          name={language.txtPinkBlue}
          IconName="circle"
          onPress={() =>
            onChooseTheme('4', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_4.Background}
          color2={MainColors.Theme_4.NavBar}
          color3={MainColors.Theme_4.TextColor}
          color4={MainColors.Theme_4.Header}
          color5={MainColors.Theme_4.Button}
        />
        <SeettingItem
          name={language.txtGreenRed}
          IconName="circle"
          onPress={() =>
            onChooseTheme('5', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_5.Background}
          color2={MainColors.Theme_5.NavBar}
          color3={MainColors.Theme_5.TextColor}
          color4={MainColors.Theme_5.Header}
          color5={MainColors.Theme_5.Button}
        />
        <SeettingItem
          name={language.txtYellowBlue}
          IconName="circle"
          onPress={() =>
            onChooseTheme('6', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_6.Background}
          color2={MainColors.Theme_6.NavBar}
          color3={MainColors.Theme_6.TextColor}
          color4={MainColors.Theme_6.Header}
          color5={MainColors.Theme_6.Button}
        />
        <SeettingItem
          name={language.txtBrownGold}
          IconName="circle"
          onPress={() =>
            onChooseTheme('7', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_7.Background}
          color2={MainColors.Theme_7.NavBar}
          color3={MainColors.Theme_7.TextColor}
          color4={MainColors.Theme_7.Header}
          color5={MainColors.Theme_7.Button}
        />

        <SeettingItem
          name={language.txtPinkGreen}
          IconName="circle"
          onPress={() =>
            onChooseTheme('9', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_9.Background}
          color2={MainColors.Theme_9.NavBar}
          color3={MainColors.Theme_9.TextColor}
          color4={MainColors.Theme_9.Header}
          color5={MainColors.Theme_9.Button}
        />
        <SeettingItem
          name={language.txtGreyYellow}
          IconName="circle"
          onPress={() =>
            onChooseTheme('10', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_10.Background}
          color2={MainColors.Theme_10.NavBar}
          color3={MainColors.Theme_10.TextColor}
          color4={MainColors.Theme_10.Header}
          color5={MainColors.Theme_10.Button}
        />

        <SeettingItem
          name={language.txtGreywhite}
          IconName="circle"
          onPress={() =>
            onChooseTheme('12', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_12.Background}
          color2={MainColors.Theme_12.NavBar}
          color3={MainColors.Theme_12.TextColor}
          color4={MainColors.Theme_12.Header}
          color5={MainColors.Theme_12.Button}
        />

        <SeettingItem
          name={language.txtColorfull}
          IconName="circle"
          onPress={() =>
            onChooseTheme('14', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_14.Background}
          color2={MainColors.Theme_14.NavBar}
          color3={MainColors.Theme_14.TextColor}
          color4={MainColors.Theme_14.Header}
          color5={MainColors.Theme_14.Button}
        />
        <SeettingItem
          name={language.txtPink}
          IconName="circle"
          onPress={() =>
            onChooseTheme('15', language.txtThemeChanged, colors.key)
          }
          color1={MainColors.Theme_15.Background}
          color2={MainColors.Theme_15.NavBar}
          color3={MainColors.Theme_15.TextColor}
          color4={MainColors.Theme_15.Header}
          color5={MainColors.Theme_15.Button}
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
  itemTitle: color => {
    return {fontSize: 14, color: color};
  },
  ColorsContainer: {
    flexDirection: 'row',
  },
});
