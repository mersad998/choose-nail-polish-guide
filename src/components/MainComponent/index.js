import React, {useState, useContext} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {
  MyHeader,
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
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {CategoryItems} from 'utils/Data/CategoryItems';
import {assetsObject} from 'utils/constants/assets';

export default function MainComponent(props) {
  const {colors} = useContext(ColorThemeContext);
  const {language} = useContext(LanguageContext);
  const [drawer, setDrawer] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleNavBar = () => setDrawer(prevDrawer => !prevDrawer);

  function afterToggleDrawer(state) {
    setTimeout(() => {
      setDrawer(state);
    }, 500);
  }

  const MenuItem = ({name, CategoryId, ItemIcon}) => {
    return (
      <TouchableOpacity
        style={styles.ItemContainer}
        onPress={() => {
          props.navigation.navigate('ShowList', {CategoryId: CategoryId});
        }}>
        <Thumbnail
          style={styles.thumnnail(colors.TextColor)}
          source={assetsObject[ItemIcon]}
        />
        <CoustomTextComponent>{name}</CoustomTextComponent>
      </TouchableOpacity>
    );
  };

  const HandMenu = () => {
    return (
      <Content>
        {CategoryItems.filter(Item => Item.ParentID === 1).map(Item => (
          <MenuItem
            name={language.key === 'FA' ? Item.FaName : Item.EnName}
            CategoryId={Item.ID}
            ItemIcon={'C' + Item.ID}
          />
        ))}
      </Content>
    );
  };

  const FootMenu = () => {
    return (
      <Content>
        {CategoryItems.filter(Item => Item.ParentID === 2).map(Item => (
          <MenuItem
            name={language.key === 'FA' ? Item.FaName : Item.EnName}
            CategoryId={Item.ID}
            ItemIcon={'C' + Item.ID}
          />
        ))}
      </Content>
    );
  };

  const searchKey = val => {
    if (val) {
      if (val.includes('#')) {
        props.navigation.navigate('ShowList', {searchSentence: val});
      } else {
        console.log('show err');
        showMessage({
          message: language.txtShouldHasHashtag,
          type: 'danger',
        });
      }
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
        Title={language.txtAppName}
        onHamburgerPress={toggleNavBar}
        hasNotification
      />
      <StatusBar backgroundColor={darkPink} />
      <FlashMessage position="top" />
      <View style={styles.Container(colors.Background)}>
        <IconInput
          IconName="search"
          placeholder={language.txtSearchHashtagPlaceHolder}
          style={styles.IconInput}
          onSubmitEditing={() => searchKey(searchValue)}
          value={searchValue}
          onChangeText={setSearchValue}
        />

        <Tabs
          tabBarUnderlineStyle={styles.underlineStyle(colors.NavBar)}
          tabBarPosition="overlayTop"
          style={styles.Tabs}>
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
                    {language.txtHandNails}
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

                  <Text style={styles.Text(colors.TextColor)}>
                    {language.txtFoofNails}
                  </Text>
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
  ItemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  Tabs: {margin: 14},
  IconInput: {alignSelf: 'center'},
});
