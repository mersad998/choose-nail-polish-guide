import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {MyHeader, CoustomTextComponent} from 'utils/constants/elements';
import SideMenu from 'react-native-side-menu';
import CustomDrawer from 'utils/constants/CustomDrawer';
import {ColorThemeContext} from 'utils/Context/ColorThemeContext';
import {darkPink} from 'utils/constants/colors';
import {LanguageContext} from 'utils/Context/LanguageContext';
import {Card, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
import {Photos} from 'utils/Data/Photos';
import {assetsObject} from 'utils/constants/assets';
import Session from 'utils/Statics';
import Tapsell from 'react-native-tapsell';
const ZONE_ID = '5ee60e4a62d3300001de7722';

export default function ShowList(props) {
  const {colors} = useContext(ColorThemeContext);
  const {language} = useContext(LanguageContext);
  const [drawer, setDrawer] = useState(false);
  const [items, setItems] = useState(null);
  const toggleNavBar = () => setDrawer(prevDrawer => !prevDrawer);

  const loadPage = () => {
    let Category = props.navigation.getParam('CategoryId');
    let searchSentence = props.navigation.getParam('searchSentence');
    let CompatibleImages = [];
    if (searchSentence && String(searchSentence).length > 0) {
      let SearchArray = [];
      let photosTemp = [];
      SearchArray = String(searchSentence).split('#');
      SearchArray.forEach(world => {
        if (String(world).length > 0) {
          photosTemp = Photos.filter(item => item.tags.includes(world));
        }
        if (photosTemp && photosTemp.length > 0) {
          photosTemp.forEach(element => {
            if (CompatibleImages.includes(element) === false) {
              CompatibleImages.push(element);
            }
          });
        }
      });
      setItems(CompatibleImages);
    } else {
      const ThisCategoryImages = Photos.filter(
        item => item.CategoryID === Category,
      );
      setItems(ThisCategoryImages);
    }
  };

  // Tapsell Functions :
  const onAdAvailable = (zoneId, adId) => {
    console.log(adId);
    let adOptions = {
      ad_id: adId,
      back_disabled: true,
      immersive_mode: true,
      rotation_mode: 1,
      show_exit_dialog: true,
    };
    // ToastAndroid.show('AdAvailable', ToastAndroid.SHORT);

    Tapsell.showAd(adOptions);
  };
  const onNoAdAvailable = zoneId => {
    console.log('onNoAdAvailable');
    // ToastAndroid.show('onNoAdAvailable', ToastAndroid.SHORT);
  };
  const onError = (zoneId, error) => {
    console.log('onError');
    // console.log(zoneId);
    // console.log(error);
    // ToastAndroid.show('onError' + zoneId + error, ToastAndroid.SHORT);
  };
  const onNoNetwork = zoneId => {
    console.log('onNoNetwork');
    // ToastAndroid.show('onNoNetwork' + zoneId, ToastAndroid.SHORT);
    // console.log(zoneId);
  };
  const onExpiring = (zoneId, adId) => {
    console.log('onExpiring');
    // ToastAndroid.show('onExpiring' + zoneId + adId, ToastAndroid.SHORT);
  };

  useEffect(() => {
    loadPage();
  }, []);

  useEffect(() => {
    // console.log('useEffect Called');
    const SessionNumber = Session.get('SessionNumber', 1);
    console.log(SessionNumber);

    if (+SessionNumber % 3 === 0) {
      let PlusSessionNumberOk = +SessionNumber + 1;
      Session.set('SessionNumber', PlusSessionNumberOk);
      Tapsell.requestAd(
        ZONE_ID,
        true,
        onAdAvailable,
        onNoAdAvailable,
        onError,
        onNoNetwork,
        onExpiring,
      );
    } else {
      let PlusSessionNumber = +SessionNumber + 1;
      Session.set('SessionNumber', PlusSessionNumber);
    }
  }, []);

  function afterToggleDrawer(state) {
    setTimeout(() => {
      setDrawer(state);
    }, 500);
  }

  const fullScreenImage = id => {
    props.navigation.navigate('FullScreenImage', {
      id: id,
    });
  };

  const renderItems = ({item, index}) => {
    return (
      <Card style={styles.Card}>
        <CardItem style={styles.upperCard(colors.Header)}>
          <Left>
            <Body>
              <Text style={styles.nameText(colors.TextColor)}>
                {language.key === 'FA' ? item.FaName : item.EnName}
              </Text>
              <Text note style={styles.noteText(colors.TextColor)}>
                {item.tags}
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
            <TouchableOpacity
              style={styles.ImageTouchable}
              onPress={() => fullScreenImage(item.ID)}>
              <Image
                source={assetsObject[item.ID]}
                style={styles.MainImage(colors.NavBar)}
              />
            </TouchableOpacity>
            <CoustomTextComponent style={styles.descText(colors.TextColor)}>
              {language.key === 'FA' ? item.FaDescription : item.EnDescription}
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
      fontSize: 10,
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
  ImageTouchable: {
    alignSelf: 'center',
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
