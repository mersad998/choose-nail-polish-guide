import React, {useState, useContext} from 'react';
import {View, StyleSheet, StatusBar, Image, FlatList} from 'react-native';
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
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
} from 'native-base';

export default function ShowList(props) {
  const {colors} = useContext(ColorThemeContext);
  const {language} = useContext(LanguageContext);
  const [drawer, setDrawer] = useState(false);
  const [items, setItems] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
  const toggleNavBar = () => setDrawer(prevDrawer => !prevDrawer);

  function afterToggleDrawer(state) {
    setTimeout(() => {
      setDrawer(state);
    }, 500);
  }

  const renderItems = ({item, index}) => {
    return (
      <Card style={styles.Card}>
        <CardItem style={styles.upperCard(colors.Header)}>
          <Left>
            <Body>
              <Text style={styles.nameText(colors.TextColor)}>
                مدل ناخن فرنچ
              </Text>
              <Text note style={styles.noteText(colors.TextColor)}>
                زیبا ، خاص ، جذاب
              </Text>
            </Body>
            <Thumbnail
              style={styles.thumnnail(colors.TextColor)}
              source={require('assets/logo.png')}
            />
          </Left>
        </CardItem>
        <CardItem style={styles.bottemCard}>
          <Body>
            <Image
              source={require('assets/1.png')}
              style={styles.MainImage(colors.NavBar)}
            />
            <CoustomTextComponent style={styles.descText(colors.TextColor)}>
              تست متن مدل ناخن تست متن مدل ناخن تست متن مدل ناخن تست متن مدل
              ناخن تست متن مدل ناخن تست متن مدل ناخن
            </CoustomTextComponent>
          </Body>
        </CardItem>
      </Card>
    );
  };

  const handleBack = () => {
    props.navigation.goBack();
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
        onBackPress={handleBack}
      />
      <StatusBar backgroundColor={darkPink} />
      <View style={styles.Container}>
        {items && items.length > 0 ? (
          <FlatList
            style={styles.FlatList}
            data={items}
            maxToRenderPerBatch={8}
            initialNumToRender={8}
            windowSize={8}
            keyExtractor={i => i.ID}
            renderItem={renderItems}
            // onEndReached={() => {
            //   if (!props.isLoading) {
            //     loadPage();
            //   }
            // }}
            // onEndReachedThreshold={0.9}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={props.isLoading}
            //     onRefresh={() => loadPage(true)}
            //   />
            // }
          />
        ) : null}
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Card: {flex: 0, padding: 10, margin: 20},
  nameText: color => {
    return {
      textAlign: 'right',
      marginRight: 20,
      color: color,
      fontSize: 14,
    };
  },
  noteText: color => {
    return {
      textAlign: 'right',
    };
  },
  descText: color => {
    return {
      alignSelf: 'flex-end',
      marginTop: 10,
      fontSize: 12,
      marginHorizontal: 10,
      textAlign: 'center',
      color: color,
    };
  },
  thumnnail: color => {
    return {
      borderWidth: 0.5,
      borderColor: color,
    };
  },
  MainImage: color => {
    return {
      height: 250,
      width: 250,
      alignSelf: 'center',
      borderWidth: 0.5,
      borderColor: color,
    };
  },
  bottemCard: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    borderRightColor: 'grey',
    borderRightWidth: 0.5,
    borderLeftColor: 'grey',
    borderLeftWidth: 0.5,
    borderRadius: 8,
  },

  upperCard: color => {
    return {
      borderColor: 'grey',
      borderWidth: 0.5,
      borderRadius: 10,
      backgroundColor: color,
    };
  },
});
