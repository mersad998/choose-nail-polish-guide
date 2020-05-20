import React, {useState, useContext} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {
  MyHeader,
  CoustomButtonComponent,
  IconInput,
  CoustomTextComponent,
} from 'utils/constants/elements';
import SideMenu from 'react-native-side-menu';
import CustomDrawer from 'utils/constants/CustomDrawer';
import {ColorThemeContext} from 'utils/Context/ColorThemeContext';
import {darkPink} from 'utils/constants/colors';
import {LanguageContext} from 'utils/Context/LanguageContext';
import {
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  Thumbnail,
  Content,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

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

  const MenuItem = ({name}) => {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomColor: 'grey',
          borderBottomWidth: 0.5,
        }}
        onPress={() => {
          props.navigation.navigate('ShowList');
        }}>
        <Thumbnail
          style={styles.thumnnail(colors.TextColor)}
          source={require('assets/logo.png')}
        />
        <CoustomTextComponent>{name}</CoustomTextComponent>
      </TouchableOpacity>
    );
  };

  const HandMenu = () => {
    return (
      <Content>
        <MenuItem name="ساده" />
        <MenuItem name="خط دار" />
        <MenuItem name="کروم" />
        <MenuItem name="چشم گربه ای" />
        <MenuItem name="بالرین" />
        <MenuItem name="رژ مانند" />
        <MenuItem name="بلند" />
        <MenuItem name="کوتاه" />
        <MenuItem name="براق" />
        <MenuItem name=" مات" />
        <MenuItem name="طرح دار" />
        <MenuItem name="جدید" />
        <MenuItem name="مناسبتی" />
        <MenuItem name="تیز" />
        <MenuItem name="بچگانه" />
        <MenuItem name="افراد معروف" />
        <MenuItem name="سیاه و سفید" />
        <MenuItem name="فرنچ" />
        <MenuItem name="زمستانی" />
        <MenuItem name="تابستانی" />
        <MenuItem name="کج" />
      </Content>
    );
  };

  const FootMenu = () => {
    return (
      <Content>
        <MenuItem name="ساده" />
        <MenuItem name="خط دار" />
        <MenuItem name="کروم" />
        <MenuItem name="چشم گربه ای" />
        <MenuItem name="کوتاه" />
        <MenuItem name="براق" />
        <MenuItem name=" مات" />
        <MenuItem name="طرح دار" />
        <MenuItem name="جدید" />
        <MenuItem name="مناسبتی" />
        <MenuItem name="بچگانه" />
        <MenuItem name="افراد معروف" />
        <MenuItem name="سیاه و سفید" />
        <MenuItem name="فرنچ" />
        <MenuItem name="زمستانی" />
        <MenuItem name="تابستانی" />
        <MenuItem name="کج" />
      </Content>
    );
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
        Title={language.txtAppName}
        onHamburgerPress={toggleNavBar}
        hasNotification
      />
      <StatusBar backgroundColor={darkPink} />
      <View style={styles.Container(colors.Background)}>
        <IconInput
          IconName="search"
          placeholder="جستجوی هشتگ   ( برای نمونه : #فرنچ )"
          style={{alignSelf: 'center'}}
        />
        {/* <CoustomButtonComponent
          name="نمایش تستی"
          onPress={() => props.navigation.navigate('ShowList')}
        /> */}
        <Tabs
          tabBarUnderlineStyle={styles.underlineStyle(colors.NavBar)}
          tabBarPosition="overlayTop"
          style={{margin: 14}}>
          <Tab
            heading={
              <TabHeading style={styles.TabHeading(colors.Header)}>
                <>
                  <View style={styles.rowView}>
                    <Icon
                      name="hands"
                      type="FontAwesome5"
                      style={styles.Icon(colors.TextColor)}
                    />
                  </View>

                  <Text style={styles.Text(colors.TextColor)}>
                    ناخن های دست
                  </Text>
                </>
              </TabHeading>
            }>
            <HandMenu />
          </Tab>

          <Tab
            heading={
              <TabHeading style={styles.TabHeading(colors.Header)}>
                <>
                  <View style={styles.rowView}>
                    <Icon
                      name="palette"
                      type="FontAwesome5"
                      style={styles.Icon(colors.TextColor)}
                    />
                  </View>

                  <Text style={styles.Text(colors.TextColor)}>ناخن های پا</Text>
                </>
              </TabHeading>
            }>
            <FootMenu />
          </Tab>
        </Tabs>
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
  underlineStyle: color => {
    return {
      backgroundColor: color,
    };
  },
  TabHeading: color => {
    return {
      flexDirection: 'column',
      backgroundColor: color,
    };
  },
  thumnnail: color => {
    return {
      borderWidth: 0.5,
      borderColor: color,
    };
  },
  Icon: color => {
    return {
      fontSize: 15,
      color: color,
    };
  },
  Text: color => {
    return {
      fontSize: 14,
      color: color,
      fontFamily: 'IRANSansMobile(FaNum)',
    };
  },
});
