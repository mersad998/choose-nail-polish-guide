import React from 'react';
import {View, StyleSheet, Image, Dimensions, StatusBar} from 'react-native';

import {assetsObject} from 'utils/constants/assets';

export default function FullScreenImage(props) {
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={'black'} />
      <Image
        source={assetsObject[props.navigation.getParam('id', 'logo')]}
        style={styles.MainImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
});
