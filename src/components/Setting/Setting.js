import React, {useState, useContext} from 'react';
import {ColorThemeContext} from 'utils/Context/ColorThemeContext';
import {StyleSheet, View, TouchableOpacity, StatusBar} from 'react-native';
import SideMenu from 'react-native-side-menu';
import CustomDrawer from 'utils/constants/CustomDrawer';
import {MyHeader, CoustomTextComponent} from 'utils/constants/elements';
import {Icon} from 'native-base';
import {LanguageContext} from 'utils/Context/LanguageContext';
import {darkPink} from 'utils/constants/colors';

export default function Setting(props) {
  const [drawer, setDrawer] = useState(false);
  const {colors} = useContext(ColorThemeContext);
  const {language} = useContext(LanguageContext);

  const toggleNavBar = () => setDrawer(prevDrawer => !prevDrawer);
  function afterToggleDrawer(state) {
    setTimeout(() => {
      setDrawer(state);
    }, 500);
  }

  const SeettingItem = ({name, IconName, onPress}) => (
    <TouchableOpacity
      style={styles.ItemContainer(colors.Background)}
      onPress={onPress}>
      <Icon
        type="FontAwesome5"
        name={IconName}
        style={styles.itemIcon(colors.TextColor)}
      />
      <CoustomTextComponent style={styles.itemTitle(colors.TextColor)}>
        {name}
      </CoustomTextComponent>
    </TouchableOpacity>
  );

  const gotoChooseColor = () => {
    props.navigation.navigate('ChooseThemeColor');
  };
  const gotoChooseLanguage = () => {
    props.navigation.navigate('ChooseLanguage');
  };
  const gotoChooseFont = () => {
    props.navigation.navigate('ChooseFont');
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
      <MyHeader Title={language.txtSetting} onHamburgerPress={toggleNavBar} />
      <StatusBar backgroundColor={darkPink} />
      <View style={styles.Container(colors.Background)}>
        <SeettingItem
          name={language.txtChooseTheme}
          IconName="paint-roller"
          onPress={gotoChooseColor}
        />
        <SeettingItem
          name={language.txtChooseLanguage}
          IconName="language"
          onPress={gotoChooseLanguage}
        />
        <SeettingItem
          name={language.txtChooseFont}
          IconName="font"
          onPress={gotoChooseFont}
        />
      </View>
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
    return {fontSize: 20, color: color};
  },
  itemTitle: color => {
    return {fontSize: 14, color: color};
  },
});
