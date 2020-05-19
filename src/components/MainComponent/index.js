import React, {useState, useContext} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {
  MyHeader,
  CoustomTextComponent,
  CoustomButtonComponent,
} from 'utils/constants/elements';
import SideMenu from 'react-native-side-menu';
import CustomDrawer from 'utils/constants/CustomDrawer';
import {ColorThemeContext} from 'utils/Context/ColorThemeContext';
import {darkPink} from 'utils/constants/colors';
import {LanguageContext} from 'utils/Context/LanguageContext';
import {veryDarkPink} from 'utils/constants/colors';
export default function MainComponent(props) {
  const {colors} = useContext(ColorThemeContext);
  const {language} = useContext(LanguageContext);
  const [drawer, setDrawer] = useState(false);
  const toggleNavBar = () => setDrawer(prevDrawer => !prevDrawer);

  function afterToggleDrawer(state) {
    setTimeout(() => {
      setDrawer(state);
    }, 500);
  }

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
        Title={language.txtAppName}
        onHamburgerPress={toggleNavBar}
        hasNotification
      />
      <StatusBar backgroundColor={darkPink} />
      <View style={styles.Container}>
        <CoustomTextComponent style={styles.UpperRed}>
          1950
        </CoustomTextComponent>
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
